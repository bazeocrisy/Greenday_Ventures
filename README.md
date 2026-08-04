# Greenday Venture — Website

A static, five-page website for Greenday Venture, an Atlanta-based acquisition
and investment firm working with owners of established home-service businesses
on retirement, succession, and long-term ownership transitions.

## Purpose

1. Establish credibility and trust.
2. Explain the acquisition philosophy.
3. Help a qualified owner judge whether there may be a fit.
4. Encourage a confidential conversation.
5. Support referrals from business brokers and M&A professionals.

It is deliberately not a high-volume lead funnel.

## File structure

```
C:\Greenday_Ventures
│
├── index.html       Homepage
├── about.html       Company overview and founder introduction
├── criteria.html    Sectors and company qualities ("What We Look For")
├── process.html     General process overview
├── contact.html     Confidential inquiry page and form
├── resources.html   Hub linking the three resource pages
├── faq.html         Questions business owners often ask
├── questions-for-buyers.html  Questions worth asking any buyer
├── brokers.html     For brokers and professional advisors
├── 404.html         Not-found page (GitHub Pages serves this automatically)
├── styles.css       Single shared stylesheet
├── script.js        Single shared script
├── README.md        This file
├── .gitignore       (preserve if present)
├── .nojekyll        (preserve if present — keep it for GitHub Pages)
└── Assets\
    ├── greenday-venture-logo.svg         Vector logo — this is what the site loads
    ├── greenday-venture-logo-source.svg  Supplied vector file (preserved, unmodified)
    ├── greenday-venture-icon.svg         Icon mark, used as the favicon
    ├── logo.png                          Superseded raster logo (kept for reference, unused)
    ├── greenday-venture-logo.png         Superseded raster copy (kept for reference, unused)
    ├── hero-we-service.png        Original hero photograph (2 MB, preserved)
    ├── hero-we-service.jpg        Optimised 1400px copy — this is what the site loads
    └── jermane-lamb-headshot.jpg  Founder portrait
```

## Local preview

No build step, no package manager, no dependencies.

- Double-click `index.html`, or
- Run a local server for a closer match to production:

```powershell
Set-Location "C:\Greenday_Ventures"
python -m http.server 8000
# then open http://localhost:8000
```

## GitHub Pages compatibility

- Every link and asset path is **relative** (`about.html`, `styles.css`,
  `Assets/jermane-lamb-headshot.jpg`). No root-relative paths are used, so the
  site works from a project subpath such as
  `https://bazeocrisy.github.io/Greenday_Ventures/`.
- Keep `.nojekyll` in the repository root.
- Pages source: `main` / `(root)`.
- Fonts load from Google Fonts. Offline, the site falls back to comparable
  system serif and sans-serif faces and remains fully readable.

## How to update colours

All colours are CSS custom properties in one place: the **Design Tokens** block
at the top of `styles.css`. Change the hex values there and the whole site
follows. Nothing else in the stylesheet hard-codes a colour.

Working values (not client-approved):

| Token | Value | Role |
| --- | --- | --- |
| `--c-green-900` | `#12241c` | Dark backgrounds, header, footer |
| `--c-green-800` | `#1b3428` | Secondary dark |
| `--c-green-700` | `#264736` | Primary buttons, links |
| `--c-sage-400` | `#8ca694` | Muted text on dark |
| `--c-sage-200` | `#c6d2c6` | Body text on dark |
| `--c-ivory` | `#f6f3ea` | Page background |
| `--c-ivory-dim` | `#ece7da` | Alternating sections |
| `--c-charcoal` | `#23282a` | Headings |
| `--c-charcoal-soft` | `#4a5250` | Body text |
| `--c-bronze` | `#8a5c30` | Accent on light backgrounds |
| `--c-bronze-light` | `#c2914f` | Accent on dark backgrounds |

If you replace these, re-check contrast. Body and small text should stay at or
above 4.5:1 against its background.

## The logo

**The logo currently on the site is a concept pending client approval.** It is
not an approved mark. Every header carries an HTML comment saying so.

**File used:** `Assets/greenday-venture-logo.png` (568×215, transparent PNG).

### About the vector files

**Supplied:** `greenday-venture-logo-source.svg` (900×240 wordmark) and
`greenday-venture-icon.svg` (256×256 icon). Both are genuine vectors, so the
logo is now sharp at any size and on any display density. The earlier raster
files are superseded.

