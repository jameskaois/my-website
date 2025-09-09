+++
date = '2025-09-09T09:17:16+07:00'
title = 'OverTheWire Natas Walkthrough Levels 0 - 6'
tags = ['OverTheWire', 'CTFs']
description = 'Walkthrough of OverTheWire Natas levels 0 - 6 with step-by-step solutions, hints, and explanations for web security beginners.'
draft = false

[cover]
  image = '/images/posts/natas-cover.png' # path inside /static
  alt = 'Natas cover'
  caption = 'OverTheWire Natas'
  relative = false
+++

The Natas wargame is part of OverTheWire and focuses on web security challenges. This post covers Levels 0 – 6, with hints, answers, and explanations to help you understand the thought process, not just the final solution.

Each level introduces a new vulnerability — from basic HTML inspection to SQL injection, XSS, command injection, file inclusion, and authentication flaws. The goal is to find the password for the next level by analyzing and exploiting the web application.

## Natas Level 0 → Level 1
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas0`
- **Password:** `natas0`

**Connection**

Level url: [http://natas0.natas.labs.overthewire.org/](http://natas0.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 – Right click and click **View page source**.
2. Step 2 - You can see the note in HTML code:
```html
<!--The password for natas1 is 0nzCigAq7t2iALyvU9xcHlYN4MlkIwlq -->
```
3. Step 3 - Take the password to the next level.

**Next Level Password**

`0nzCigAq7t2iALyvU9xcHlYN4MlkIwlq`

---

## Natas Level 1 → Level 2
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas1`
- **Password:** `0nzCigAq7t2iALyvU9xcHlYN4MlkIwlq`

**Connection**

Level url: [http://natas1.natas.labs.overthewire.org/](http://natas1.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 – Right click and you can see you have been blocked.
2. Step 2 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
```html
<!--The password for natas2 is TguMNxKo1DSa1tujBLuZJnDUlCcUAPlI -->
```
3. Step 3 - Take the password to the next level.

**Next Level Password**

`TguMNxKo1DSa1tujBLuZJnDUlCcUAPlI`

---

## Natas Level 2 → Level 3
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas2`
- **Password:** `TguMNxKo1DSa1tujBLuZJnDUlCcUAPlI`

**Connection**

Level url: [http://natas2.natas.labs.overthewire.org/](http://natas2.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
2. Step 2 - You can see there is nothing else the heading and the image. However, the image has a path `files/pixel.png`
3. Step 3 - Try add `/files` to the url -> [http://natas2.natas.labs.overthewire.org/files](http://natas2.natas.labs.overthewire.org/files) you can see we have seen some files, click into the `users.txt`, you can see the password for `natas3`.
```
# username:password
alice:BYNdCesZqW
bob:jw2ueICLvT
charlie:G5vCxkVV3m
natas3:3gqisGdR0pjm6tpkDKdIWO2hSvchLeYH
eve:zo4mJWyNj2
mallory:9urtcpzBmH
```
4. Step 4 - Take the password to the next level.

**Next Level Password**

`3gqisGdR0pjm6tpkDKdIWO2hSvchLeYH`

---

## Natas Level 3 → Level 4
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas3`
- **Password:** `3gqisGdR0pjm6tpkDKdIWO2hSvchLeYH`

**Connection**

Level url: [http://natas3.natas.labs.overthewire.org/](http://natas3.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
2. Step 2 - You can see there is nothing else.
3. Step 3 - For websites, `robots.txt` is a important file for search engine indexing, so try add `/robots.txt`, you will find a folder `/s3cr3t` disallowed. Access to it you can see the `users.txt`
```
natas4:QryZXc2e0zahULdHrtHxzyYkj59kUxLQ
```
4. Step 4 - Take the password to the next level.

**Next Level Password**

`QryZXc2e0zahULdHrtHxzyYkj59kUxLQ`

---

## Natas Level 4 → Level 5
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas4`
- **Password:** `QryZXc2e0zahULdHrtHxzyYkj59kUxLQ`

**Connection**

Level url: [http://natas4.natas.labs.overthewire.org/](http://natas4.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
2. Step 2 - You can see there is nothing else. The message says we have to access to it from `natas5` website Url, so we have to do it
3. Step 3 - Access your computer command line and paste this command:
```
curl -u natas4:QryZXc2e0zahULdHrtHxzyYkj59kUxLQ -H "Referer: http://natas5.natas.labs.overthewire.org/" http://natas4.natas.labs.overthewire.org/
```
- `-u natas4:<password>`: Add the authorization to the request
- `Referer: <nastas5 Url>`: Add the from url to solve the error.
Result:
```
<body>
<h1>natas4</h1>
<div id="content">

Access granted. The password for natas5 is 0n35PkggAPm2zbEpOU802c0x0Msn1ToK
<br/>
<div id="viewsource"><a href="index.php">Refresh page</a></div>
</div>
</body>
```
4. Step 4 - Take the password to the next level.

**Next Level Password**

`0n35PkggAPm2zbEpOU802c0x0Msn1ToK`

---

## Natas Level 5 → Level 6
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas5`
- **Password:** `0n35PkggAPm2zbEpOU802c0x0Msn1ToK`

**Connection**

Level url: [http://natas5.natas.labs.overthewire.org/](http://natas5.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
2. Step 2 - You can see there is nothing else. The message says we are not logged in.
3. Step 3 - Check the `Network` section in `Developer Tools` you can see the `Response Headers` - `Set-Cookie: loggedin=0`
4. Step 4 - Change the cookie of `loggedin=1` in `Cookies` section of `Application` in Developer Tools.
5. Step 5 - Reload the page with the new cookie.
6. Step 6 - Take the password to the next level.

**Next Level Password**

`0RoJwHdSKWFTYR5WuiAewauSuNaBXned`

---

## Natas Level 6 → Level 7
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas6`
- **Password:** `0RoJwHdSKWFTYR5WuiAewauSuNaBXned`

**Connection**

Level url: [http://natas6.natas.labs.overthewire.org/](http://natas6.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - You can access the code by doing the shortcut `Cmd + Shift + C` (for Mac) or `Ctrl + Shift + C` (for Windows)
2. Step 2 - You can see there is nothing else. And it needs us to find the secret for `Input Secret`. Click `View source code`
```php
<?

include "includes/secret.inc";

    if(array_key_exists("submit", $_POST)) {
        if($secret == $_POST['secret']) {
        print "Access granted. The password for natas7 is <censored>";
    } else {
        print "Wrong secret";
    }
    }
?>
```
**There is a `include "includes/secret.inc";` so access to [http://natas6.natas.labs.overthewire.org/includes/secret.inc](http://natas6.natas.labs.overthewire.org/includes/secret.inc)**

3. Step 3 - Take the secret `$secret = "FOEIUWGHFEEUHOFUOIU";` to the input in the main page to get the password.
4. Step 4 - Take the password to the next level.

**Next Level Password**

`bmg8SvU1LizuWjx3y7xkNERkHxGre0GS`
