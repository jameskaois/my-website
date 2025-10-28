+++
date = '2025-09-10T16:29:31+07:00'
title = 'TryHackMe - Web Application Security Room Walkthrough'
tags = ['TryHackMe']
description = "Learn about web applications and explore some of their common security issues."
draft = false

[cover]
  image = '/images/posts/tryhackme-web-application-security.png'
  alt = 'TryHackMe Web Application Security Room'
  caption = 'TryHackMe Web Application Security Room'
  relative = false
+++

This is my TryHackMe walkthrough, created to document my learning journey and share solutions with the community. The writeups include a mix of hints, step-by-step explanations, and final answers to help players who get stuck, while still encouraging independent problem-solving.

> Web Application Security Room - Learn about web applications and explore some of their common security issues.

## Overview

-   **Room URL:** [https://tryhackme.com/room/introwebapplicationsecurity](https://tryhackme.com/room/introwebapplicationsecurity)
-   **Difficulty:** Easy
-   **Time to complete:** 90

## Walkthrough

### 1. Introduction

-   What do you need to access a web application?

**=> Answer: `Browser`**

### 2. Web Application Security Risks

-   <div>You discovered that the login page allows an unlimited number of login attempts without trying to slow down the user or lock the account. What is the category of this security risk?</div>

**=> Answer: `Identification and Authentication Failure`**

-   <p>You noticed that the username and password are sent in cleartext without encryption. What is the category of this security risk?<br /></p>

**=> Answer: `Cryptographic Failures`**

### 3. Practical Example of Web Application Security

-   <div>Check the other users to discover which user account was used to make the malicious changes and revert them. After reverting the changes, what is the flag that you have received?</div>

> Access the browser with the URL `...?user_id=9` and revert all recent activities to get the flag.

**=> Answer: `THM{IDOR_EXPLORED}`**