**What the web copy changes.** `greenday-venture-logo.svg` differs from the
supplied file in exactly two ways, neither of which touches the artwork:

1. **viewBox.** The supplied frame is `0 0 900 240`; the web copy uses
   `40 12 650 192` — cropped to the artwork with measured headroom.
   Artwork coordinates are untouched, so the extra space lands entirely on the
   right. An earlier attempt tightened the frame to `62 18 512 186` to remove
   the empty space; that clipped the final letter of "Greenday" on machines
   whose substituted serif renders wider than the one it was measured against.
   The generous frame is deliberate insurance against that.
2. **Font fallbacks.** `'Liberation Serif'`, `'DejaVu Serif'`, `'Liberation Sans'`
   and `'DejaVu Sans'` were appended to the existing stacks. Georgia and Arial
   still win wherever they are installed.

No path, colour, position or proportion was altered.

### One limitation worth knowing

The wordmark uses live `<text>` elements set in Georgia and Arial rather than
outlined paths. An SVG loaded through an `<img>` tag cannot pull in a webfont,
so it renders with whatever the viewer has installed. On Windows and macOS that
is Georgia and Arial as intended. On Linux and Android it falls back, and the
letterforms will differ slightly.

**Ask the designer to convert the text to outlines** (Illustrator: Type →
Create Outlines; Figma: Flatten). That makes the logo render identically
everywhere and removes the font dependency entirely. The frame in the web copy
already carries enough right-hand headroom that a wider fallback font will not
clip: measured against the widest serif available, "Greenday" ends at x 623
inside a 960-wide frame, leaving 337 units spare.

Once the text is outlined, the frame can safely be tightened to the artwork
(roughly `viewBox="60 18 500 190"`), which would make the mark render noticeably
larger at the same display width. Until then the padding stays.

**To replace it with the client's official logo:**

