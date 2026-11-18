# Contributing to the UCC ACM website

Thanks for helping with the site. It's the public face of **UCC ACM IRLCPC**, a major competitive programming event, and it's hosted on a university network. So we keep it simple, secure and consistent.

Please read this before making your first change. Open tasks are listed in [`TODO.md`](TODO.md).

---

## The workflow (mandatory)

**Never push to `main`.** Every change goes through a branch and a pull request.

### 1. Start from an up-to-date `main`

```
git checkout main
git pull
```

### 2. Create a `test-` branch

Name your branch `test-<your-name>`. Add a short topic if you're working on more than one thing.

```
git checkout -b test-jordan
git checkout -b test-jordan-schedule-times
```

Use lowercase, with hyphens instead of spaces. One branch per piece of work.

### 3. Make small, focused changes

- One topic per branch and per PR, e.g. "add 2027 schedule times", not "schedule + team + colours".
- Check exactly what you're committing before you commit:
  ```
  git status
  git diff
  ```
  In VS Code, stage files one by one with **+**. Don't use "commit all" blindly; that's how team photos were once deleted by accident.
- Never commit `.DS_Store` or other system files.

### 4. Push your branch, not `main`

```
git push -u origin test-jordan
```

### 5. Open a pull request into `main`

- On GitHub, open a **pull request** from your `test-` branch into `main`.
- Explain **what** changed and **why**, and include screenshots for anything visual (phone and desktop).
- List any new placeholders you added (see "Never invent facts" below).
- Another committee member reviews it before it's merged. **Don't merge your own PR.**

### 6. After merging

The site redeploys automatically. Wait about a minute: on GitHub, the repo's **Actions** tab shows "pages build and deployment" with a green tick when it's done. Then hard-refresh with **Cmd + Shift + R** (or **Ctrl + Shift + R**). Browsers can cache old files for up to 10 minutes.

You can then delete your branch.

---

## Principles

These keep the site fast, secure and easy to maintain. PRs that break them will be asked to change.

### Tech: plain HTML5 and CSS3 only
- **No frameworks, libraries, build tools, preprocessors or package managers.** Everything is hand-written, so anyone can open a file and understand it.
- **No new external resources.** The only allowed ones are the existing **Font Awesome** stylesheet (cdnjs, with its `integrity` hash) and the existing **Google Fonts Poppins** link. Don't add other CDNs, scripts, fonts, trackers or embeds.
- **Every font needs a system fallback** (the `--font-sans` variable), so the site still looks right if a CDN fails.

### JavaScript: only when it's genuinely needed
- **Default to CSS.** Hover effects, layout, animations, show/hide with `:has()` and so on should all be CSS.
- **If something really needs JS, raise it first** (in an issue or before you start), and explain:
  - what it does
  - why CSS can't do it
  - its performance cost
  - any security implications
- **Vanilla JS only.** No external scripts, and **no inline event handlers** (`onclick=""`, `onerror=""`); use `addEventListener` in the `.js` files.

### Content: never invent facts
- If something isn't confirmed (venue, times, registration link, sponsors, results, images), **don't guess**. Add a clearly marked placeholder:
  ```html
  <!-- TODO: venue -->
  <span class="tbc">To be confirmed</span>
  ```
- **Dates:** always written as **`6 March 2027`**. In HTML, wrap them as `<time datetime="2027-03-06">6 March 2027</time>`.
- **Past events:** don't change another year's content unless that's the point of your PR.

### Design
- **Use the existing colour palette.** All colours are variables in `:root` at the top of `stylesheet.css` (`--color-accent`, `--color-bg`, …). Use those, not new hex codes.
  - If a colour must change (e.g. for contrast), propose the closest match and explain why.
- **Mobile-first.** Base styles are for phones, and larger screens are added with `@media (min-width: …)`. Test from **320 px** phones to wide desktops: no horizontal scrolling and no overlapping elements.
- **Animations:**
  - Small and short, and only **`transform` and `opacity`**.
  - Everything is automatically switched off for users with *reduced motion* turned on; keep it that way.
- **Accessibility basics:**
  - readable contrast
  - visible keyboard focus (never `outline: none` without a replacement)
  - `alt` text on every image
  - `aria-label` on icon-only links and buttons
- **Speed:** no heavy assets. See "Images" below.

### Code quality
- **CSS stays in its commented sections:** variables, base, layout, components, utilities, animations, media queries and reduced motion.
- **Where CSS goes:**
  - `stylesheet.css`: styles shared by every page.
  - `changes.css`: home-page-only components (partners, team).
  - `links/events.css`: past-events-only styles.
- **No dead code.** Remove what you replace, and don't leave commented-out blocks behind (git history keeps old versions).
- **No `!important`**, unless it's genuinely justified and commented. The reduced-motion block is the one current example.
- **Keep it readable:** clear names, consistent formatting, and a short comment wherever something isn't obvious.
- **Keep HTML changes minimal:** keep the existing page structure and content order. Add classes or semantic wrappers rather than restructuring.

### Images
- **Photos** (team, events, posters): `.jpg` (lowercase).
  - Team photos: about 600 × 800 (portrait, face centred), under about 100 KB.
  - Event photos and posters: up to 1600 px wide, under about 250 KB.
- **Logos:** `.png` with a transparent background, about 400 px wide.
- **Team photo names** must match `images/firstname_lastname.jpg` exactly, all lowercase.
- **Names are case-sensitive.** GitHub Pages runs on Linux (`Photo.jpg` ≠ `photo.jpg`), even if your computer doesn't care.

---

## Before you open a PR: checklist

- [ ] Branch is named `test-<your-name>…` and the PR targets `main`.
- [ ] Only the files I meant to change are in the diff (no deleted images, no `.DS_Store`).
- [ ] Checked on a phone-sized screen (320 px), a tablet and a desktop, with no horizontal scroll.
- [ ] Keyboard works: Tab through the page and focus is always visible.
- [ ] No new external resources, frameworks or inline event handlers.
- [ ] Any JS is vanilla and was agreed first.
- [ ] Colours use the palette variables.
- [ ] Animations are transform/opacity only.
- [ ] No invented facts. Placeholders are marked `TODO` and listed in the PR description.
- [ ] Dates use the `6 March 2027` format.
- [ ] Images are compressed and named correctly.

---

## For the repo owner: enforce it on GitHub

To make "PRs only" automatic, protect `main`:

1. Go to **Settings → Branches → Add branch protection rule** (or **Rules → Rulesets**).
2. Set the branch name pattern to `main`.
3. Turn on:
   - **Require a pull request before merging**, with **1 approval**
   - **Do not allow bypassing the above settings**
   - **Block force pushes**

After that, GitHub rejects direct pushes to `main`, even by accident.
