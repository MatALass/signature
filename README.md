# Contact card (signature)

A tiny **public contact card** (HTML/CSS/JS) meant to be hosted with **GitHub Pages**.

## Features

- Clean, responsive contact card
- Light/Dark mode (system preference)
- **Copy** buttons (phone/email)
- Optional **vCard download**
- Basic anti-scraping (contact info assembled by JS)

## Run locally

Just open `index.html` in a browser.

## Deploy on GitHub Pages

1. Go to **Settings → Pages**
2. Select **Deploy from a branch**
3. Choose **Branch: main** and **Folder: / (root)**
4. Save

## Customization

Edit in `index.html`:

- Name + subtitle
- LinkedIn / GitHub links
- Contact details are stored in split form inside the hidden `#data` element.

## Privacy / SEO

By default this page is set to **noindex/nofollow**:

- `robots.txt` disallows crawling
- `<meta name="robots" content="noindex,nofollow" />`

If you want it indexed by search engines, remove both.

## License

MIT
