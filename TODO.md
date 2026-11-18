# To do: UCC ACM website

The checklist of everything still to do on the site, in order of priority.
Each item says **what**, **where** (file plus the text to search for) and **how**.
Tick items off (`[x]`) as you go.

---

## 1. Broken on the live site right now

- [ ] **Team photos are missing.** Commit `f64043e` deleted 8 photos, so those cards show the ACM logo.
  - **Fix:** restore them from the previous commit, then commit and push. If you're replacing them with compressed versions instead, use the same filenames (section 2).
    ```
    git checkout f266b0d -- images/david_shanahan.jpg images/andrea_visentin.jpg images/mikolaj_wujek.jpg images/dan_bokete.jpg images/jake_sparks.jpg images/ishaan_anwar.jpg images/leonid_berdin.jpg images/swithin_pais.jpg
    ```
- [ ] **Favicon doesn't load.** `index.html` uses `href="/icons/favicon.png"`. The leading `/` points at the domain root, but the site lives under `/ACM-Server/` on GitHub Pages, so the browser gets a 404.
  - **Fix:** in `index.html`, change it to `<link rel="icon" type="image/png" href="icons/favicon.png" />`. The other two pages already use relative paths.
- [ ] **"Download 2026 Past Paper" gives a 404.** The file doesn't exist yet.
  - **Fix:** add the PDF as `links/files/IrlCPC_Problems_2026.pdf`, using that exact name.
  - **Then:** remove the `<!-- TODO: 2026 problem set PDF -->` comment in `links/pastEvents.html`.
- [ ] **Register button goes nowhere.** `index.html`, search for `<a href="#" class="button">Register</a>`.
  - **Fix:** put the 2027 registration form URL in `href`, and add `target="_blank" rel="noopener"`.
  - **Also:** add the link to the search-engine data in `index.html` (the `<script type="application/ld+json">` block): `"offers": { "@type": "Offer", "url": "<form URL>" }`.

## 2. Images: compress and use consistent types

- **Why:** several images are far bigger than they're shown, which slows the site, especially on phones.
- **Rule of thumb:**
  - **Photos** (team, events, poster): **JPEG**, saved as lowercase **`.jpg`**, about 75% quality.
    - Team photos: about **600 × 800** (portrait 3:4, face centred), under about 100 KB.
    - Event photos and poster: up to **1600 px** wide, under about 250 KB.
  - **Logos:** **PNG with a transparent background**, about **400 px** wide.
- **How:** macOS has a built-in tool, `sips`. For example, run this in the `images/` folder:
  ```
  sips -Z 1600 -s format jpeg -s formatOptions 75 event5.jpeg --out event5.jpg
  ```
  `-Z` sets the longest side in pixels. Squoosh (squoosh.app) also works and lets you compare quality.

- [ ] Shrink `event5.jpeg` (724 KB), `event2.jpg` (376 KB), `event.jpg` (320 KB), `event4.JPG` (308 KB) and `event3.jpg` (252 KB).
- [ ] Resize `acmLogo.png` (2137 × 2126 px, 308 KB). It's only ever shown at 44–56 px, so about **256 × 256** is plenty.
- [ ] Re-add the team photos at about 600 × 800, if they've been compressed (section 1).
- [ ] **Fix the mislabelled logos:**
  - `nginx.png` is really a JPEG with a white background. Get a transparent PNG.
  - `google.png` is really a WebP. Re-save it as a real PNG.
- [ ] **Make extensions consistent:** rename `event4.JPG`, `event5.jpeg` and `poster.jpeg` to `.jpg`.
  - ⚠️ Update every reference when you rename. Search the HTML files for the old name:
    - **`event4.JPG` / `event5.jpeg`:** `links/pastEvents.html`.
    - **`poster.jpeg`:** 4 places: the hero in `index.html`, the search-engine data in `index.html`, and the card plus fullscreen view in `links/pastEvents.html`.
  - GitHub Pages is **case-sensitive** (`Event.jpg` ≠ `event.jpg`), even though your Mac isn't.
