# To do: UCC ACM website

The checklist of everything still to do on the site, in order of priority.
Each item says **what**, **where** (file plus the text to search for) and **how**.
Tick items off (`[x]`) as you go.

---

## 1. Broken on the live site right now

- [x] **Team photos restored.** Andrea, Dan, Leonid, Mikolaj and Jake's photos were brought back from commit `f266b0d` into `images/team/`. Commit them with everything else (they're new files, so stage them).
- [ ] **Favicon doesn't load.** `index.html` uses `href="/icons/favicon.png"`. The leading `/` points at the domain root, but the site lives under `/ACM-Server/` on GitHub Pages, so the browser gets a 404.
  - **Fix:** in `index.html`, change it to `<link rel="icon" type="image/png" href="icons/favicon.png" />`. The other two pages already use relative paths.
- [ ] **"Download 2026 Past Paper" gives a 404.** The file doesn't exist yet.
  - **Fix:** add the PDF as `links/files/IrlCPC_Problems_2026.pdf`, using that exact name.
  - **Then:** remove the `<!-- TODO: 2026 problem set PDF -->` comment in `links/pastEvents.html`.
- [ ] **Register button goes nowhere.** `index.html`, search for `<a href="#" class="button">Register</a>`.
  - **Fix:** put the 2027 registration form URL in `href`, and add `target="_blank" rel="noopener"`.
  - **Also:** add the link to the search-engine data in `index.html` (the `<script type="application/ld+json">` block): `"offers": { "@type": "Offer", "url": "<form URL>" }`.

## 2. Images

Run **`./scripts/compress-images.sh`** from the project root whenever you add or replace images. The script is local only: `scripts/` is git-ignored.
- It shrinks images to the size they're shown at and fixes wrong file types.
- Originals are backed up to `images-originals/`, which git ignores.
- It uses `sips`, which is built into macOS.

- [x] Team photos, logos and `acmLogo.png` compressed (images folder: 12 MB → 3.8 MB).
- [ ] `images/events/event5.jpeg` is still 720 KB. It's already well compressed at 1600 px wide; lowering the events limit in the script (e.g. to 1200) would shrink it further.
- [ ] *(Optional)* Rename `event4.JPG`, `event5.jpeg` and `poster.jpeg` to lowercase `.jpg` for consistency. GitHub Pages is case-sensitive, so update every reference: `links/pastEvents.html` for the event photos, and for the poster the hero and search-engine data in `index.html` plus the card and fullscreen view in `links/pastEvents.html`.
- [ ] *(Optional)* Get a transparent-background version of `images/partners/nginx.png`. It currently has a white background.

## 3. IRLCPC 2027 event details

- [ ] **Venue:**
  - "Western Gateway Building, UCC" is in the hero, but its line still has `class="tbc"` (italic, "unconfirmed" styling). Remove the `tbc` class once the venue is confirmed.
  - Add the venue to the search-engine data in `index.html`: replace `"TODO: venue"` and `"TODO: venue address"`.
  - Add it to `links/pastEvents.html`: search `<!-- TODO: venue -->` in the upcoming event text.
  - Add it to the Google Calendar link (section 4): append `&location=Western%20Gateway%20Building%2C%20UCC`.
- [ ] **Registration link:** see section 1.
- [ ] **Social share image:** a 1200 x 630 image shown when the site is shared on WhatsApp, LinkedIn, X and similar. Save it as `images/social/og-image.png`.
  - The `<!-- TODO: social share image -->` comment appears in all 3 pages.

## 4. Schedule (`index.html`, `#schedule`)

- [ ] **Times:** all 7 stages show **TBC**. Replace each `TBC<!-- 2026: … -->` with the 2027 time (e.g. `9:30 - 10:00`), and remove `class="tbc"` from those `schedule-time` divs.
- [ ] **Overlaps:** 2026 had overlapping sessions (registration and coffee, the break and the awards). Decide whether to merge them into one stage or keep them separate.
- [ ] **Provisional note:** remove the "Provisional schedule. Times to be confirmed." line once the times are final.
- [ ] **Google Calendar link:**
  - Change `dates=20270306/20270307` (all-day) to real start/end times, e.g. `dates=20270306T093000/20270306T183000`.
  - Add `&location=…` (section 3).
- [ ] **If the number of stages changes**, update these four things in `stylesheet.css` and `index.html`:
  1. `style="--i: n"` on each stage, numbered 0, 1, 2, … in order.
  2. `--cycle: calc(var(--step) * 7)`: change `7` to the new count.
  3. The `stage-on` / `arrow-on` keyframe percentages. They assume 7 stages, with one step ≈ 14.3%.
  4. The desktop "snake" placement rules in the `64em` media query (`grid-area` for stages 5 to 7, and which arrows point right, down or left).

## 5. Team section (`team.js`, photos in `images/team/`)

All 12 active members have a matching photo and a valid LinkedIn link. Photos are compressed (run the local `./scripts/compress-images.sh` after adding new ones).

