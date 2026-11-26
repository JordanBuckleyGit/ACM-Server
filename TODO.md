# To do: UCC ACM website

The checklist of what's left to do on the site, in order of priority.
Each item says **what**, **where** (file plus the text to search for) and **how**.
Tick items off (`[x]`) as you go.

---

## 1. Links that aren't ready yet

Both of these go to the "coming soon" page (`links/comingSoon.html`) until they're ready.

- [ ] **Register button** (`index.html`, search `Register</a>`).
  - **Now:** `href="links/comingSoon.html"`.
  - **When the 2027 form is ready:** set `href` to the form URL and add `target="_blank" rel="noopener"`.
  - **Also:** add the form to the search-engine data in `index.html` (the `<script type="application/ld+json">` block): `"offers": { "@type": "Offer", "url": "<form URL>" }`.
- [ ] **"Download 2026 Past Paper"** (`links/pastEvents.html`, search `Download 2026 Past Paper`).
  - **Now:** `href="comingSoon.html"`.
  - **When the PDF is ready:** add it as `links/files/IrlCPC_Problems_2026.pdf`, then set `href="files/IrlCPC_Problems_2026.pdf" target="_blank"`.
- After each fix, remove the `<!-- TODO: … -->` comment above the button.
- The coming soon page itself can stay for future use.

## 2. IRLCPC 2027 event details

- [ ] **Venue:** "Western Gateway Building, UCC" is shown in the hero, but still in the unconfirmed style. Once confirmed:
  - `index.html`: remove `class="tbc"` from the venue line in the hero.
  - `index.html`: replace `"TODO: venue"` and `"TODO: venue address"` in the search-engine data.
  - `links/pastEvents.html`: search `<!-- TODO: venue -->` in the upcoming event text.
  - `llms.txt`: change "Venue: to be confirmed".
  - The Google Calendar link (section 3): add `&location=Western%20Gateway%20Building%2C%20UCC`.
- [ ] **Social share image:** a 1200 x 630 image shown when the site is shared on WhatsApp, LinkedIn, X and similar.
  - Save it as `images/social/og-image.png`. All 3 pages already point to it.
  - Then remove the `<!-- TODO: social share image -->` comments in `links/pastEvents.html` and `links/privacyPolicy.html`.

## 3. Schedule (`index.html`, `#schedule`)

- [ ] **Times:** all 7 stages show **TBC**. Replace each `TBC<!-- 2026: … -->` with the 2027 time (e.g. `9:30 - 10:00`), and remove `class="tbc"` from those `schedule-time` divs.
- [ ] **Overlaps:** 2026 had overlapping sessions (registration and coffee, the break and the awards). Decide whether to merge them into one stage or keep them separate.
- [ ] **Provisional note:** remove the "Provisional schedule. Times to be confirmed." line once the times are final.
- [ ] **Google Calendar link:**
  - Change `dates=20270306/20270307` (all-day) to real start/end times, e.g. `dates=20270306T093000/20270306T183000`.
  - Add `&location=…` (section 2).
- [ ] **Apple / Outlook calendar file** (`links/files/irlcpc-2027.ics`), once times and venue are confirmed:
  - Replace the two `DTSTART`/`DTEND` lines with `DTSTART;TZID=Europe/Dublin:20270306T093000` and `DTEND;TZID=Europe/Dublin:20270306T183000` (your real times).
  - Add a `LOCATION:` line with the venue.
  - Update `DTSTAMP` to the date of the change.
  - Keep the file's Windows-style line endings: edit it in VS Code, which preserves them.
- [ ] **If the number of stages changes**, update these four things in `stylesheet.css` and `index.html`:
  1. `style="--i: n"` on each stage, numbered 0, 1, 2, … in order.
  2. `--cycle: calc(var(--step) * 7)`: change `7` to the new count.
  3. The `stage-on` / `arrow-on` keyframe percentages. They assume 7 stages, with one step ≈ 14.3%.
  4. The desktop "snake" placement rules in the `64em` media query (`grid-area` for stages 5 to 7, and which arrows point right, down or left).

