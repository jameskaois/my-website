---
title: 'OverTheWire Bandit Beginner Levels 0 - 15'
date: 2025-09-06
tags: ['OverTheWire', 'CTFs']
description: 'A step-by-step walkthrough of OverTheWire Bandit beginner levels 0 to 15. Learn Linux basics, file manipulation, permissions, and commands through hands-on CTF challenges — perfect for cybersecurity beginners.'
cover:
    image: '/images/posts/bandit-cover.png' # path inside /static
    alt: 'Bandit cover'
    caption: 'OverTheWire Bandit'
    relative: false
draft: false
---

A step-by-step walkthrough of OverTheWire Bandit beginner levels 0 to 15. Learn Linux basics, file manipulation, permissions, and commands through hands-on CTF challenges — perfect for cybersecurity beginners.

This walkthrough covers OverTheWire Bandit beginner levels 0–15. It provides both hints and answers for each stage, helping new cybersecurity learners and CTF players progress when they’re stuck. A great resource for building Linux command-line skills while practicing ethical hacking basics.

## Bandit Level 0 → Level 1

(Updated: 28 July 2025)

**Credentials**

-   **Username:** `bandit0`
-   **Password:** `bandit0`

**Connection**

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Type `cat readme` to see the password.
3. Step 3 – Take the password to the next level.

**Next Level Password**

`ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If`

---

## Bandit Level 1 → Level 2

(Updated: 28 July 2025)

**Credentials**

-   **Username:** `bandit1`
-   **Password:** `ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If`

**Connection**

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Type `cat ./-` to see the password.
3. Step 3 – Take the password to the next level.

**Next Level Password**
`263JGJPfgU6LtdEvgfWU1XP5yac29mFx`

---

## Bandit Level 2 → Level 3

(Updated: 29 July 2025)

**Credentials**

-   **Username:** `bandit2`
-   **Password:** `263JGJPfgU6LtdEvgfWU1XP5yac29mFx`

**Connection**

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   ls -a
-   cat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `ls -a` to see the **hidden file** `–spaces in this filename–`
3. Step 3 – Use `cat ./--spaces\ in\ this\ filename–` to get the password
4. Step 4 – Take the password to the next level.

**Next Level Password**
`MNk8KNH3Usiio41PRUEoDFPqfxLPlSmx`

---

## Bandit Level 3 → Level 4

(Updated: 29 July 2025)

**Credentials**

-   **Username:** `bandit3`
-   **Password:** `MNk8KNH3Usiio41PRUEoDFPqfxLPlSmx`