- [ ] **Hein Htet Soe's photo is too small** (198 x 296 px). It will look blurry on the card, so get a larger one (about 600 x 800).
- [ ] **Check the crops:** Alona, Gerwin and Evan's photos are landscape and Jacob's is very tall, so the cards crop them from the centre. Make sure no faces are cut off.
- [ ] **Card order:** cards appear in the order of the `members` list. Move entries to reorder.
- **Photo names:** lowercase, with spaces and symbols turned into `_`, and no brackets. "Jacob (El) Egan Morely" → `jacob_el_egan_morely.jpg`. If a photo is missing, the card shows the ACM logo.

## 6. Sponsors (`index.html`, `#partners`)

- **Current state:** the logos are hidden behind "?" mystery tiles, with "Our IRLCPC 2027 partners will be announced soon."
- [ ] When 2027 sponsors are confirmed, update the `<div class="partner">` entries: one per sponsor, with a logo image and alt text. Add, remove or swap them as needed.
- [ ] **Reveal them:** delete the word `partners-tba` from `<section id="partners" class="content-section partners-tba">`.
- [ ] **Number of mystery tiles:** there are 7 now, one per old logo, and visitors may read that as "7 sponsors coming". Adjust the number of `partner` entries if you want a different count.
- [ ] **Keep confidential sponsors out of the code:** hidden logos are still visible in the page source. Don't add a sponsor's logo until they can be announced.
- [ ] *(Optional)* Make each logo link to the sponsor's website.

## 7. Privacy policy (`links/privacyPolicy.html`)

- [ ] **Write the real content.** Everything in *italics* on the page is placeholder text marked `class="tbc"`:
  - what personal information is collected (e.g. registration forms, team member form) and why
  - how it's used, and the legal basis
  - other services used (e.g. Google Forms / Google Drive)
  - how long it's kept
  - visitors' data protection (GDPR) rights and how to exercise them
- [ ] **Remove the placeholders:** set the "Last updated" date, then delete the "Placeholder: this policy has not been finalised yet." line.
- [ ] **Review:** have the committee, and ideally UCC, check it before publishing.

## 8. Site address, search engines and deployment

- [ ] **Decide the final address.** The site uses `https://acm.ucc.ie` everywhere a full URL is needed, but it's currently hosted at `https://jordanbuckleygit.github.io/ACM-Server/`. Once decided, update the address in:
  - `index.html`, `links/pastEvents.html`, `links/privacyPolicy.html`: the `canonical`, `og:url` and `og:image` tags, and the search-engine data
  - `sitemap.xml`, `robots.txt` and `llms.txt`
- [x] **App icons:** `icons/icon-192.png` and `icons/icon-512.png` made from the ACM logo.
- [ ] **Cache headers on the university server:** GitHub Pages only lets browsers cache files for 10 minutes, and that can't be changed. On the university server, ask for longer caching of images, CSS and JS (e.g. Apache `mod_expires`, or nginx `expires 30d;`). Lighthouse estimated this saves about 322 KB on repeat visits.
- [ ] **Update `llms.txt`** (the summary for AI search tools): mention the May hackathon once it's confirmed.
- [ ] **Copyright year:** change `&copy; 2026` to 2027 in the footer of all 3 pages in January.
- [x] **Mac system files:** `.gitignore` now ignores `.DS_Store` (and the image backups).
- [ ] **Know where pushes go:**
  - On `main`, pushing goes to your personal repo `JordanBuckleyGit/ACM-Server`, which powers GitHub Pages.
  - The chapter repo is `ucc-acm-chapter/ucc-acm-website` (branch `migration-from-server`).
  - Check which one the university server pulls from (`git remote -v` on the server).
- [ ] **After every push:**
  - Wait about a minute (repo → **Actions** → "pages build and deployment" turns green).
  - Hard-refresh with **Cmd + Shift + R**. GitHub Pages lets browsers cache files for 10 minutes, so an old stylesheet can make the page look half-updated.
- [ ] **Stage files carefully:** don't use "commit all" blindly in VS Code. That's how the team photos were deleted. Check the file list before committing.

## 9. Future changes

- [ ] **Hackathon (May):**
  - Add it once details are confirmed: name, date, venue, registration, poster and schedule.
  - A ready-made approach was tried and then removed: an **IRLCPC | Hackathon** switch made of two radio buttons and `data-event="irlcpc"` / `data-event="hackathon"` tags, with one CSS rule hiding the event that isn't selected. It's CSS-only, with IRLCPC as the default. Ask for it to be rebuilt when the details are ready.
  - Past hackathons can go in the past events archive as entries tagged as hackathons.
  - About us already mentions "a hackathon in May".
- [ ] **Time-scaled schedule:** once real times exist, a timeline with a time ruler, where each session's bar length matches its duration and overlapping sessions sit on separate lanes. It can be CSS-only.
- [ ] **"Happening now" highlight:** a small JS addition that highlights the current session on the day of the event.
- [ ] **Apple and Outlook calendars:** add a small `.ics` file next to the Google Calendar button.
- [ ] **Custom 404 page:** tried and removed. To bring it back, it needs a server setting: `ErrorDocument 404 /404.html` (Apache) or `error_page 404 /404.html;` (nginx). GitHub Pages uses a `404.html` in the repo root automatically.
- [ ] **Rename "Partners" to "Sponsors"**, if preferred: the nav link and footer link on all 3 pages, plus the section heading.
- [ ] **2026 write-up:** add specifics if known, e.g. "with X teams from Y universities".
