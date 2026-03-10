import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const contactHtml = readFileSync(new URL("../contact.html", import.meta.url), "utf8");
const thankYouPath = new URL("../thank-you.html", import.meta.url);

assert.match(
  contactHtml,
  /action="https:\/\/formspree\.io\/f\/xvzwkkly"/,
  "contact form should post to the Formspree endpoint"
);

assert.match(
  contactHtml,
  /method="POST"/,
  "contact form should use POST"
);

assert.match(
  contactHtml,
  /name="_next"[\s\S]*value="https:\/\/shadiqbal\.com\/thank-you\.html"/,
  "contact form should include a thank-you fallback redirect"
);

assert.equal(existsSync(thankYouPath), true, "thank-you page should exist");

const thankYouHtml = readFileSync(thankYouPath, "utf8");
assert.match(
  thankYouHtml,
  /Thanks for reaching out|Thank you for reaching out/i,
  "thank-you page should include confirmation copy"
);
