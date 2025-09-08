+++
title = 'OverTheWire Bandit Beginner Levels 16 - 20'
date = 2025-09-07T00:00:00+07:00
tags = ['OverTheWire', 'CTFs']
description = 'A step-by-step walkthrough of OverTheWire Bandit beginner levels 16 to 20. Learn Linux basics, file manipulation, permissions, and commands through hands-on CTF challenges — perfect for cybersecurity beginners.'
draft = false

[cover]
  image = '/images/posts/bandit-cover.png' # path inside /static
  alt = 'Bandit cover'
  caption = 'OverTheWire Bandit'
  relative = false
+++

A step-by-step walkthrough of OverTheWire Bandit beginner levels 16 to 20. Learn Linux basics, file manipulation, permissions, and commands through hands-on CTF challenges — perfect for cybersecurity beginners.

This walkthrough covers OverTheWire Bandit beginner levels 16–20. It provides both hints and answers for each stage, helping new cybersecurity learners and CTF players progress when they’re stuck. A great resource for building Linux command-line skills while practicing ethical hacking basics.

## Bandit Level 16 → Level 17

(Updated: 31 July 2025)

**Credentials**

-   **Username:** `bandit16`
-   **Password:** `kSkvUpMQ7lBYyCM4GBPvCvT1BfWRy0Dx`

**Connection**

```bash
ssh bandit16@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   ncat
-   nmap

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - `nmap localhost -p 31000-32000` to scan for available ports of localhost from 31000 to 32000.
3. Step 3 - Use `ncat --ssl localhost <open ports>` to search for the correct port and get the correct password.
4. Step 4 - Take the password to the next level.

**Next Level Password**

`EReVavePLFHtFlFsjn3hyzMlvSuSAcRD`

**Next Level RSA Key**

`-----BEGIN RSA PRIVATE KEY-----MIIEogIBAAKCAQEAvmOkuifmMg6HL2YPIOjon6iWfbp7c3jx34YkYWqUH57SUdyJimZzeyGC0gtZPGujUSxiJSWI/oTqexh+cAMTSMlOJf7+BrJObArnxd9Y7YT2bRPQJa6Lzb558YW3FZl87ORiO+rW4LCDCNd2lUvLE/GL2GWyuKN0K5iCd5TbtJzEkQTuDSt2mcNn4rhAL+JFr56o4T6z8WWAW18BR6yGrMq7Q/kALHYW3OekePQAzL0VUYbWJGTi65CxbCnzc/w4+mqQyvmzpWtMAzJTzAzQxNbkR2MBGySxDLrjg0LWN6sK7wNXx0YVztz/zbIkPjfkU1jHS+9EbVNj+D1XFOJuaQIDAQABAoIBABagpxpM1aoLWfvDKHcj10nqcoBc4oE11aFYQwik7xfW+24pRNuDE6SFthOar69jp5RlLwD1NhPx3iBlJ9nOM8OJ0VToum43UOS8YxF8WwhXriYGnc1sskbwpXOUDc9uX4+UESzH22P29ovdd8WErY0gPxun8pbJLmxkAtWNhpMvfe0050vk9TL5wqbu9AlbssgTcCXkMQnPw9nCYNN6DDP2lbcBrvgT9YCNL6C+ZKufD52yOQ9qOkwFTEQpjtF4uNtJom+asvlpmS8AvLY9r60wYSvmZhNqBUrj7lyCtXMIu1kkd4w7F77k+DjHoAXyxcUp1DGL51sOmama+TOWWgECgYEA8JtPxP0GRJ+IQkX262jM3dEIkza8ky5moIwUqYdsx0NxHgRRhORT8c8hAuRBb2G82so8vUHk/fur85OEfc9TncnCY2crpoqsghifKLxrLgtT+qDpfZnxSatLdt8GfQ85yA7hnWWJ2MxF3NaeSDm75Lsm+tBbAiyc9P2jGRNtMSkCgYEAypHdHCctNi/FwjulhttFx/rHYKhLidZDFYeiE/v45bN4yFm8x7R/b0iE7KaszX+ExdvtSghaTdcG0Knyw1bpJVyusavPzpaJMjdJ6tcFhVAbAjm7enCIvGCSx+X3l5SiWg0AR57hJglezIiVjv3aGwHwvlZvtszK6zV6oXFAu0ECgYAbjo46T4hyP5tJi93V5HDiTtiek7xRVxUl+iU7rWkGAXFpMLFteQEsRr7PJ/lemmEY5eTDAFMLy9FL2m9oQWCgR8VdwSk8r9FGLS+9aKcV5PI/WEKlwgXinB3OhYimtiG2Cg5JCqIZFHxD6MjEGOiuL8ktHMPvodBwNsSBULpG0QKBgBAplTfC1HOnWiMGOU3KPwYWt0O6CdTkmJOmL8Niblh9elyZ9FsGxsgtRBXRsqXuz7wtsQAgLHxbdLq/ZJQ7YfzOKU4ZxEnabvXnvWkUYOdjHdSOoKvDQNWu6ucyLRAWFuISeXw9a/9p7ftpxm0TSgyvmfLF2MIAEwyzRqaM77pBAoGAMmjmIJdjp+Ez8duyn3ieo36yrttF5NSsJLAbxFpdlc1gvtGCWW+9Cq0bdxviW8+TFVEBl1O4f7HVm6EpTscdDxU+bCXWkfjuRb7Dy9GOtt9JPsX8MBTakzh3vBgsyi/sN3RqRBcGU40fOoZyfAMT8s1m/uYv52O6IgeuZ/ujbjY=-----END RSA PRIVATE KEY-----`

---

## Bandit Level 17 → Level 18

(Updated: 31 July 2025)

**Credentials**

-   **Username:** `bandit17`
-   **Password:** `EReVavePLFHtFlFsjn3hyzMlvSuSAcRD`

**Connection**

```bash
ssh bandit17@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   diff

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `diff passwords.old passwords.new` to compare 2 files.
3. Step 3 - You will get `< ...` and `> ...` which means the `< ...` in `passwords.old` has changed to `> ...` in `passwords.new`
4. Step 4 - Take the password to the next level.

