+++
date = '2025-10-27T09:18:41+07:00'
title = 'QnQSec CTF - s3cr3ct w3b Writeup'
tags = ['QnQSec CTF 2025', 'CTFs']
description = 'I have hidden secret in this web can you find out the secret?'
draft = false

[cover]
  image = '/images/posts/qnqsec-cover.jpg'
  alt = 'QnQSec CTF - s3cr3ct w3b'
  caption = 'QnQSec CTF - s3cr3ct w3b'
  relative = false
+++

> **Room / Challenge:** s3cr3ct_w3b (Web)

---

## Metadata

-   **Author:** `jameskaois`
-   **CTF:** QnQSec CTF 2025
-   **Challenge:** s3cr3ct_w3b (web)
-   **Target / URL:** `http://161.97.155.116:8081/`
-   **Points:** `50`
-   **Date:** `20-10-2025`

---

## Goal

We have to get the flag by finding the secret.

## My Solution

Examine the [source code](./s3cr3ct_w3b.zip), the source code is written in PHP however examine the Dockerfile, we can find something really "secret":

```
FROM php:8.2-apache


RUN docker-php-ext-install pdo pdo_mysql

RUN a2enmod rewrite

COPY public/ /var/www/html/
COPY includes/ /var/www/html/includes/
COPY flag.txt /var/www/html/

WORKDIR /var/www/html/

EXPOSE 80
```

The flag.txt file is copied to `/var/www/html` where it is normally served. So we can easily get the flag by visiting `http://161.97.155.116:8081/flag.txt`.
