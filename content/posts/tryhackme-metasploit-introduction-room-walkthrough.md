+++
date = '2025-09-11T10:34:49+07:00'
title = 'TryHackMe - Metasploit Introduction Room Walkthrough'
tags = ['TryHackMe', 'CTFs']
description = "An introduction to the main components of the Metasploit Framework." 
draft = false

[cover]
  image = '/images/posts/tryhackme-metasploit-introduction.png'
  alt = 'TryHackMe Metasploit Introduction Room'
  caption = 'TryHackMe Metasploit Introduction Room'
  relative = false
+++

This is my TryHackMe walkthrough, created to document my learning journey and share solutions with the community. The writeups include a mix of hints, step-by-step explanations, and final answers to help players who get stuck, while still encouraging independent problem-solving.

> Metasploit Introduction Room - An introduction to the main components of the Metasploit Framework.

## Overview

-   **Room URL:** [https://tryhackme.com/room/metasploitintro](https://tryhackme.com/room/metasploitintro)
-   **Difficulty:** Easy
-   **Time to complete:** 30

## Walkthrough

### 1. Introduction to Metasploit

_No hints needed!_

### 2. Main Components of Metasploit

-   What is the name of the code taking advantage of a flaw on the target system?<br />

**=> Answer: `Exploit`**

-   <p>What is the name of the code that runs on the target system to achieve the attacker's goal? <br /></p>

**=> Answer: `Payload`**

-   What are self-contained payloads called?<br />

**=> Answer: `Singles`**

-   <p>Is "<span style="background:transparent;margin-top:0pt;margin-bottom:0pt">windows/x64/pingback_reverse_tcp" among singles or staged payload? <br /></span></p>

**=> Answer: `Singles`**

### 3. Msfconsole

-   How would you search for a module related to Apache?<br />

**=> Answer: `search apache`**

-   <p>Who provided the auxiliary/scanner/ssh/ssh_login module?<br /></p>

```bash
msf6 > use auxiliary/scanner/ssh/ssh_login
msf6 auxiliary(scanner/ssh/ssh_login) > info
```

![Guide image](/images/posts/metasploit-introduction-1.png)

**=> Answer: `todb`**

### 4. Working with modules

-   How would you set the LPORT value to 6666?<br />

**=> Answer: `set LPORT 6666`**

-   How would you set the global value for RHOSTS  to 10.10.19.23 ? <br />

**=> Answer: `setg RHOSTS 10.10.19.23`**

-   What command would you use to clear a set payload?<br />

**=> Answer: `unset PAYLOAD`**

-   What command do you use to proceed with the exploitation phase?<br />

**=> Answer: `exploit`**

### 5. Summary

_No hints needed!_