1. Save the approved file into `Assets\` with a lowercase, web-safe name.
2. In **all five** HTML files, update the two `src` attributes (header and
   footer) and the `width`/`height` attributes to match the new file's aspect
   ratio, plus the favicon `<link>` if the icon changes.
3. Delete the "Temporary Greenday Venture logo concept" comment in each header.
4. If the display size needs to change, edit `.site-logo` and `.footer-logo` in
   `styles.css` — set `width` only and leave `height: auto`, so proportions stay
   correct.

## Homepage hero

The hero uses its own wider container (`--wrap-hero`, 1300px) rather than the
global `--wrap` (1080px) that every other section uses. It is anchored, not
centred: the left edge sits exactly where the header logo sits, and the
container extends rightward to the page gutter. Widening it symmetrically would
have pulled the headline left of the logo and broken the masthead alignment.

Desktop grid is 51/49 with a `clamp(2.25rem, 3vw, 3.5rem)` gap. The photograph
is 4:3, which matches the source image's own proportion almost exactly, so the
full van lettering stays visible. Below 900px the hero stacks and reverts to the
global wrapper.

## Assets and performance

Originals are **no longer stored in this repository**. The 2 MB hero PNG and the
two superseded raster logos were moved out to keep the repo and every page load
light; keep your own copies outside the project. The `Assets` folder is now
384 KB in total.

Generated files:

| File | Purpose |
| --- | --- |
| `og-image.png` | 1200x630 social share card, referenced by every page |
| `og-image-source.html` | Source for the share card. Open it, screenshot at 1200x630, and replace the PNG to regenerate — **do this on a machine with Georgia installed**, since the card was rendered with a fallback serif |
| `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png` | Favicon set generated from the icon SVG |

The Google Fonts stylesheet is now loaded with `rel="preload"` and applied on
load, so a slow font server cannot block first paint, with a `<noscript>`
fallback. The homepage preloads the hero image for LCP.

## Images

| File | Used on | Notes |
| --- | --- | --- |
| `Assets/hero-owner-decision.jpg` | Homepage hero (right side of the split layout) | 1408x768. Illustrative only — **not** Jermane Lamb, not clients, not an acquisition. **This image was produced with an AI generation tool.** See the note below. |
| `Assets/hero-we-service.jpg` | Nothing — previous hero, kept as an alternative | 1400x1052. Swap the `src` in the hero `<figure>` in `index.html` to use it again. |
| `Assets/hero-we-service.png` | Nothing — preserved original | 2 MB. Kept unmodified. To load it instead of the JPEG, change the `src` in the hero `<figure>` in `index.html`. |
| `Assets/greenday-venture-logo.svg` | Header **and** footer of all five pages | Vector. Displayed 205px wide on desktop, 168px on mobile, 190px in the footer. Natural ratio is **650:192 = 3.39:1**. Height always follows — never set a fixed height, `aspect-ratio` or `object-fit: cover` on the logo, any of which crops the wordmark. |
| `Assets/greenday-venture-icon.svg` | Favicon on all five pages | 256×256 icon mark, used exactly as supplied. |
| `Assets/greenday-venture-logo-source.svg` | Nothing — preserved original | The supplied file, untouched. |
| `Assets/logo.png`, `Assets/greenday-venture-logo.png` | Nothing — superseded | The earlier raster logo and its processed copy. Kept for reference; safe to delete. |
| `Assets/jermane-lamb-headshot.jpg` | Homepage founder preview and `about.html` | Deliberately kept out of the hero. |

Both images carry explicit `width` and `height` attributes so no layout shift
occurs while they load.

### The hero image is AI-generated

**TODO: Client confirmation required.** The current hero was produced with an AI
image tool. Two things to weigh before publication:

1. Greenday Venture's whole position is that it does not exaggerate. A synthetic
   photograph of people who do not exist sits awkwardly beside that, and AI
   images are increasingly recognisable to viewers.
2. AI images frequently contain artefacts. This one has unreadable text on the
   wall plaques and certificate at the right-hand edge; the crop
   (`object-position: 38% center`) is set to push most of that out of frame, but
   check it at full width before publishing.

The image is a strong emotional fit and is fine as a placeholder. The
recommendation remains a commissioned shoot of a real Atlanta home-service
company.

## How to connect the inquiry form later

The form in `contact.html` has **no `action` attribute and no endpoint**. It
cannot post anywhere and never claims a message was sent. On submit it
validates, then states plainly that the form is not connected and offers a
pre-filled `mailto:` message.

The submit button is labelled **"Prepare Email"** rather than "Send message",
because pressing it prepares a pre-filled email instead of sending anything.
Change the label back to "Send message" at the same time you connect the
endpoint.

To connect it:

1. Create the endpoint (for example, a Formspree form) and copy its URL.
2. In `contact.html`, add the endpoint to the form tag:

```html
<form class="form" id="inquiry-form" action="https://formspree.io/f/YOUR_ID" method="post">
```

   (Remove `novalidate` if you want native browser validation as well.)
3. In `script.js`, change:

```js
var FORM_ENDPOINT_CONNECTED = false;
```

   to `true`. The script then stops intercepting the submit event.
4. Test an end-to-end submission before announcing the site.

## The buyer worksheet

`questions-for-buyers.html` is an interactive worksheet: owners can tick each
question, type the answer they were given, print the result, or email it to
themselves. Ticks and notes are stored in `localStorage` under
`gv-buyer-worksheet-v1` — **in the visitor's own browser only. Nothing is
transmitted, and Greenday Venture never sees any of it.** If storage is
unavailable the worksheet still works for the session. Without JavaScript it
degrades to plain checkboxes and text fields that work on screen and on paper.

## Client Review Required

**All newly drafted substantive content on this site requires Jermane Lamb's
approval before publication — not only the founder letter.** Everything in the
table below was written by the agency for him to react to and revise. None of it
is approved copy. Each section carries an internal HTML comment reading
`<!-- Draft content pending Jermane Lamb's review and approval. -->`.

Items requiring approval before publication:

1. Founder letter
2. FAQ answers
3. Buyer-question guide
4. Brokers and advisors page
5. Homepage owner-decision section
6. Financing language
7. Employee-transition language
8. Company-name language
9. Seller-involvement language
10. Contact inquiry categories

| Item | Where | Notes |
| --- | --- | --- |
| Founder letter | `about.html` | ~667 words, first person. Asserts no biography, employment history, credentials, prior acquisitions or operating experience. Jermane should rewrite anything that does not sound like him. |
| FAQ answers | `faq.html` | 12 questions. Several answers deliberately decline to promise things buyers often promise — see the softening notes below. |
| Questions to Ask Any Buyer | `questions-for-buyers.html` | 7 groups, 28 questions. Published free with no email gate. |
| Brokers and Advisors | `brokers.html` | Includes an explicit note that Greenday Venture is early and publishes no deal history or proof of funds. |
| Homepage owner-decision section | `index.html` | Replaced the earlier compact version of the same section rather than duplicating the argument. |
| Contact inquiry categories | `contact.html` | Four radio options. Confirm the wording and whether more are needed. |