**Connection**

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cd
-   ls -a
-   cat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cd inhere` to get to the directory containing password file.
3. Step 3 - Use `ls -a` to see the **hidden file** `…Hiding-From-You`
4. Step 4 – Use `cat …Hiding-From-You` to get the password
5. Step 5 – Take the password to the next level.

**Next Level Password**
`2WmrDFRmJIq3IPxneAaMGhap0pFhF3NJ`

---

## Bandit Level 4 → Level 5

(Updated: 29 July 2025)

**Credentials**

-   **Username:** `bandit4`
-   **Password:** `2WmrDFRmJIq3IPxneAaMGhap0pFhF3NJ`

**Connection**

```bash
ssh bandit4@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   Human-Readable File: text file, .log, ASCII,...
-   file
-   cat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cd inhere` to get to the directory containing password file.
3. Step 3 - Use `file ./*` to see the Human-Readable File (ASCII Text)
4. Step 4 – Use `cat ./-file07` to get the password
5. Step 5 – Take the password to the next level.

**Next Level Password**
`4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQw`

---

## Bandit Level 5 → Level 6

(Updated: 29 July 2025)

**Credentials**

-   **Username:** `bandit5`
-   **Password:** `4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQw`

**Connection**

```bash
ssh bandit5@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   find
-   cd
-   cat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cd inhere` to get to the directory containing password file.
3. Step 3 - Use `find . -type f -size 1033c -not -executable` to get the file containing the password

**_Explain: Find under this directory, type is file, size is 1033 bytes, not-executable_**

4. Step 4 – Use `cat ./maybehere07/.file2` to get the password
5. Step 5 – Take the password to the next level.

**Next Level Password**
`HWasnPhtq9AVKe0dmk45nxy20cvUa6EG`

---

## Bandit Level 6 → Level 7

(Updated: 29 July 2025)

**Credentials**

-   **Username:** `bandit6`
-   **Password:** `HWasnPhtq9AVKe0dmk45nxy20cvUa6EG`

**Connection**

```bash
ssh bandit6@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   find
-   cat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `find / -type f -user bandit7 -group bandit6 -size 33c` to find the files matching the requirements

**_However, there are lots of files with Permission Denied_**

3. Step 3 – Add `2>/dev/null` to the **find** command => `find / -type f -user bandit7 -group bandit6 -size 33c 2>/dev/null` to get the correct file
4. Step 4 – Use `cat /var/lib/dpkg/info/bandit7.password` to get the password
5. Step 5 - Take the password to the next level.

**Next Level Password**
`morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj`

---

## Bandit Level 7 → Level 8

(Updated: 29 July 2025)

**Credentials**

-   **Username:** `bandit7`
-   **Password:** `morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj`

**Connection**

```bash
ssh bandit7@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cat data.txt` to find the password.

**_However, there are lots of random passwords and texts_**

3. Step 3 – Add `| grep –color=always “millionth”` to the **cat** command => `cat data.txt | grep –color=always “millionth”` to get the correct password based on the requirement.
4. Step 4 - Take the password to the next level.

**Next Level Password**
`dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc`

---

## Bandit Level 8 → Level 9

(Updated: 30 July 2025)

**Credentials**

-   **Username:** `bandit8`
-   **Password:** `dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc`

**Connection**

```bash
ssh bandit8@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   sort
-   uniq

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cat data.txt` to find the password.

**_However, there are lots of random passwords and texts in order to find password only exists once._**

3. Step 3 – Use `sort` and `uniq` => `sort data.txt | uniq -u` to get the correct password based on the requirement.
4. Step 4 - Take the password to the next level.

**Next Level Password**
`4CKMh1JI91bUIZZPXDqGanal4xvAg0JM`

---

## Bandit Level 9 → Level 10

(Updated: 30 July 2025)

**Credentials**

-   **Username:** `bandit9`
-   **Password:** `4CKMh1JI91bUIZZPXDqGanal4xvAg0JM`

**Connection**

```bash
ssh bandit9@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   grep
-   strings

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cat data.txt` to find the password.

**_However, there are lots of random passwords and texts which are non-human-readable._**

3. Step 3 – Use `strings -a data.txt` to get format of text.
4. Step 4 – Add `grep` => `strings -a data.txt | grep "==="` to get the correct password based on the requirement.
5. Step 5 - Take the password to the next level.

**Next Level Password**
`FGUW5ilLVJrxX9kMYMmlN4MgbpfMiqey`

---

## Bandit Level 10 → Level 11

(Updated: 30 July 2025)

**Credentials**

-   **Username:** `bandit10`
-   **Password:** `FGUW5ilLVJrxX9kMYMmlN4MgbpfMiqey`

**Connection**

```bash
ssh bandit10@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   base64

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cat data.txt` and you can see the content is encoded.
3. Step 3 – Use `base64 -d data.txt` to decode the data.
4. Step 4 - Take the password to the next level.

**Next Level Password**
`dtR173fZKb0RRsDFSGsg2RWnpNVj3qRr`

---

## Bandit Level 11 → Level 12

(Updated: 30 July 2025)

**Credentials**

-   **Username:** `bandit11`
-   **Password:** `dtR173fZKb0RRsDFSGsg2RWnpNVj3qRr`

**Connection**

```bash
ssh bandit11@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cat
-   tr

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cat data.txt` and you can see the content is rotated.
3. Step 3 – Access [Rot13 Decoder](https://cryptii.com/pipes/rot13-decoder) to decode the content or use `cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'` to get the password.
4. Step 4 - Take the password to the next level.

**Next Level Password**
`7x16WNeHIi5YkIhWsfFIqoognUTyj9Q4`

---

## Bandit Level 12 → Level 13

(Updated: 30 July 2025)

**Credentials**

-   **Username:** `bandit12`
-   **Password:** `7x16WNeHIi5YkIhWsfFIqoognUTyj9Q4`

**Connection**

```bash
ssh bandit12@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   xxd
-   tar
-   gzip
-   bzip2
-   cat
-   file

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cat data.txt` and you can see the content is encoded.
3. Step 3 – Use `xxd -r <filename>` to decode the hexdump.
4. Step 4 - Based on the filetype decode it until get the password.

    - Tar achieve: `tar xf <filename>`
    - Gzip compressed data: `gzip -d <filename>`
    - Bzip2 compressed data: `bzip2 -d <filename>`

5. Step 5 - Take the password to the next level.

**Next Level Password**
`FO5dwFsc0cbaIiH0h8J2eUks2vdTDwAn`

---

## Bandit Level 13 → Level 14

(Updated: 31 July 2025)

**Credentials**

-   **Username:** `bandit13`
-   **Password:** `FO5dwFsc0cbaIiH0h8J2eUks2vdTDwAn`

**Connection**

```bash
ssh bandit13@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cat
-   ssh

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cat sshkey.private` and you can get the RSA Key.
3. Step 3 - Use `vim private_key.txt` to create a private_key.txt in **local machine**.
4. Step 4 - `chmod 700 private_key.txt` to avoid Permissions 0640 error.
5. Step 5 - `ssh -i private_key.txt bandit14@bandit.labs.overthewire.org -p 2220` to access to the next level.

**Next Level Password**
`MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS`

**Next Level RSA Key**
`-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEAxkkOE83W2cOT7IWhFc9aPaaQmQDdgzuXCv+ppZHa++buSkN+gg0tcr7Fw8NLGa5+Uzec2rEg0WmeevB13AIoYp0MZyETq46t+jk9puNwZwIt9XgBZufGtZEwWbFWw/vVLNwOXBe4UWStGRWzgPpEeSv5Tb1VjLZIBdGphTIK22Amz6ZbThMsiMnyJafEwJ/T8PQO3myS91vUHEuoOMAzoUID4kN0MEZ3+XahyK0HJVq68KsVObefXG1vvA3GAJ29kxJaqvRfgYnqZryWN7w3CHjNU4c/2Jkp+n8L0SnxaNA+WYA7jiPyTF0is8uzMlYQ4l1Lzh/8/MpvhCQF8r22dwIDAQABAoIBAQC6dWBjhyEOzjeAJ3j/RWmap9M5zfJ/wb2bfidNpwbB8rsJ4sZIDZQ7XuIh4LfygoAQSS+bBw3RXvzEpvJt3SmU8hIDuLsCjL1VnBY5pY7Bju8g8aR/3FyjyNAqx/TLfzlLYfOu7i9Jet67xAh0tONG/u8FB5I3LAI2Vp6OviwvdWeC4nOxCthldpuPKNLA8rmMMVRTKQ+7T2VSnXmwYckKUcUgzoVSpiNZaS0zUDypdpy2+tRH3MQa5kqN1YKjvF8RC47woOYCktsDo3FFpGNFec9Taa3Msy+DfQQhHKZFKIL3bJDONtmrVvtYK40/yeU4aZ/HA2DQzwheol1AfiEhAoGBAOnVjosBkm7sblK+n4IEwPxs8sOmhPnTDUy5WGrpSCrXOmsVIBUflaL3ZGLx3xCIwtCnEucB9DvN2HZkupc/h6hTKUYLqXuyLD8njTrbRhLgbC9QrKrSM1F2fSTxVqPtZDlDMwjNR04xHA/fKh8bXXyTMqOHNJTHHNhbh3McdURjAoGBANkU1hqfnw7+aXncJ9bjysr1ZWbqOE5Nd8AFgfwaKuGTTVX2NsUQnCMWdOp+wFak40JHPKWkJNdBG+ex0H9JNQsTK3X5PBMAS8AfX0GrKeuwKWA6erytVTqjOfLYcdp5+z9s8DtVCxDuVsM+i4X8UqIGOlvGbtKEVokHPFXP1q/dAoGAcHg5YX7WEehCgCYTzpO+xysX8ScM2qS6xuZ3MqUWAxUWkh7NGZvhe0sGy9iOdANzwKw7mUUFViaCMR/t54W1GC83sOs3D7n5Mj8x3NdO8xFit7dT9a245TvaoYQ7KgmqpSg/ScKCw4c3eiLava+J3btnJeSIU+8ZXq9XjPRpKwUCgYA7z6LiOQKxNeXH3qHXcnHok855maUj5fJNpPbYiDkyZ8ySF8GlcFsky8Yw6fWCqfG3zDrohJ5l9JmEsBh7SadkwsZhvecQcS9t4vby9/8X4jS0P8ibfcKS4nBP+dT81kkkg5Z5MohXBORA7VWx+ACohcDEkprsQ+w32xeDqT1EvQKBgQDKm8ws2ByvSUVs9GjTilCajFqLJ0eVYzRPaY6f++Gv/UVfAPV4c+S0kAWpXbv5tbkkzbS0eaLPTKgLzavXtQoTtKwrjpolHKIHUz6Wu+n4abfAIRFubOdN/+aLoRQ0yBDRbdXMsZN/jvY44eM+xRLdRVyMmdPtP8belRi2E2aEzA==-----END RSA PRIVATE KEY-----`

---

## Bandit Level 14 → Level 15

(Updated: 31 July 2025)

**Credentials**

-   **Username:** `bandit14`
-   **Password:** `MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS`

**Connection**

```bash
ssh bandit14@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   nc

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - `nc localhost 30000` to connect to localhost on port 30000.
3. Step 3 - Copy and paste the password of the current level, hit ENTER.
4. Step 4 - You can receive back the password for the next level.
5. Step 5 - Take the password to the next level.

**Next Level Password**
`8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo`

---

## Bandit Level 15 → Level 16

(Updated: 31 July 2025)

**Credentials**

-   **Username:** `bandit15`
-   **Password:** `8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo`

**Connection**

```bash
ssh bandit15@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   ncat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - `ncat --ssl localhost 30001` to connect to localhost on port 30001 with SSL/TLS.
3. Step 3 - Copy and paste the password of the current level, hit ENTER.
4. Step 4 - You can receive back the password for the next level.
5. Step 5 - Take the password to the next level.

**Next Level Password**
`kSkvUpMQ7lBYyCM4GBPvCvT1BfWRy0Dx`
