# Live4Life Impact Crew Empowerment Foundation — website

Static site. No build step, no dependencies. Five pages, hosted on GitHub Pages.

```
index.html          Home
about.html          Mission, vision, L.I.F.E., the 2022-2026 story, the logo
our-work.html       Mentorship, the Students' Parliament, the conferences
impact.html         The launch in numbers, what we measure, SDG alignment
support.html        Giving, other ways to help, enquiry form
404.html            Not-found page (root-absolute paths, noindex)
assets/css/style.css
assets/js/main.js   Mobile nav + Web3Forms AJAX
assets/img/         logo.png + photographs
CNAME               live4lifecrew.org
robots.txt  sitemap.xml  .nojekyll
```

Type is Nunito, loaded from Google Fonts. Palette: blue `#434DFE`, green `#28A745`,
yellow `#FBC02D`, orange `#FF6F00`, all defined as custom properties at the top of
the stylesheet.

## The contact form

Runs on **Web3Forms** - no server, no backend, free tier 250 submissions a month.
The form lives at the bottom of `support.html`.

- Form name: **Live4Life Website Contact**
- Access key: `2e0b2abc-4dd5-4f66-995a-c788ad354386` (public by design - safe in client code)
- Submissions go to `crew@live4lifecrew.org`
- Dashboard: https://app.web3forms.com/forms

It posts over AJAX, so the visitor stays on the page and sees a thank-you line. If the
request fails they are told to email instead. A hidden `botcheck` field catches simple
bots; Web3Forms' own spam filter sits behind it.

## Photographs

From the first sitting of the Students' Parliament on 7 November 2026 and from the
Nation Building Conferences.

| File | What it is | Used on |
|---|---|---|
| `house-wide.jpg` | The House mid-session, wide | Home hero, 404 |
| `house-session.jpg` | The House in session | Our work |
| `first-sitting.jpg` | Opening day, order of the day on the board | Home |
| `nb-conference.jpeg` | A Nation Building Conference hall | Our work |
| `nb-bauchi.jpeg` | Speaking at the Bauchi conference | About |
| `arrival.jpg` | Delegates arriving | Impact |
| `og.jpg` | 1200x630 social sharing card | all pages |

`assets/img/_raw/` holds unused originals and is gitignored.

**Only publish photographs where a parent ticked the photograph box on the consent form.**
Prefer wide shots, the room, and backs of heads over close-ups of children's faces.
Resize to about 1800px wide and compress before committing - large photographs are the
usual reason a site is slow on a Nigerian mobile connection.

## DNS

The custom domain is set in `CNAME`. At the registrar (Namecheap):

- `A` records for `@` to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- `CNAME` for `www` to `nerdy-zillennial.github.io`

Leave the MX records alone - they carry `crew@live4lifecrew.org`.

Then in Settings - Pages, tick **Enforce HTTPS** once the certificate has been issued.

## Editing

The header and footer are repeated in each page. If you change a nav link, an email
address or a phone number, change it everywhere. For a site this size that is simpler
than adding a build tool.

## Checking it locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080
