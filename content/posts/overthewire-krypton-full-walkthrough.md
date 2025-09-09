+++
date = '2025-09-09T07:43:18+07:00'
title = 'Overthewire Krypton FULL Walkthrough'
tags = ['OverTheWire', 'CTFs']
description = 'A complete walkthrough of the OverTheWire Krypton wargame. Learn cryptography basics, covering classical ciphers, encryption/decryption techniques, and password cracking methods'
draft = false

[cover]
  image = '/images/posts/krypton-cover.webp' # path inside /static
  alt = 'Krypton cover'
  caption = 'OverTheWire Krypton'
  relative = false
+++

OverTheWire’s Krypton is a beginner-friendly wargame designed to introduce players to the world of cryptography. Unlike Bandit, which focuses on Linux basics, Krypton takes you through different stages of encryption and decryption — from simple substitution ciphers to more advanced concepts.

In this walkthrough, I’ll cover all Krypton levels step by step. You’ll find not only the solutions but also the thought process, hints, and commands I used to solve each challenge. My goal is to make this guide useful for cybersecurity enthusiasts who are just starting out with cryptography and CTFs.

## Krypton Level 0 → Level 1
(Updated: 12 August 2025)

**Credentials**
- **Username:** `No Need!`
- **Password:** `No Need!`

**Connection**
```bash
No Need!
```

**Hints & Commands Learned**
- Base64 encoder

**Steps to Solve**
1. Step 1 - Take the Base64 encode `S1JZUFRPTklTR1JFQVQ=` to website [Base64 Decode](https://www.base64decode.org/) to decode.
2. Step 2 - Decode the encoded to get the password.
3. Step 3 - Take the password to the next level.

**Next Level Password**

`KRYPTONISGREAT`

---

## Krypton Level 1 → Level 2
(Updated: 12 August 2025)

**Credentials**
- **Username:** `krypton1`
- **Password:** `KRYPTONISGREAT`

**Connection**
```bash
ssh krypton1@krypton.labs.overthewire.org -p 2231
```

**Hints & Commands Learned**
- ROT13 Encoder

**Steps to Solve**
1. Step 1 - Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Call `cd /krypton/krypton1` and `cat krypton2` you will get a encoded one.
3. Step 3 - Take it to [Rot13 Decoder](https://cryptii.com/pipes/rot13-decoder) to decode the password.
4. Step 4 - Take the password to the next level.

**Next Level Password**

`ROTTEN`

---

## Krypton Level 2 → Level 3
(Updated: 12 August 2025)

**Credentials**
- **Username:** `krypton2`
- **Password:** `ROTTEN`

**Connection**
```bash
ssh krypton2@krypton.labs.overthewire.org -p 2231
```

**Hints & Commands Learned**
- Decryption

**Steps to Solve**
1. Step 1 - Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Call `cd /krypton/krypton2` and `cat krypton3` you will get a encoded one.
3. Step 3 - Do like the example to create a temp directory and `echo "AAABBB" >> test.txt` and run `/krypton/krypton2/encrypt ./test.txt` to test the encrypt.
4. Step 4 - `cat test.txt` and you will see something like `OOOPPP` so the logic is like `a -> O`, `b -> B`, ...
5. Step 5 - Run `cat /krypton/krypton2/krypton3 |tr 'A-Z' 'O-ZA-N'` to get the password based on the logic.
6. Step 6 - Take the password to the next level.

**Next Level Password**

`CAESARISEASY`

---

## Krypton Level 3 → Level 4
(Updated: 12 August 2025)

**Credentials**
- **Username:** `krypton3`
- **Password:** `CAESARISEASY`

**Connection**
```bash
ssh krypton3@krypton.labs.overthewire.org -p 2231
```

**Hints & Commands Learned**
- Decryption

**Steps to Solve**
1. Step 1 - Use `ssh` to get access to OverTheWire labs.
2. Step 2 - Call `cd /krypton/krypton3` and `cat HINT1 HINT2` you will get the hints.
3. Step 3 - Base on the README and hints we have to know the frequency of letters so call:
```
cat found1 found2 found3 | tr '[:upper:]' '[:lower:]' | grep -o . | sort | uniq -c | sort -nr
```
In order to get the frequency of words in 3 found files.
4. Step 4 - Call `cat found1 found2 found3 | tr -d '\n' | fold -w1 | sort | uniq -c | sort -nr | awk '{printf $2}'` to get the list of it without space and counts. Also, visit [Wikipedia](https://en.wikipedia.org/wiki/Letter_frequency) to get the list of most frequent letters from most to least.
5. Step 5 - Run `cat /krypton/krypton3/krypton4 | tr 'SQJUBNGCDZVWMYTXKELAFIORHP' 'ETAONRISHDLFCMUGYPWBVKJXZQ'` to get the password based on the logic.

***Note: If the password doesn't work in the next level you can try this instead `cat /krypton/krypton3/krypton4 | tr 'SQJUBNGCDZVWMYTXKELAFIORHP' 'EATSORNIHCLDUPYFWGMBKVXQJZ'`***

6. Step 6 - Take the password to the next level.

**Next Level Password**

`BRUTE`

---

## Krypton Level 4 → Level 5
(Updated: 12 August 2025)

**Credentials**
- **Username:** `krypton4`
- **Password:** `BRUTE`

**Connection**
```bash
ssh krypton4@krypton.labs.overthewire.org -p 2231
```

**Hints & Commands Learned**
- Vigenère cipher decryption

**Steps to Solve**
Take a look at tutorial:
- https://alexandervoidstar.wordpress.com/2016/04/23/overthewire-krypton-level-4/
- https://mayadevbe.me/posts/overthewire/krypton/level4/

**Next Level Password**

`CLEARTEXT`

---

## Krypton Level 5 → Level 6
(Updated: 12 August 2025)

**Credentials**
- **Username:** `krypton5`
- **Password:** `CLEARTEXT`

**Connection**
```bash
ssh krypton5@krypton.labs.overthewire.org -p 2231
```

**Hints & Commands Learned**
- Decryption

**Steps to Solve**
Take a look at tutorial:
- https://alexandervoidstar.wordpress.com/2016/04/24/overthewire-krypton-level-5/
- https://mayadevbe.me/posts/overthewire/krypton/level5/

**Next Level Password**
`RANDOM`

---

## Krypton Level 6 → Level 7
(Updated: 12 August 2025)

**Credentials**
- **Username:** `krypton6`
- **Password:** `RANDOM`

**Connection**
```bash
ssh krypton6@krypton.labs.overthewire.org -p 2231
```

**Hints & Commands Learned**
- Decryption

**Steps to Solve**
Take a look at tutorial:
- https://learnhacking.io/overthewire-krypton-levels-0-9/

**Next Level Password**
`NO MORE!`
