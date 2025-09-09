+++
date = '2025-09-09T09:00:40+07:00'
tags = ['OverTheWire', 'CTFs']
description = 'A full walkthrough of the OverTheWire Leviathan wargame. This guide explains all levels step by step, with hints and solutions for beginners to learn privilege escalation, file permissions, and basic binary exploitation.'
draft = false
title = 'Overthewire Leviathan FULL Walkthrough'

[cover]
  image = '/images/posts/leviathan-cover.png' # path inside /static
  alt = 'Leviathan cover'
  caption = 'OverTheWire Leviathan'
  relative = false
+++

The Leviathan wargame on OverTheWire is designed to introduce players to basic privilege escalation and binary exploitation. Unlike Bandit (Linux basics) or Krypton (cryptography), Leviathan focuses on understanding how misconfigured permissions, hidden files, and small vulnerable programs can be exploited to gain higher access.

In this walkthrough, I’ll guide you through all Leviathan levels with detailed explanations. Each section includes the commands, reasoning, and solutions I used, so you won’t just copy answers but also learn the techniques behind them.

## Leviathan Level 0 → Level 1
(Updated: 11 August 2025)

**Credentials**
- **Username:** `leviathan0`
- **Password:** `leviathan0`

**Connection**
```bash
ssh leviathan0@leviathan.labs.overthewire.org -p 2223
```

**Hints & Commands Learned**
- ls -la
- cat
- grep

**Steps to Solve**
1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Use `ls -la` to list file and you can see that we have a directory `.backup`.
3. Step 3 – Go to the `.backup` directory we can see just a `bookmarks.html`.

***However, this is a really large file, so we can use `grep` to find something we want.***

4. Step 4 - Use `cat bookmarks.html | grep "leviathan"` and we can see a line `the password for leviathan1 is xxxx`.
5. Step 5 - Take the password to the next level.

**Next Level Password**

`3QJ3TgzHDq`

---

## Leviathan Level 1 → Level 2
(Updated: 11 August 2025)

**Credentials**
- **Username:** `leviathan1`
- **Password:** `3QJ3TgzHDq`

**Connection**
```bash
ssh leviathan1@leviathan.labs.overthewire.org -p 2223
```

**Hints & Commands Learned**
- ltrace

**Steps to Solve**
1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Use `ls -la` to list files and you can see that we have a `check` binary files (which owned by `leviathan2`).
3. Step 3 - Call `./check` and you can see it need a password.
5. Step 5 - Try `ltrace check` and type something to the password and we get `strcmp("a\na", "sex")` really suspicious.
6. Step 6 - Call `./check` and type `sex` for the password and we pass it as a `leviathan2`.
7. Step 7 - Use `cat /etc/leviathan_pass/leviathan2` to get the password.
8. Step 8 - Take the password to the next level.

**Next Level Password**

`NsN1HwFoyN`

---

## Leviathan Level 2 → Level 3
(Updated: 12 August 2025)

**Credentials**
- **Username:** `leviathan2`
- **Password:** `NsN1HwFoyN`

**Connection**
```bash
ssh leviathan2@leviathan.labs.overthewire.org -p 2223
```

**Hints & Commands Learned**
- ln -s

**Steps to Solve**
1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Use `ls -la` to list files and you can see that we have a `printfile` binary files (which owned by `leviathan3`).
3. Step 3 - Call `./printfile /etc/leviathan_pass/leviathan3` and you can see we can't get the password.
5. Step 5 - Use previous knowledge `ltrace ./printfile bash_logout` we can see that `printfile` use `bin/cat` to print the content of `bash_logout`.
6. Step 6 - Try with file with name has space `mktemp -d` and `touch /tmp/tmp.xxxxxx/test file.txt`, then `./printfile /tmp/tmp.xxxxxx/test file.txt` we get the result:
```
/bin/cat: /tmp/tmp.xxxxxx/test: No such file or directory
/bin/cat: /tmp/tmp.xxxxxx/file.txt: No such file or directory
```
7. Step 7 - Let's add `test` and `file.txt` files, but we have to log the password from `/etc/leviathan_pass/leviathan3`.
8. Step 8 - Use `ln -s /etc/leviathan_pass/leviathan3 /tmp/tmp.xxxxxxx/test` and `ln -s /etc/leviathan_pass/leviathan3 /tmp/tmp.xxxxxxx/file.txt` to link two files to the password.

9. Step 9 - Run `./printfile /tmp/tmp.xxxxxx/test file.txt` and you can see the password in the first line.
***Note: `chmod 777 /tmp/tmp.xxxxxx` if you have permission denied.***

10. Step 10 - Take the password to the next level.