**Next Level Password**

`x2gLTTjFwMOhQ8oWNbMN362QKxfRqGlO`

---

## Bandit Level 18 → Level 19

(Updated: 31 July 2025)

**Credentials**

-   **Username:** `bandit18`
-   **Password:** `x2gLTTjFwMOhQ8oWNbMN362QKxfRqGlO`

**Connection**

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   ssh

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.

**_You can see that you have been blocked._**

2. Step 2 - Use `ssh bandit18@bandit.labs.overthewire.org -p 2220 cat readme` to get the password before being blocked.
3. Step 3 - Take the password to the next level.

**Next Level Password**

`cGWpMaKXVwDUNgPAVJbWYuGHVn9zl3j8`

---

## Bandit Level 19 → Level 20

(Updated: 31 July 2025)

**Credentials**

-   **Username:** `bandit19`
-   **Password:** `cGWpMaKXVwDUNgPAVJbWYuGHVn9zl3j8`

**Connection**

```bash
ssh bandit19@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   setuid binary

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `./bandit20-do cat /etc/bandit_pass/bandit20` to get password as user bandit20.
3. Step 3 - Take the password to the next level.

**Next Level Password**

`0qXahG8ZjOVMN9Ghs7iOWsCfZyXOUbYO`

---

## Bandit Level 20 → Level 21

(Updated: 31 July 2025)

**Credentials**

-   **Username:** `bandit20`
-   **Password:** `0qXahG8ZjOVMN9Ghs7iOWsCfZyXOUbYO`

**Connection**

```bash
ssh bandit20@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   echo
-   nc
-   setuid binary

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `echo -n "0qXahG8ZjOVMN9Ghs7iOWsCfZyXOUbYO" | nc -l -p 10000 &` to connect with port 10000 (you can change this to whatever you want).

**_Note: Let the process run in the background (&. -n flag is to prevent newline characters)_**

3. Step 3 - Use `./suconnect 10000` to connect to that port and you can get the password.
4. Step 4 - Take the password to the next level.

**Next Level Password**

`EeoULMCra2q0dSkYj561DX7s1CpBuOBt`
