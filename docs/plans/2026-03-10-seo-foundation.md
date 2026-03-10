# SEO Foundation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a production-ready SEO foundation for the static portfolio site using `https://shadiqbal.com` as the canonical domain.

**Architecture:** The site is a static HTML portfolio deployed directly from the repository root to Cloudflare Pages. SEO work should stay simple and explicit: update each page head with absolute metadata, add static crawler files at the repo root, and keep redirects/domain behavior in Cloudflare rather than inventing app-level routing.

**Tech Stack:** Static HTML, CSS, Cloudflare Pages, GitHub Actions

---

### Task 1: Add page-level canonical and social metadata

**Files:**
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/index.html`
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/homepage.html`
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/about.html`
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/work.html`
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/writing.html`
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/contact.html`
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/muktopaath-case-study.html`
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/laundry-case-study.html`
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/reve-chat-case-study.html`

**Step 1: Audit current head tags**

Run:
```bash
cd /Users/shad/Desktop/Shadview/deploy-site
rg -n '<title|meta name="description"|rel="canonical"|property="og:|name="twitter:' *.html
```

Expected: titles and descriptions exist, but canonical and social tags are missing or incomplete.

**Step 2: Add absolute canonical tags**

Add one canonical URL per page, for example:
```html
<link rel="canonical" href="https://shadiqbal.com/about" />
```

Use the final clean public URL for each page.

**Step 3: Add Open Graph and Twitter metadata**

Add:
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="https://shadiqbal.com/..." />
<meta property="og:type" content="website" />
<meta property="og:image" content="https://shadiqbal.com/assets/.../social-preview.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

Use `article` for case studies if that better matches the page purpose.

**Step 4: Verify metadata presence**

Run:
```bash
cd /Users/shad/Desktop/Shadview/deploy-site
rg -n 'rel="canonical"|property="og:|name="twitter:' *.html
```

Expected: every public HTML page contains canonical and social metadata.

### Task 2: Add crawler and discovery files

**Files:**
- Create: `/Users/shad/Desktop/Shadview/deploy-site/robots.txt`
- Create: `/Users/shad/Desktop/Shadview/deploy-site/sitemap.xml`

**Step 1: Add `robots.txt`**

Create:
```txt
User-agent: *
Allow: /

Sitemap: https://shadiqbal.com/sitemap.xml
```

**Step 2: Add `sitemap.xml`**

Include all public pages:
- `/`
- `/about`
- `/work`
- `/writing`
- `/contact`
- `/muktopaath-case-study`
- `/laundry-case-study`
- `/reve-chat-case-study`

**Step 3: Verify files resolve locally**

Run:
```bash
cd /Users/shad/Desktop/Shadview/deploy-site
python3 -m http.server 4173
```

Then verify:
```bash
curl -I http://127.0.0.1:4173/robots.txt
curl -I http://127.0.0.1:4173/sitemap.xml
```

Expected: both return `200`.

### Task 3: Replace placeholder favicon and add share image

**Files:**
- Create: `/Users/shad/Desktop/Shadview/deploy-site/assets/branding/`
- Modify: all public HTML files under `/Users/shad/Desktop/Shadview/deploy-site/`

**Step 1: Create a minimal real favicon set**

Add at minimum:
- `favicon.ico`
- `favicon.svg` or `favicon.png`

**Step 2: Add a reusable social preview image**

Create one share image for the site, then reference it in page metadata until page-specific images exist.

**Step 3: Update head tags**

Replace the inline favicon placeholder with file-based references.

**Step 4: Verify asset references**

Run:
```bash
cd /Users/shad/Desktop/Shadview/deploy-site
rg -n 'rel="icon"|og:image' *.html
```

Expected: all pages point to real asset paths.

### Task 4: Align domain behavior with canonical choice

**Files:**
- No repository file required for the redirect itself
- Reference: `/Users/shad/Desktop/Shadview/deploy-site/TODO.md`

**Step 1: Create a Cloudflare redirect**

In Cloudflare Rules, add a redirect from:
```txt
https://www.shadiqbal.com/*
```

to:
```txt
https://shadiqbal.com/${1}
```

with `301` and query-string preservation enabled.

**Step 2: Verify behavior**

Run:
```bash
curl -I https://www.shadiqbal.com/
curl -I https://shadiqbal.com/
```

Expected: `www` returns a `301` to apex, and apex returns `200`.

### Task 5: Final verification

**Files:**
- Verify: all modified files above

**Step 1: Run static checks**

Run:
```bash
cd /Users/shad/Desktop/Shadview/deploy-site
git diff --check
```

Expected: no whitespace or patch-format issues.

**Step 2: Spot-check public pages locally**

Run:
```bash
cd /Users/shad/Desktop/Shadview/deploy-site
python3 -m http.server 4173
```

Then open:
- `http://127.0.0.1:4173/`
- `http://127.0.0.1:4173/about.html`
- `http://127.0.0.1:4173/work.html`

Expected: pages render normally and preserve visual structure after head updates.

**Step 3: Commit**

```bash
cd /Users/shad/Desktop/Shadview/deploy-site
git add .github/workflows/pages-deployment.yml TODO.md docs/plans/2026-03-10-seo-foundation.md
git commit -m "chore: add deployment workflow and SEO planning"
```