**Next Level Password**

`f0n8h2iWLP`

---

## Leviathan Level 3 → Level 4
(Updated: 12 August 2025)

**Credentials**
- **Username:** `leviathan3`
- **Password:** `f0n8h2iWLP`

**Connection**
```bash
ssh leviathan3@leviathan.labs.overthewire.org -p 2223
```

**Hints & Commands Learned**
- ltrace

**Steps to Solve**
1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Use `ls -la` to list files and you can see that we have a `level3` binary files (which owned by `leviathan4`).
3. Step 3 - Call `./level3` and it need you to have a passsword.
4. Step 4 - Like Level 2 call `ltrace ./level3` you can see a line `strcmp("asdf\n", "snlprintf\n")`
5. Step 5 - Now run `./level3` and type `snlprintf` as a password so you can get a shell of `leviathan4`.
6. Step 6 - Run `cat /etc/leviathan_pass/leviathan4` to get the password.
7. Step 7 - Take the password to the next level.

**Next Level Password**

`WG1egElCvO`

---

## Leviathan Level 4 → Level 5
(Updated: 12 August 2025)

**Credentials**
- **Username:** `leviathan4`
- **Password:** `WG1egElCvO`

**Connection**
```bash
ssh leviathan4@leviathan.labs.overthewire.org -p 2223
```

**Hints & Commands Learned**
- ltrace
- Binary reader

**Steps to Solve**
1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Use `ls -la` to list files and you can see that we have a `.trash` folder.
3. Step 3 - `cd .trash` then run `ls -la` and you can see a `bin` binary file.
4. Step 4 - Run `./bin` and you get back a binary string.
5. Step 5 - Run `ltrace ./bin` you can see it opens the `leviathan5` password file so we can sure that the `./bin` return the password for the next level.
6. Step 6 - Open [Binary Reader](https://www.rapidtables.com/convert/number/binary-to-ascii.html) and paste the binary **without space**.
7. Step 7 - Take the password to the next level.

**Next Level Password**

`0dyxT7F4QD`

---

## Leviathan Level 5 → Level 6
(Updated: 12 August 2025)

**Credentials**
- **Username:** `leviathan5`
- **Password:** `0dyxT7F4QD`

**Connection**
```bash
ssh leviathan5@leviathan.labs.overthewire.org -p 2223
```

**Hints & Commands Learned**
- ln -s

**Steps to Solve**
1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Use `ls -la` to list files and you can see that we have a `leviathan5` binary file (which owned by `leviathan6`).
3. Step 3 - Run `./leviathan5` you get a message `Cannot find /tmp/file.log`.
4. Step 4 - We can test `touch /tmp/file.log` and run again `./leviathan5` we don't get anything
5. Step 5 - Run `ln -s /etc/leviathan_pass/leviathan6 /tmp/file.log` to link the `file.log` to the password
6. Step 6 - Run again `./leviathan5` to get the password.
7. Step 7 - Take the password to the next level.

**Next Level Password**

`szo7HDB88w`

---

## Leviathan Level 6 → Level 7
(Updated: 12 August 2025)

**Credentials**
- **Username:** `leviathan6`
- **Password:** `szo7HDB88w`

**Connection**
```bash
ssh leviathan6@leviathan.labs.overthewire.org -p 2223
```

**Hints & Commands Learned**
- Brute-force

**Steps to Solve**
1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Use `ls -la` to list files and you can see that we have a `leviathan6` binary file (which owned by `leviathan7`).
3. Step 3 - Run `./leviathan6` and it need us to type a correct 4-digit code, so we have to brute-force it.
4. Step 4 - `mktemp -d` to create a temp directory, `vim brute-force.sh` with the content:
```
for value in {1000..9999}
do
	~/leviathan6 $value
done
```
5. Step 5 - You will have access to the `leviathan7` and run `cat /etc/leviathan_pass/leviathan7` to get the password.
6. Step 6 - Take the password to the next level.

**Next Level Password**
`qEs5Io5yM8`

---

## Leviathan Level 7
(Updated: 12 August 2025)

**Credentials**
- **Username:** `leviathan7`
- **Password:** `qEs5Io5yM8`

**Connection**
```bash
ssh leviathan7@leviathan.labs.overthewire.org -p 2223
```

**Hints & Commands Learned**
`NO MORE!`

**Steps to Solve**
1. Step 1 – Use `ssh` to get access to OverTheWire labs.
2. Step 2 – Use `ls -la` to list files and you can see a `CONGRATULATIONS` file.
3. Step 3 - Run `cat CONGRATULATIONS` and get the congrats message.

**Next Level Password**

`NO MORE!`
