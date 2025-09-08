+++
title = 'OverTheWire Bandit Beginner Levels 21 - 25'
date = 2025-09-07T01:00:00+07:00
tags = ['OverTheWire', 'CTFs']
description = 'A step-by-step walkthrough of OverTheWire Bandit beginner levels 21 to 25. Learn Linux basics, file manipulation, permissions, and commands through hands-on CTF challenges — perfect for cybersecurity beginners.'
draft = false

[cover]
  image = '/images/posts/bandit-cover.png' # path inside /static
  alt = 'Bandit cover'
  caption = 'OverTheWire Bandit'
  relative = false
+++

A step-by-step walkthrough of OverTheWire Bandit beginner levels 21 to 25. Learn Linux basics, file manipulation, permissions, and commands through hands-on CTF challenges — perfect for cybersecurity beginners.

This walkthrough covers OverTheWire Bandit beginner levels 21–25. It provides both hints and answers for each stage, helping new cybersecurity learners and CTF players progress when they’re stuck. A great resource for building Linux command-line skills while practicing ethical hacking basics.

## Bandit Level 21 → Level 22

(Updated: 4 August 2025)

**Credentials**

-   **Username:** `bandit21`
-   **Password:** `EeoULMCra2q0dSkYj561DX7s1CpBuOBt`

**Connection**

```bash
ssh bandit21@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cd
-   cat
-   cronjob

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cd /etc/cron.d` to go to cronjobs directory.
3. Step 3 - Use `cat cronjob_bandit22` (\* \* \* \* \* means it is running).
4. Step 4 - Use `cat /usr/bin/cronjob_bandit22.sh` to see what it's running.
5. Step 5 - Use `cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv` to get the password for the next level.
6. Step 6 - Take the password to the next level.

**Next Level Password**

`tRae0UfB9v0UzbCdn9cY0gQnds9GF58Q`

---

## Bandit Level 22 → Level 23

(Updated: 4 August 2025)

**Credentials**

-   **Username:** `bandit22`
-   **Password:** `tRae0UfB9v0UzbCdn9cY0gQnds9GF58Q`

**Connection**

```bash
ssh bandit22@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cd
-   cat
-   cronjob

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cd /etc/cron.d` to go to cronjobs directory.
3. Step 3 - Use `cat /etc/cron.d/cronjob_bandit23` (\* \* \* \* \* means it is running).
4. Step 4 - Use `cat /usr/bin/cronjob_bandit23.sh` to see what it's running.
5. Step 5 - Use `cat/tmp/$(echo I am user bandit23 | md5sum | cut -d ' ' -f 1)` to get the password for the next level.
6. Step 6 - Take the password to the next level.

**Next Level Password**

`0Zf11ioIjMVN551jX3CmStKLYqjk54Ga`

---

## Bandit Level 23 → Level 24

(Updated: 4 August 2025)

**Credentials**

-   **Username:** `bandit23`
-   **Password:** `0Zf11ioIjMVN551jX3CmStKLYqjk54Ga`

**Connection**

```bash
ssh bandit23@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cd
-   cat
-   vim
-   cronjob

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `cd /etc/cron.d` to go to cronjobs directory.
3. Step 3 - Use `cat /usr/bin/cronjob_bandit23.sh` to see what it's running.
4. Step 4 - Use `vim /var/spool/bandit24/foo/foo.txt` to create a file that runs as `bandit24` user.
5. Step 5 - Add content for `foo.txt`:

```
#!/bin/bash
cat /etc/bandit_pass/bandit24 > /tmp/bandit24pass
```

6. Step 6 - Use `cat bandit24pass` to get the password.

**Next Level Password**

`gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8`

---

## Bandit Level 24 → Level 25

(Updated: 4 August 2025)

**Credentials**

-   **Username:** `bandit24`
-   **Password:** `gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8`

**Connection**

```bash
ssh bandit24@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   cat
-   vim
-   mktemp

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Use `mktemp -d` to create temp directory to work with.
3. Step 3 - Move to that temp directory.
4. Step 4 - Use `vim create_possibilities` to create a file containing possibilities to get the password.
5. Step 5 - Add content for `create_possibilities`:

```
#!/bin/bash

for i in {0000.9999}
do
echo gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8 $i >> possibilities.txt
done
```

6. Step 6 - Change permission for `create_possibilities` and run it.

```
chmod +x create_possibilities
./create_possibilities
```

7. Step 7 - Use `cat possibilities.txt | nc localhost 30002 > result.txt` to get the password in file `result.txt`.

**Next Level Password**

`iCi86ttT4KSNe1armKiwbQNmB3YJP3q4`

---

## Bandit Level 25 → Level 26

(Updated: 4 August 2025)

**Credentials**

-   **Username:** `bandit25`
-   **Password:** `iCi86ttT4KSNe1armKiwbQNmB3YJP3q4`

**Connection**

```bash
ssh bandit25@bandit.labs.overthewire.org -p 2220
```

**Hints & Commands Learned**

-   ssh

**Steps to Solve**

1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Try to login to `bandit26` -> `ssh -i bandit26.sshkey bandit26@localhost -p 2220`.
3. Step 3 - Make the terminal to the smallest.
4. Step 4 - Try connecting to `bandit26` again. Press `V` -> `:set shell=/bin/bash` -> `:shell`.
5. Step 5 - Move to level 26.

**Next Level Password**
`NOT FOUND!`