### Qualified disclaimers that must stay

These are honest, case-specific qualifications rather than weaknesses. Do not
delete them in a later pass, and do not let them harden into promises:

- **Confidentiality** — an intention, with a clear statement that an informal
  conversation is not a legal protection and agreements should precede sensitive
  information.
- **Employee outcomes** — no promise that every role, wage or arrangement
  survives.
- **Company-name preservation** — a decision made with the owner, not a default.
- **Transaction timing** — no fixed timeline.
- **Seller involvement** — structured individually, from a short handover to a
  longer advisory role.

### Statements deliberately softened

These are the places where a stronger claim would have been easy and is not
supported. Jermane should confirm he is comfortable with the weaker version, or
supply evidence that would justify a stronger one.

- **Confidentiality** is described as an intention, and the FAQ states plainly
  that an informal conversation is not a legal protection and that agreements
  should be in place before sensitive information moves. No guarantee is given.
- **Employees** — no promise that every role, wage or arrangement survives. The
  FAQ says outright that no buyer can know that before understanding the
  business.
- **Company name** — framed as a decision to make with the owner, not a
  preserved-by-default promise.
- **Holding period** — "focused on long-term ownership", never a committed term.
- **Financing** — no fund size, committed capital or financing guarantee is
  claimed anywhere. The brokers page states that financing capability and
  transaction structure can be discussed directly when an opportunity appears
  aligned with the acquisition focus. It does not announce what the firm lacks.
- **Timelines** — the FAQ refuses to give a fixed acquisition timeline and says
  any buyer offering one before seeing the business is guessing.
- **Track record** — acknowledged once only, in the founder letter, framed as a
  firm that is focused, deliberate and early in its growth. It is not repeated
  on the brokers page or anywhere else, and no page enumerates what the firm
  does not yet have.

## Client confirmations still required

- Final colour palette and whether these working colours are acceptable
- Official logo files (and favicon)
- Approved founder biography wording
- Approved use of the founder photograph
- Approved public credentials (degree, ITIL, cybersecurity, certifications)
- The nature of any Heritage Wealth Capital relationship and whether it may be
  mentioned at all
- Primary audience priority (owners vs. brokers/advisors)
- Specific Southeast states in scope
- Acquisition financial criteria (revenue, EBITDA, employee count) and whether
  any should be public
- Preferred inquiry workflow (email only, form, or both)
- Whether a booking system such as Calendly should ever be added
- Form processing endpoint
- Response-time commitment, if any
- Final domain name (for canonical and Open Graph URLs)
- Whether a privacy policy page is needed
- Approved LinkedIn or other public profile links
- **Approval of the logo**, which is currently a concept, not an official mark
- Licence and usage rights for the hero photograph
- Whether the softened confidentiality wording ("intended to remain private",
  "handled with care") is acceptable, or whether Jermane wants firmer language
  backed by an NDA process
- Definition of website success (inquiries per month, referral quality, etc.)
- Any testimonials, references, or public proof that may be used later

Unconfirmed items are marked in the HTML with comments beginning
`<!-- TODO: Client confirmation required:`. Search the project for that string.

## Unsupported claims intentionally excluded

None of the following appears anywhere in the public copy, because none is
confirmed:

- Completed acquisitions, transaction volume, or assets under management
- Seller results, outcomes, or case studies
- Testimonials, reviews, ratings, or client logos
- Partnerships, affiliations, or professional memberships
- Years of acquisition experience or home-service operating experience
- Revenue or EBITDA thresholds
- Specific target states
- Funding sources or institutional backing
- Any implication that Heritage Wealth Capital or the Department of Defense
  owns, sponsors, endorses, or is affiliated with Greenday Venture
- Certifications, credentials, or degrees
- Guaranteed outcomes or response times
- Online scheduling or booking
- Invented statistics, counters, or metrics
- A postal address or telephone number
- Absolute confidentiality guarantees, or any claim that information is never
  shared with anyone
- Any suggestion that the hero photograph shows Jermane, a client, or a
  completed acquisition

## Deployment

Review the changes locally first, then:

```powershell
Set-Location "C:\Greenday_Ventures"

git status
git add .
git commit -m "Build initial Greenday Venture website"
git push origin main
```

GitHub Pages redeploys from `main` / `(root)` automatically, usually within a
minute or two.
