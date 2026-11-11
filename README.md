# Live4Life Impact Crew Empowerment Foundation — website

Static site. No build step, no dependencies. Five pages, hosted on GitHub Pages.

```
index.html          Home
what-we-do.html     The two programmes
our-story.html      2022–2026, and what each year taught us
support.html        Giving / donations
contact.html        Contact form (Web3Forms)
assets/css/style.css
assets/js/main.js
assets/img/         logo.png + photographs
CNAME               custom domain
.nojekyll           stops GitHub re-processing the files
```

## Still to fill in

Search the project for square brackets — every one is a placeholder.

| Where | Placeholder | What to put |
|---|---|---|
| `support.html` | `[BANK NAME]`, `[ACCOUNT NUMBER]` | The Foundation's account details |
| `support.html` | `[PAYMENT LINK]` | Paystack or Flutterwave payment page URL |
| `CNAME` | `live4lifecrew.org` | Confirm this is the domain you own |

## The contact form

Runs on **Web3Forms** — no server, no backend, free tier 250 submissions a month.

- Form name: **Live4Life Website Contact**
- Access key: `2e0b2abc-4dd5-4f66-995a-c788ad354386` (public by design — safe in client code)
- Dashboard: https://app.web3forms.com/forms

The form posts over AJAX, so the visitor stays on the page and sees a thank-you line.
If the request fails they are told to email `crew@live4lifecrew.org` instead.
A hidden `botcheck` field catches the simplest spam bots; Web3Forms' own spam filter
is switched on behind it.

**Recipient:** submissions currently arrive at the Web3Forms account address.
To move them to `crew@live4lifecrew.org`, click the verification link sent to that
inbox, then Settings → Email Configuration → Recipient Emails on the form.

## Photographs

All from the first sitting on 7 November 2026 and the Nation Building Conferences.

| File | What it is | Used on |
|---|---|---|
| `house-wide.jpg` | The House mid-session, wide | Home |
| `house-session.jpg` | The House in session | What we do |
| `first-sitting.jpg` | Opening day, order of the day on the board | Our story |
| `nb-conference.jpeg` | A Nation Building Conference hall | What we do |
| `nb-bauchi.jpeg` | Speaking at the Bauchi conference | Our story |
| `arrival.jpg` | Delegates arriving | Support |
| `og.jpg` | 1200×630 social sharing card | all pages |

`assets/img/_raw/` holds unused originals and is gitignored.

**Only publish photographs where a parent ticked the photograph box on the consent form.**
Prefer wide shots, the room, and backs of heads over close-ups of children's faces.
Resize to about 1800px wide and compress before committing — large photographs are the
usual reason a site is slow on a Nigerian mobile connection.

## Publishing to GitHub Pages

```bash
cd live4life-website
git init
git add .
git commit -m "Live4Life website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.

For the custom domain, at your registrar create:

- `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- a `CNAME` record for `www` pointing to `USERNAME.github.io`

Then in Settings → Pages, enter the domain and tick **Enforce HTTPS** once the
certificate has been issued (this can take up to an hour).

## Checking it locally

```bash
cd live4life-website
python3 -m http.server 8080
```

Then open http://localhost:8080

## Editing

The header and footer are repeated in each of the five files. If you change a nav link,
an email address or a phone number, change it in all five. For a site this size that is
simpler than adding a build tool.
