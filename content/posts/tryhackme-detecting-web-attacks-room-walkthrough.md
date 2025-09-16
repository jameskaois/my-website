+++
date = '2025-09-16T15:33:26+07:00'
title = 'TryHackMe - Detecting Web Attacks Room Walkthrough'
tags = ['TryHackMe', 'CTFs']
description = "Explore web attacks and detection methods through log and network traffic analysis."
draft = false

[cover]
  image = '/images/posts/tryhackme-detecting-web-attacks.png'
  alt = 'TryHackMe Detecting Web Attacks Room'
  caption = 'TryHackMe Detecting Web Attacks Room'
  relative = false
+++

This is my TryHackMe walkthrough, created to document my learning journey and share solutions with the community. The writeups include a mix of hints, step-by-step explanations, and final answers to help players who get stuck, while still encouraging independent problem-solving.

> Detecting Web Attacks Room - Explore web attacks and detection methods through log and network traffic analysis.

## Overview

-   **Room URL:** [https://tryhackme.com/room/detectingwebattacks](https://tryhackme.com/room/detectingwebattacks)
-   **Difficulty:** Easy
-   **Time to complete:** 60

## Walkthrough

### 1. Introduction

_No hints needed!_

### 2. Client-Side Attacks

-   <p>What class of attacks relies on exploiting the user's behavior or device?</p>

**=> Answer: `Client-Side`**

-   <p>What is the most common client-side attack?</p>

**=> Answer: `XSS`**

### 3. Server-Side Attacks

-   <p>What class of attacks relies on exploiting vulnerabilities within web servers?</p>

**=> Answer: `Server-Side`**

-   <p>Which server-side attack lets attackers abuse forms to dump database contents?</p>

**=> Answer: `SQLi`**

### 4. Log-Based Detection

-   <p class="notion-inline-code-container"><span class="notion-enable-hover">What is the attacker's User-Agent while performing the directory fuzz?</span></p>

```bash
cd Desktop
cat access.log
```

![Guide image](/images/posts/detecting-web-attacks-1.png)

**=> Answer: `FFUF v2.1.0`**

-   <p>What is the name of the page on which the attacker performs a brute-force attack?</p>

**=> Answer: `login.php`**

-   <p>What is the complete, <a href="https://gchq.github.io/CyberChef/" target="_blank">decoded</a> SQLi payload the attacker uses on the <code>/changeusername.php</code> form?</p>

![Guide image](/images/posts/detecting-web-attacks-2.png)

-   Copy the `q` query value to [URL Decode](https://www.urldecoder.org/)

![Guide image](/images/posts/detecting-web-attacks-3.png)

**=> Answer: `%' OR '1'='1`**

### 5. Network-Based Detection

-   <p>What password does the attacker successfully identify in the brute-force attack?</p>

```bash
wireshark ./traffic.pcap
```

-   Apply filter `http.request.method == "POST"`

![Guide image](/images/posts/detecting-web-attacks-4.png)

**=> Answer: `astrongpassword123`**

-   <p>What is the flag the attacker found in the database using SQLi?</p>

![Guide image](/images/posts/detecting-web-attacks-5.png)

**=> Answer: `THM{dumped_the_db}`**

### 6. Web Application Firewall

-   <p>What do WAFs inspect and filter?</p>

**=> Answer: `Web Requests`**

-   <p>Create a custom firewall rule to block any <code>User-Agent</code> that matches <code>"BotTHM"</code>.</p>

**=> Answer: `IF User-Agent CONTAINS "BotTHM" THEN block`**

### 7. Conclusion

_No hints needed!_
