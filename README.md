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

1. **viewBox.** The supplied frame is `0 0 900 240`, but the artwork only
   occupies roughly x 69–545 — about 40% of the width was empty space to the
   right, which would have pushed the mark left and opened a gap before the
   navigation. The web copy uses `62 18 512 186`, framing the artwork with a
   small margin plus headroom for font width variation.
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
clip.

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

## Images

| File | Used on | Notes |
| --- | --- | --- |
| `Assets/hero-we-service.jpg` | Homepage hero (right side of the split layout) | Editorial support imagery only. It is **not** Jermane Lamb, not a client, and not an acquisition. Nothing on the site may imply otherwise. |
| `Assets/hero-we-service.png` | Nothing — preserved original | 2 MB. Kept unmodified. To load it instead of the JPEG, change the `src` in the hero `<figure>` in `index.html`. |
| `Assets/greenday-venture-logo.svg` | Header **and** footer of all five pages | Vector. Displayed 175px wide on desktop, 140px on mobile, 160px in the footer. Height always follows the natural 2.75:1 proportion — never set it independently. |
| `Assets/greenday-venture-icon.svg` | Favicon on all five pages | 256×256 icon mark, used exactly as supplied. |
| `Assets/greenday-venture-logo-source.svg` | Nothing — preserved original | The supplied file, untouched. |
| `Assets/logo.png`, `Assets/greenday-venture-logo.png` | Nothing — superseded | The earlier raster logo and its processed copy. Kept for reference; safe to delete. |
| `Assets/jermane-lamb-headshot.jpg` | Homepage founder preview and `about.html` | Deliberately kept out of the hero. |

Both images carry explicit `width` and `height` attributes so no layout shift
occurs while they load.

**TODO: Client confirmation required — licence and usage rights for the hero
photograph** before the site is promoted publicly.

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
