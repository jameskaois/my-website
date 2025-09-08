+++
title = 'OverTheWire Bandit Beginner Levels 31 - 33'
date = 2025-09-08T07:50:34+07:00
tags = ['OverTheWire', 'CTFs']
description = 'A step-by-step walkthrough of OverTheWire Bandit beginner levels 31 to 33. Learn Linux basics, file manipulation, permissions, and commands through hands-on CTF challenges — perfect for cybersecurity beginners.'
draft = false

[cover]
  image = '/images/posts/bandit-cover.png' # path inside /static
  alt = 'Bandit cover'
  caption = 'OverTheWire Bandit'
  relative = false
+++

A step-by-step walkthrough of OverTheWire Bandit beginner levels 31 to 33. Learn Linux basics, file manipulation, permissions, and commands through hands-on CTF challenges — perfect for cybersecurity beginners.

This walkthrough covers OverTheWire Bandit beginner levels 31–33. It provides both hints and answers for each stage, helping new cybersecurity learners and CTF players progress when they’re stuck. A great resource for building Linux command-line skills while practicing ethical hacking basics.

## Bandit Level 31 → Level 32

(Updated: 4 August 2025)

**Credentials**

-   **Username:** `bandit31`
-   **Password:** `fb5S2xb7bRyFmAvQYQGEqsbhVyJqhnDy`

**Connection**

```bash
ssh bandit31@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   git

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Clone the repo like level 27, 28, 29, 30.
3. Step 3 - Run `cat README.md` -> cannot get the passwor. It require us to push a `key.txt` file with content “May I come in?”.
4. Step 4 - Run `echo “May I come in?” >> key.txt` to create the required file.
5. Step 5 - Check the `.gitignore` remove line \*.txt with `vim` or `nano`.
6. Step 6 - Run `git add .` -> `git commit -m “May I come in?”` `git push`.
7. Step 7 - Get the password via the message.

**Next Level Password**

`3O9RfhqyAlVBEZpVb6LYStshZoqoSx5K`

---

## Bandit Level 32 → Level 33

(Updated: 04 August 2025)

**Credentials**

-   **Username:** `bandit32`
-   **Password:** `3O9RfhqyAlVBEZpVb6LYStshZoqoSx5K`

**Connection**

```bash
ssh bandit32@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   whoami
-   cat

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.

**_Note: Stuck in uppercase shell_**

2. Step 2 - Run `$0` to create a new shell.
3. Step 3 - Use `whoami` and you can see that we're currently `bandit33` user.
4. Step 4 - Run `cat /etc/bandit_pass/bandit33` to get the password for the next level.
5. Step 5 - Take the password to the next level.

**Next Level Password**

`tQdtbs5D5i2vJwkO8mEyYEyTL8izoeJ0`

---

## Bandit Level 33 → Level 34

(Updated: 04 August 2025)

**Credentials**

-   **Username:** `bandit33`
-   **Password:** `tQdtbs5D5i2vJwkO8mEyYEyTL8izoeJ0`

**Connection**

```bash
ssh bandit33@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**
**We've completed the challenge.**

**Steps to Solve**
**We've completed the challenge.**

**Next Level Password**

`NO MORE!`