## 4. Team (`team.js`, photos in `images/team/`)

- **Current state:** 12 active members. Every one has a matching, compressed photo and a valid LinkedIn link. Andrea and Leonid are commented out.
- [ ] **Hein Htet Soe's photo is too small** (198 x 296 px). It looks blurry on the card, so get a larger one (about 600 x 800).
- [ ] **Check the crops:** Alona, Gerwin, Evan and Jordan's photos are landscape and Jacob's is very tall, so the cards crop them from the centre. Make sure no faces are cut off.
- [ ] **Delete the unused photo `images/team/jordan_buckley2.jpg`**, the old 400 x 400 one.
- [ ] **Card order:** cards appear in the order of the `members` list. Move entries to reorder.
- **Adding someone:** add `{ firstName, lastName, role, linkedIn }` to `members`.
  - Save their photo in `images/team/` as their name in lowercase, with spaces and symbols as `_` and no brackets. "Jacob (El) Egan Morely" → `jacob_el_egan_morely.jpg`.
  - If a photo is missing, the card shows the ACM logo.

## 5. Sponsors (`index.html`, `#partners`)

- **Current state:** the logos are hidden behind "?" mystery tiles, with "Our IRLCPC 2027 partners will be announced soon."
- [ ] When 2027 sponsors are confirmed, update the `<div class="partner">` entries: one per sponsor, with a logo in `images/partners/` and alt text.
- [ ] **Reveal them:** delete the word `partners-tba` from `<section id="partners" class="content-section partners-tba">`.
- [ ] **Number of mystery tiles:** there are 7 now, one per old logo. Adjust the number of `partner` entries if you want a different count.
- [ ] **Keep confidential sponsors out of the code:** hidden logos are still visible in the page source. Don't add a sponsor's logo until they can be announced.
- [ ] *(Optional)* Get a transparent-background version of `images/partners/nginx.png`, which currently has a white background.
- [ ] *(Optional)* Make each logo link to the sponsor's website.

## 6. Privacy policy (`links/privacyPolicy.html`)

- **Current state:** written and checked against UCC's Data Protection Notice Procedure. It covers:
  - the site storing nothing, and the host, Google Fonts and cdnjs
  - Google Form registration and invitations to future events (with opt-out)
  - the legal basis, who data is shared with, the full GDPR rights, and the Data Protection Commission
