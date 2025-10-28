+++
date = '2025-09-10T16:10:35+07:00'
title = 'TryHackMe - OHSINT Room Walkthrough'
tags = ['TryHackMe']
description = "Are you able to use open source intelligence to solve this challenge?"
draft = false

[cover]
  image = '/images/posts/tryhackme-ohsint.png'
  alt = 'TryHackMe OHSINT Room'
  caption = 'TryHackMe OHSINT Room'
  relative = false
+++

This is my TryHackMe walkthrough, created to document my learning journey and share solutions with the community. The writeups include a mix of hints, step-by-step explanations, and final answers to help players who get stuck, while still encouraging independent problem-solving.

> OHSINT Room - Are you able to use open source intelligence to solve this challenge?

## Overview

-   **Room URL:** [https://tryhackme.com/room/ohsint](https://tryhackme.com/room/ohsint)
-   **Difficulty:** Easy
-   **Time to complete:** 60

## Walkthrough

### 1. OhSINT

-   Download the task image and you can use [Exif Tools](https://exif.tools/), upload your image and get the metadata of that image.

![Guide Image](/images/posts/ohsint-1.png)

**But focus on the `Copyright` field, I find a name/username `OWoodflint`**

-   Search `OWoodflint` on Google, I get these results.

![Guide Image](/images/posts/ohsint-2.png)

-   A Github repo and X/Twitter account can help me answer some questions.

-   <p>What is this user's avatar of?<br /></p>

**=> Answer: `cat`**

-   <p>What city is this person in?<br /></p>

**=> Answer: `London`**

-   <p>What is his personal email address?<br /></p>

**=> Answer: `OWoodflint@gmail.com`**

-   <p>What site did you find his email address on?</p>

**=> Answer: `Github`**

-   <p>Where has he gone on holiday?<br /></p>

**=> Answer: `New York`**

-   From an X post, I can get the BSSID of the user `B4:5D:50:AA:86:41`. Go on [wigle.net](https://wigle.net) to search for the SSID.

-   <p>What is the SSID of the WAP he connected to?<br /></p>

**=> Answer: `UnileverWifi`**

-   From the website leaked in the Github (https://oliverwoodflint.wordpress.com/)[https://oliverwoodflint.wordpress.com/], you can also find an intentionally leaked password by using Dev Tools.

-   <p>What is the person's password?<br /></p>

**=> Answer: `pennYDr0pper.!`**
