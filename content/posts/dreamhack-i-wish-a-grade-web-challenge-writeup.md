+++
date = '2025-11-25T15:45:16+07:00'
title = 'DreamHack - I wish A grade Web Challenge Writeup'
tags = ['DreamHack', 'CTFs']
description = "I ruined the sociolinguistics exam... Somebody help me!! The flag format is 4TH3N3{...} Fixed a typo in the flag."
draft = false

[cover]
  image = '/images/posts/dreamhack-writeup.jpg'
  alt = 'DreamHack - I wish A grade'
  caption = 'DreamHack - I wish A grade'
  relative = false
+++

> **Room / Challenge:** I wish A grade (Web)

---

## Metadata

-   **Author:** `jameskaois`
-   **CTF:** DreamHack
-   **Challenge:** I wish A grade (web)
-   **Link**: `https://dreamhack.io/wargame/challenges/2380`
-   **Level:** `2`
-   **Date:** `25-11-2025`

---

## Goal

Follow the hints, leverage SQL Injection to get the flag.

## My Solution

Based on the `readme.txt` got we can tried logging in as `202511037` to see what we got. After some time examining the website, I found a hidden announcements which is in `/announce/1`:

![Guide image](/images/posts/dreamhack-i-wish-a-grade-1.png)

In `/announce/0` found:

![Guide image](/images/posts/dreamhack-i-wish-a-grade-2.png)

We know that we have to log in as `pro????`, however currently there is a firewall that prevents us from using SQL Injection. So we have to delete the `system/key.txt` first. There is a delete route when we tried deleting an assignment of `202511037`. Use this route to delete `key.txt`:

```bash
curl -X POST "http://host3.dreamhack.games:13664/assignment/delete" -d "filepath=./../../system/key.txt" --cookie "session=.eJwljcsKwyAQRX9FZp2F4wPFX6mh6GhIIbRQlSxC_r0j3dx7uIdhLnhuR2p7bRAeF4jOBW0Q1dZggTiKlhQHOfdPI7hQYxyJNsvsJU6hWWdvaWqZyhQ4J4Oe2dJMlfkgq8lZVRPEfmpY73WBV4EASiqLKLXjv9_PUXlqfZT67nD_AI3jNE4.aSVoGw.ngedr0NvRriP5iQ5hgjr-aM8xcQ"
```

If you got `Redirecting...` response you have successfully delete the `key.txt` file which works as a firewall. Now go back to the login page and tried some SQL Injection payloads to log in as `pro????`. I use this payload:

```
Id: ' OR 1=1 LIMIT 1 OFFSET 1 --
Pw: anything
```

This will select the second user in the database. Submit this and we can see that we have successfully logged in as `pro2153`
![Guide image](/images/posts/dreamhack-i-wish-a-grade-3.png)

Go `/grades` and change the grade of student `202511037` to `A` and get the flag:
![Guide image](/images/posts/dreamhack-i-wish-a-grade-4.png)