- [ ] **Ask UCC whether societies come under the university's data protection:** email gdpr@ucc.ie (or the Societies Guild). If they do, add UCC's Data Protection Officer contact to the policy.
- [ ] **Retention period:** agree as a committee how long registration data is kept (e.g. "deleted two years after the event"), then replace "only for as long as we need them" in the policy.
- [ ] **Google Form:** add a short privacy note at the top of the registration form (what's collected, why, that past participants may be invited to future events and can opt out), with a link to the policy.
- [ ] **Committee read-through:** have the committee read the policy once.
- [ ] **Keep it accurate:** if the site ever adds analytics, a contact form, cookies or an embed (YouTube, maps, …), update the policy and its "Last updated" date.

## 7. Images

- **Compressing:** run `./scripts/compress-images.sh` from the project root after adding or replacing images.
  - It's local only (`scripts/` is git-ignored).
  - It backs up originals to `images-originals/`, which is also ignored.
  - It uses `sips`, built into macOS.
- [ ] *(Optional)* `images/events/event5.jpeg` is still 720 KB. Lowering the events limit in the script (e.g. to 1200) would shrink it.
- [ ] *(Optional)* Rename `event4.JPG`, `event5.jpeg` and `poster.jpeg` to lowercase `.jpg` for consistency. GitHub Pages is case-sensitive, so update every reference:
  - **Event photos:** `links/pastEvents.html`.
  - **Poster:** the hero and the search-engine data in `index.html`, and the card plus fullscreen view in `links/pastEvents.html`.

## 8. Hosting on the college server (https://acm.ucc.ie/)

The live site will be served from the root of **https://acm.ucc.ie/** on a college server. Every full URL in the site already uses that address: the canonical and sharing tags on all 3 pages, the search-engine data, `sitemap.xml`, `robots.txt` and `llms.txt`. All file paths are relative, so nothing needs changing for the move. GitHub Pages (`jordanbuckleygit.github.io/ACM-Server/`) can stay as a preview; its canonical tags point search engines to acm.ucc.ie.

Ask whoever runs the server for:
- [ ] **When the site goes public: check the `.git` folder is blocked (security).** The server deploys with `git pull`, which keeps a hidden `.git` folder inside the website folder. Not urgent while acm.ucc.ie is only reachable on the college network.
  1. Open `https://acm.ucc.ie/.git/config`. A 404, 403 or "Forbidden" means it's fine. If it shows text (`[core]`, `[remote "origin"]`), it's exposed.
  2. On the server, run `git remote -v`. If the URL contains a GitHub token or password, revoke that token on GitHub and switch to an SSH key or a token-free URL.
  3. If it's exposed, ask the admin to add `RedirectMatch 404 /\.git` (Apache) or `location ~ /\.git { deny all; }` (nginx). Or, on Apache with `.htaccess` allowed, add a one-line `.htaccess` to the repo.
- [ ] **Hide the repo's notes** (optional): `README.md`, `TODO.md` and `CONTRIBUTING.md` would also be readable at acm.ucc.ie. Block `.md` files the same way if you'd rather keep them private.
- [ ] **HTTPS:** make sure the site has a valid certificate and that `http://` redirects to `https://`.
- [ ] **Cache headers:** longer caching for images, CSS and JS (e.g. Apache `mod_expires`, or nginx `expires 30d;`). Lighthouse estimated this saves about 100 KB per repeat visit.
- [ ] *(Optional)* **Custom 404 page:** now that the site is at the domain root, `ErrorDocument 404 /404.html` (Apache) or `error_page 404 /404.html;` (nginx) works. A `404.html` would need adding; the coming soon page's style can be reused.

Deploying:
- [ ] **Know which repo the server pulls from.** On the server, `git remote -v` shows it.
  - Pushing `main` from your machine goes to `JordanBuckleyGit/ACM-Server`.
  - The chapter repo is `ucc-acm-chapter/ucc-acm-website` (branch `migration-from-server`).
  - Push to whichever one the server pulls.
- [ ] **After deploying**, open https://acm.ucc.ie/ and hard-refresh with **Cmd + Shift + R**. Check:
  - the favicon, poster, team photos and partner tiles
  - the past events and privacy policy pages
  - the "coming soon" page, via the Register button
- [ ] **Run Lighthouse on acm.ucc.ie** (Incognito, mobile, three runs, take the middle score). The college server's speed may differ from GitHub Pages.
- [ ] **Search engines** *(optional)*: add acm.ucc.ie to Google Search Console and submit `https://acm.ucc.ie/sitemap.xml`.

Regular upkeep:
- [ ] **Copyright year:** change `&copy; 2026` to 2027 in the footer of all 3 pages in January.
- [ ] **Sitemap dates:** after big content changes, update the `<lastmod>` dates in `sitemap.xml` (currently 2026-11-26).
- [ ] **`llms.txt`:** mention the May hackathon once it's confirmed.
- **Staging:** stage files one by one rather than committing everything blindly. Check the file list before every commit.

## 9. Future ideas

- [ ] **Hackathon (May):**
  - Add it once details are confirmed: name, date, venue, registration, poster and schedule.
  - A CSS-only **IRLCPC | Hackathon** switch was built and then removed (two radio buttons plus `data-event` tags, with IRLCPC as the default). It can be rebuilt when the details are ready.
  - About us already mentions "a hackathon in May".
- [ ] **Faster icons:** replacing Font Awesome with about a dozen inline SVG icons would remove about 240 KB and an external CDN.
- [ ] **Time-scaled schedule:** once real times exist, a timeline where each session's length matches its duration.
- [ ] **"Happening now" highlight:** a small JS addition that highlights the current session on the day of the event.
- [ ] **Rename "Partners" to "Sponsors"**, if preferred: the nav and footer links on all 3 pages, plus the section heading.
