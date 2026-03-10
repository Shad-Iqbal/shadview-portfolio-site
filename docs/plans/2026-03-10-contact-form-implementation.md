# Contact Form Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the fake contact form submission with a real Formspree submission flow and add a thank-you confirmation experience.

**Architecture:** The form remains static HTML on Cloudflare Pages. The contact page submits directly to Formspree, with client-side `fetch()` providing the primary inline success/error experience and `thank-you.html` serving as a redirect fallback.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Formspree, Cloudflare Pages

---

### Task 1: Add a failing smoke test for the contact flow

**Files:**
- Create: `/Users/shad/Desktop/Shadview/deploy-site/tests/contact-form-smoke.mjs`

**Step 1: Write the failing test**

Create a Node-based smoke test that asserts:
- `contact.html` has the Formspree endpoint in the form action
- `contact.html` posts with `method="POST"`
- `contact.html` references `thank-you.html`
- `thank-you.html` exists and includes a thank-you message

**Step 2: Run test to verify it fails**

Run:
```bash
cd /Users/shad/Desktop/Shadview/deploy-site
node tests/contact-form-smoke.mjs
```

Expected: FAIL because the current form does not have a real action and there is no thank-you page.

### Task 2: Implement the real submission flow

**Files:**
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/contact.html`
- Modify: `/Users/shad/Desktop/Shadview/deploy-site/contact.css`
- Create: `/Users/shad/Desktop/Shadview/deploy-site/thank-you.html`

**Step 1: Update form markup**

Add:
- `action="https://formspree.io/f/xvzwkkly"`
- `method="POST"`
- hidden `_next` fallback field
- optional `_subject` field
- hidden honeypot field

**Step 2: Replace fake submit logic**

Remove the current `preventDefault()` + fake reset behavior and replace it with:
- async Formspree submission via `fetch`
- inline success state
- inline fallback error state
- button disabled state while submitting

**Step 3: Add thank-you fallback page**

Create a simple page that confirms the message was received and gives the user a route back to the site.

**Step 4: Run the smoke test again**

Run:
```bash
cd /Users/shad/Desktop/Shadview/deploy-site
node tests/contact-form-smoke.mjs
```

Expected: PASS.

### Task 3: Verify and deploy

**Files:**
- Verify: modified files above

**Step 1: Run patch validation**

Run:
```bash
cd /Users/shad/Desktop/Shadview/deploy-site
git diff --check
```

Expected: no patch issues.

**Step 2: Commit**

```bash
cd /Users/shad/Desktop/Shadview/deploy-site
git add contact.html contact.css thank-you.html tests/contact-form-smoke.mjs docs/plans/2026-03-10-contact-form-design.md docs/plans/2026-03-10-contact-form-implementation.md
git commit -m "feat: connect contact form to Formspree"
```