- [ ] **Delete unused images:** `SaveTheDatePoster.png` (4 MB!), `acmPoster.jpg` and `logo.png`. Nothing on the site uses them.
  - `jordan_buckley.jpg` *is* used. `team.js` builds photo names automatically, so it's not referenced by name anywhere.
- [ ] After resizing the poster, update its `width="800" height="1000"` attributes (3 places) to the new pixel size.

## 3. IRLCPC 2027 event details

- [ ] **Venue:**
  - "Western Gateway Building, UCC" is in the hero, but its line still has `class="tbc"` (italic, "unconfirmed" styling). Remove the `tbc` class once the venue is confirmed.
  - Add the venue to the search-engine data in `index.html`: replace `"TODO: venue"` and `"TODO: venue address"`.
  - Add it to `links/pastEvents.html`: search `<!-- TODO: venue -->` in the upcoming event text.
  - Add it to the Google Calendar link (section 4): append `&location=Western%20Gateway%20Building%2C%20UCC`.
- [ ] **Registration link:** see section 1.
- [ ] **Social share image:** a 1200 × 630 image shown when the site is shared on WhatsApp, LinkedIn, X and similar. Save it as `images/social/og-image.png`.
  - The `<!-- TODO: social share image -->` comment appears in all 3 pages.

## 4. Schedule (`index.html`, `#schedule`)

- [ ] **Times:** all 7 stages show **TBC**. Replace each `TBC<!-- 2026: … -->` with the 2027 time (e.g. `9:30 – 10:00`), and remove `class="tbc"` from those `schedule-time` divs.
- [ ] **Overlaps:** 2026 had overlapping sessions (registration and coffee, the break and the awards). Decide whether to merge them into one stage or keep them separate.
- [ ] **Provisional note:** remove the "Provisional schedule. Times to be confirmed." line once the times are final.
- [ ] **Google Calendar link:**
  - Change `dates=20270306/20270307` (all-day) to real start/end times, e.g. `dates=20270306T093000/20270306T183000`.
  - Add `&location=…` (section 3).
- [ ] **If the number of stages changes**, update these four things in `stylesheet.css` and `index.html`:
  1. `style="--i: n"` on each stage, numbered 0, 1, 2, … in order.
  2. `--cycle: calc(var(--step) * 7)`: change `7` to the new count.
  3. The `stage-on` / `arrow-on` keyframe percentages. They assume 7 stages, with one step ≈ 14.3%.
  4. The desktop "snake" placement rules in the `64em` media query (`grid-area` for stages 5–7, and which arrows point right, down or left).

## 5. Team section (`team.js`)

- [ ] **Add new members** to the `members` list. Cards appear in list order, so put the Chair first.
  ```js
  {
      firstName: "First",
      lastName: "Last",
      role: "Role",
      linkedIn: "https://www.linkedin.com/in/…/",
  },
  ```
  - Save each photo as `images/firstname_lastname.jpg`, all lowercase, matching the names exactly as typed (section 2 has the size).
  - If a photo is missing, the card shows the ACM logo, so a misnamed file is easy to spot.
  - Names with an apostrophe need escaping, like `"O\'Brien"`. Spaces and accents make awkward filenames.
- [ ] **Remove members** who have left. Comment them out with `//` or delete them.
- [ ] **Fix a typo:** Jake's role says `"Finance Office"`. It should probably be `"Finance Officer"`.
- [ ] **Google Form for members:** collect first name, last name, role (dropdown), LinkedIn URL (validated), photo upload, and a **consent** checkbox for showing their name, role, photo and LinkedIn on the site.

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
- [ ] **App icons:** add `icons/icon-192.png` and `icons/icon-512.png`, referenced by `site.webmanifest`.
- [ ] **Update `llms.txt`** (the summary for AI search tools): mention the May hackathon once it's confirmed.
- [ ] **Copyright year:** change `&copy; 2026` to 2027 in the footer of all 3 pages in January.
- [ ] **Stop committing Mac system files:** add a `.gitignore` containing `.DS_Store`.
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
