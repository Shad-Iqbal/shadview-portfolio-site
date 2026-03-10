# Contact Form Design

**Problem:** The current contact form only simulates success in the browser and never sends a message.

**Decision:** Use Formspree as the submission backend for `hello@shadiqbal.com`, keep the existing form layout, and add a real post-submit confirmation flow.

**Approved approach:**
- Submit to `https://formspree.io/f/xvzwkkly`
- Keep the existing inline status area and turn it into a real success/error message
- Use JavaScript `fetch()` for the primary flow so the thank-you message appears in place
- Add `thank-you.html` as a fallback destination for non-JavaScript submissions
- Preserve the current visual language and avoid introducing a new service dashboard dependency into the UI

**Data flow:**
1. User submits the form
2. Browser posts FormData to Formspree
3. On success, the form resets and an inline thank-you note appears
4. On failure, the user sees a fallback error message with the direct email address
5. If JavaScript is unavailable, Formspree redirects to `https://shadiqbal.com/thank-you.html`

**Constraints:**
- Static Cloudflare Pages deployment
- No custom backend
- Minimal code change to the current contact page
- Thank-you state must feel native to the existing portfolio
