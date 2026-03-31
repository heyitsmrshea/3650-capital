# 3650 Capital — WordPress Migration: Autonomous Execution Prompt

## ROLE AND MANDATE

You are an autonomous WordPress migration agent. Your sole job is to faithfully migrate the 3650 Capital GitHub Pages site into the WordPress.com site at `projectvet.wordpress.com`. You have access to the WordPress.com MCP server (`wpcom-mcp`). You will execute every phase below in strict order, without skipping steps, without asking for clarification, and without stopping until every task is marked complete. If a tool call fails, retry once with corrected parameters before continuing.

---

## SYSTEM CONTEXT

### Source Site
- **Path:** `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/`
- **Pages:** `index.html`, `firm.html`, `solutions.html`, `transactions.html`, `leadership.html`, `contact.html`, `privacy.html`, `terms.html`
- **Fonts:** Archivo + Newsreader (Google Fonts)
- **JS file:** `motion.js` — scroll animations, ambient background, Vimeo modal. **Do not port this.** Replace video modal with native Vimeo embed block.
- **Assets folder:** `./assets/` — favicon, media images (local). Some images are hotlinked from `3650capital.com` CDN.

### WordPress Target
- **Site URL:** `projectvet.wordpress.com`
- **Site ID:** `214073375`
- **Plan:** Business (custom CSS, custom plugins, full FSE access)
- **Theme:** Blank Canvas (`pub/blank-canvas-3`) — Full Site Editing (FSE) block theme
- **Status:** Coming Soon — do NOT disable Coming Soon until Phase 7 QA is complete
- **MCP Tool:** `wpcom-mcp-content-authoring` for all page/post/media operations
- **MCP Tool:** `wpcom-mcp-site-editor-context` for theme/preset queries
- **MCP Tool:** `wpcom-mcp-site-settings` for site configuration

### Design Tokens (source CSS)
```
--paper:        #eee6d7   (surface / tertiary)
--paper-base:   #f3ecdf   (body background warm)
--ink:          #131313   (foreground / body text)
--ink-soft:     #4c473f   (muted text)
--accent:       #133f37   (forest green / primary CTA)
--signal:       #a07c44   (gold / secondary accent)
--line:         rgba(19,19,19,0.14)
--line-strong:  rgba(19,19,19,0.32)
--max-width:    1520px
```

### Typography
- **Body font:** Archivo (400, 500, 600, 700, 800)
- **Display/heading font:** Newsreader (500, 600, 700 — optical size 6..72)
- **Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&display=swap`

### Key External Assets (hotlinked — do not re-upload these)
- Logo: `https://3650capital.com/wp-content/uploads/2024/10/3650Capital-Logo.png`
- Oasis Pointe: `https://3650capital.com/wp-content/uploads/2020/12/Oasis-Pointe-Rendering-1.jpg`
- Gateway at Wynwood: `https://3650capital.com/wp-content/uploads/2021/10/Gateway-at-Wynwood.png`
- 48 East: `https://3650capital.com/wp-content/uploads/2021/10/48-East.png`
- Tacoma Marriott: `https://3650capital.com/wp-content/uploads/2021/10/Tacoma-Marriott.png`
- Renaissance Dallas: `https://3650capital.com/wp-content/uploads/2019/06/RENAISSANCE.png`
- Architecture hero: `https://3650capital.com/wp-content/uploads/2023/10/modern-urban-architecture-2021-08-26-16-56-11-utc-copy-scaled.jpg`
- Solutions hero: `https://3650capital.com/wp-content/uploads/2023/10/DownloadDepositphotos_468044442_L-copy.jpg`
- Vimeo poster: `https://vumbnail.com/879025491.jpg`
- Headshot Toby Cobb: `https://3650capital.com/wp-content/uploads/2020/08/3650-Headshots-A0746.jpg`
- Headshot Jonathan Roth: `https://3650capital.com/wp-content/uploads/2020/08/3650-Headshots-A0857.jpg`
- Headshot Peter LaPointe: `https://3650capital.com/wp-content/uploads/2020/08/Peter-3650-A013.jpg`
- Headshot Andrew Parower: `https://3650capital.com/wp-content/uploads/2023/12/3650-Headshots-Oct-2023-Miami-A0562-scaled.jpg`
- Headshot Jake Stahler: `https://3650capital.com/wp-content/uploads/2023/01/3650-Headshots-A0720-min.jpg`
- Headshot Malay Bansal: `https://3650capital.com/wp-content/uploads/2020/08/3650-Headshots-A0385.jpg`
- Headshot Ken Dickey: `https://3650capital.com/wp-content/uploads/2020/08/3650-Headshots-A0088-2.jpg`
- Headshot Daniel Antonelli: `https://3650capital.com/wp-content/uploads/2023/06/Dan-.jpg`

### Local Assets to Upload to WP Media Library
Located at `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/assets/`:
- `favicon-3650.png`
- `media/rendering-center-at-miami-gardens-courtesy-3650-reit.jpg`
- `media/Founders-Profile-.png`
- `media/Commercial-Observer-Founders-Image.png`
- `media/Gateway-at-Wynwood-e1578945268648.jpg`
- `media/Oasis-Pointe.-Image-courtesy-of-3650-REIT-.jpeg`
- `media/3650Capital-Logo.png`

---

## EXECUTION PHASES

Execute in strict order. Do not proceed to the next phase until the current phase is confirmed complete.

---

### PHASE 1 — SITE SETTINGS

Use `wpcom-mcp-site-settings` to configure the following. Confirm each setting before moving on.

1. **Site title:** `3650 Capital`
2. **Tagline:** `Commercial real estate credit platform`
3. **Site language:** `en`
4. **Default post category:** set to uncategorized (leave default)
5. **Discussion:** set `default_comment_status` to `closed` (disable comments globally)
6. **Reading:** set front page to display a static page (you will assign the homepage after Page 1 is created in Phase 4)

---

### PHASE 2 — GLOBAL STYLES (Custom CSS)

Use `wpcom-mcp-content-authoring` or `wpcom-mcp-site-settings` to inject the following as the site's Additional CSS. This is the complete design system — do not truncate or abbreviate it.

```css
/* ============================================================
   3650 CAPITAL — WORDPRESS GLOBAL STYLES
   Ported from /3650 Capital/styles.css
   ============================================================ */

/* FONTS */
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&display=swap');

/* TOKENS */
:root {
  --paper: #eee6d7;
  --paper-strong: #e0d3bc;
  --ink: #131313;
  --ink-soft: #4c473f;
  --accent: #133f37;
  --signal: #a07c44;
  --line: rgba(19,19,19,0.14);
  --line-strong: rgba(19,19,19,0.32);
  --max: 1520px;
}

/* BASE */
body {
  font-family: 'Archivo', sans-serif;
  color: var(--ink);
  background: linear-gradient(180deg, #f3ecdf 0%, var(--paper) 100%);
  margin: 0;
}

h1, h2, h3, h4 {
  font-family: 'Newsreader', serif;
  font-weight: 600;
  line-height: 1.15;
  margin: 0 0 0.5em;
}

p { margin: 0 0 1em; line-height: 1.65; }
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; height: auto; }

/* LAYOUT */
.c3650-container {
  width: min(calc(100% - 48px), var(--max));
  margin: 0 auto;
}

.c3650-section {
  padding: 96px 0;
}

.c3650-section-sm {
  padding: 56px 0;
}

/* TYPOGRAPHY UTILITIES */
.c3650-kicker {
  font-family: 'Archivo', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin: 0 0 0.75em;
}

.c3650-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin: 0 0 0.4em;
}

.c3650-lede {
  font-size: clamp(1.05rem, 1.5vw, 1.2rem);
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 56ch;
}

.c3650-h1 {
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
}

.c3650-h2 {
  font-size: clamp(2rem, 3.2vw, 3rem);
  line-height: 1.15;
  letter-spacing: -0.015em;
}

.c3650-h3 {
  font-size: clamp(1.1rem, 1.6vw, 1.35rem);
  line-height: 1.25;
}

/* TEXT LINK */
.c3650-text-link {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--signal);
  color: var(--ink);
  transition: color 0.2s;
}
.c3650-text-link:hover { color: var(--accent); }

/* AWARD RAIL */
.c3650-award-rail {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 14px 0;
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.82rem;
}

/* HERO */
.c3650-hero {
  padding: 72px 0 80px;
}

.c3650-hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

.c3650-hero-visual {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.c3650-hero-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.c3650-hero-visual figcaption {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  background: rgba(19,19,19,0.72);
  color: #fff;
  padding: 12px 16px;
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.c3650-hero-rail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid var(--line);
  margin-top: 48px;
}

.c3650-hero-facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-right: 1px solid var(--line);
}

.c3650-hero-facts > div,
.c3650-hero-stance {
  padding: 24px 28px;
  border-left: 1px solid var(--line);
}

.c3650-hero-stance {
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.88rem;
}

/* TAG STRIP */
.c3650-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
}

.c3650-tags li {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 12px;
  border: 1px solid var(--line-strong);
  border-radius: 2px;
  color: var(--ink-soft);
}

/* GRID LAYOUTS */
.c3650-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

.c3650-grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

.c3650-grid-5 {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2px;
}

.c3650-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px;
}

.c3650-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

/* CARD / ARTICLE */
.c3650-card {
  background: rgba(255,255,255,0.44);
  border: 1px solid var(--line);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.c3650-card h3 {
  font-size: 1.05rem;
  margin: 0;
}

.c3650-card p {
  font-size: 0.88rem;
  color: var(--ink-soft);
  margin: 0;
}

/* OFFICE GRID */
.c3650-office-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2px;
  margin-top: 40px;
}

.c3650-office-card {
  background: rgba(255,255,255,0.44);
  border: 1px solid var(--line);
  padding: 24px 20px;
}

.c3650-office-card strong {
  display: block;
  font-size: 0.88rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.c3650-office-card span {
  font-size: 0.82rem;
  color: var(--ink-soft);
  line-height: 1.55;
}

/* LEADERSHIP ROSTER */
.c3650-roster-card {
  background: rgba(255,255,255,0.44);
  border: 1px solid var(--line);
  padding: 0;
  display: flex;
  flex-direction: column;
}

.c3650-roster-portrait {
  aspect-ratio: 3/4;
  overflow: hidden;
  background: var(--paper-strong);
}

.c3650-roster-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.c3650-roster-copy {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* NEWS LIST */
.c3650-news-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  margin-top: 24px;
}

.c3650-news-item {
  background: rgba(255,255,255,0.44);
  border: 1px solid var(--line);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: background 0.2s;
}

.c3650-news-item:hover { background: rgba(255,255,255,0.72); }

.c3650-news-item h3 {
  font-size: 0.95rem;
  margin: 0;
}

.c3650-news-item p {
  font-size: 0.82rem;
  color: var(--ink-soft);
  margin: 0;
}

/* SECTION DIVIDER */
.c3650-divider {
  border: none;
  border-top: 1px solid var(--line);
  margin: 0;
}

/* PROOF / TRANSACTION */
.c3650-proof-lead {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 2px;
  background: rgba(255,255,255,0.44);
  border: 1px solid var(--line);
  padding: 40px;
}

/* CHIP ROW */
.c3650-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.c3650-chip {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 6px 14px;
  border: 1px solid var(--accent);
  color: var(--accent);
  border-radius: 2px;
}

/* VIMEO EMBED */
.c3650-video-wrap {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 6px;
}

.c3650-video-wrap iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border: 0;
}

/* FOOTER */
.c3650-footer {
  border-top: 1px solid var(--line);
  padding: 64px 0 32px;
  margin-top: 80px;
}

.c3650-footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.c3650-footer-bottom {
  border-top: 1px solid var(--line);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  color: var(--ink-soft);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .c3650-hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .c3650-grid-4 { grid-template-columns: repeat(2, 1fr); }
  .c3650-grid-5 { grid-template-columns: repeat(2, 1fr); }
  .c3650-grid-3 { grid-template-columns: repeat(2, 1fr); }
  .c3650-footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .c3650-hero-rail { grid-template-columns: 1fr; }
  .c3650-hero-facts { grid-template-columns: 1fr; border-right: none; }
  .c3650-grid-2 { grid-template-columns: 1fr; }
  .c3650-grid-3 { grid-template-columns: 1fr; }
  .c3650-grid-4 { grid-template-columns: 1fr; }
  .c3650-grid-5 { grid-template-columns: 1fr; }
  .c3650-split { grid-template-columns: 1fr; gap: 32px; }
  .c3650-proof-lead { grid-template-columns: 1fr; }
  .c3650-news-list { grid-template-columns: 1fr; }
  .c3650-footer-grid { grid-template-columns: 1fr; }
  .c3650-footer-bottom { flex-direction: column; gap: 8px; }
  .c3650-section { padding: 64px 0; }
  .c3650-h1 { font-size: 2.4rem; }
  .c3650-h2 { font-size: 1.8rem; }
}
```

---

### PHASE 3 — MEDIA UPLOAD

Using `wpcom-mcp-content-authoring` with `media.upload`, upload the following local files. **Record the returned URL for each uploaded file** — you will need these URLs when building page content in Phase 4.

Files to upload (absolute paths):
1. `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/assets/favicon-3650.png`
2. `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/assets/media/rendering-center-at-miami-gardens-courtesy-3650-reit.jpg`
3. `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/assets/media/Founders-Profile-.png`
4. `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/assets/media/Commercial-Observer-Founders-Image.png`
5. `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/assets/media/Gateway-at-Wynwood-e1578945268648.jpg`
6. `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/assets/media/3650Capital-Logo.png`

After upload, set the site icon (favicon) to the uploaded `favicon-3650.png` via site settings.

---

### PHASE 4 — PAGE CREATION

Create all 8 pages as **drafts** first. After all 8 are created, review, then publish. Use `wpcom-mcp-content-authoring` with `pages.create`. All pages use `status: "draft"` initially.

For each page, the content is provided as WordPress block HTML below. Use the CSS classes defined in Phase 2. For all images, use the uploaded WP Media URLs from Phase 3 where applicable, and the external CDN URLs defined in the System Context for hotlinked assets.

---

#### PAGE 1: HOME (slug: `/`, set as front page)

**Title:** `Home`
**Meta description:** `Commercial real estate credit solutions across the property life cycle.`

**Block content:**

```html
<!-- wp:html -->
<div class="c3650-container">

  <!-- AWARD RAIL -->
  <div class="c3650-award-rail">
    <span class="c3650-kicker">Recognition</span>
    <p style="margin:0;font-size:0.85rem;"><strong>PERE Credit named 3650 Capital its 2025 Alternative Lender of the Year</strong> in the sub-$5B real estate AUM category.</p>
    <a class="c3650-text-link" href="https://www.businesswire.com/news/home/20260226509216/en/3650-Capital-Wins-PERE-Credit-Alternative-Lender-of-the-Year-Award" target="_blank" rel="noreferrer">Read announcement</a>
  </div>

  <!-- HERO -->
  <section class="c3650-hero">
    <div style="margin-bottom:24px;">
      <p class="c3650-kicker">Commercial real estate credit platform</p>
      <p style="font-size:0.78rem;color:var(--ink-soft);margin:0;">Issue 01 / Institutional Credit / North America</p>
    </div>
    <div class="c3650-hero-grid">
      <div class="c3650-hero-copy">
        <h1 class="c3650-h1" style="margin-bottom:24px;">One lender.<br><em>From capitalization</em><br>to maturity.</h1>
        <p class="c3650-lede">3650 originates, structures, services, and safeguards commercial real estate loans across the property life cycle, with origination, servicing, and asset management carried through one platform.</p>
      </div>
      <figure class="c3650-hero-visual" style="margin:0;">
        <img src="[UPLOADED_URL: rendering-center-at-miami-gardens]" alt="Center at Miami Gardens development rendering" />
        <figcaption>
          <span class="c3650-label" style="color:#fff;opacity:0.7;">Lead Transaction</span>
          <span>Center at Miami Gardens | $49.3M senior construction loan</span>
        </figcaption>
      </figure>
    </div>
    <div class="c3650-hero-rail">
      <div class="c3650-hero-facts">
        <div><p class="c3650-label">Operating model</p><strong>Vertically integrated</strong></div>
        <div><p class="c3650-label">Servicing posture</p><strong>Retained servicing</strong></div>
        <div><p class="c3650-label">Physical presence</p><strong>Five offices</strong></div>
      </div>
      <div class="c3650-hero-stance">
        <p class="c3650-label">3650 stance</p>
        <strong>One lender. Wholly committed.</strong>
        <span style="font-size:0.85rem;color:var(--ink-soft);">Relationship and service stay connected to the loan instead of being handed off to separate systems.</span>
      </div>
    </div>
  </section>

  <hr class="c3650-divider" />

  <!-- STATEMENT BAND -->
  <section class="c3650-section">
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:48px;align-items:start;margin-bottom:40px;">
      <div>
        <p class="c3650-kicker">Why the platform matters</p>
        <h2 class="c3650-h2">Borrowers do not just need capital. They need continuity.</h2>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:2px;">
      <article class="c3650-card">
        <p class="c3650-label">Relationship</p>
        <h3>Long-term, value-added.</h3>
        <p>Borrowers and partners are supported from origination through asset management and exit.</p>
      </article>
      <article class="c3650-card">
        <p class="c3650-label">Platform</p>
        <h3>Vertically integrated.</h3>
        <p>Sourcing, underwriting, closing, and servicing stay inside one internal process.</p>
      </article>
      <figure style="margin:0;grid-column:span 1;">
        <img src="[UPLOADED_URL: Commercial-Observer-Founders-Image]" alt="3650 Capital founders editorial image" style="width:100%;height:100%;object-fit:cover;" />
      </figure>
      <article class="c3650-card" style="grid-column:span 1;">
        <p class="c3650-label">Range</p>
        <h3>Debt, equity, short-term, long-term.</h3>
        <p>Acquisition, development, repositioning, recapitalization, and refinancing stay inside one credit platform.</p>
      </article>
    </div>
  </section>

  <hr class="c3650-divider" />

  <!-- FOUNDERS VIDEO -->
  <section class="c3650-section">
    <div class="c3650-split">
      <div>
        <p class="c3650-kicker">Hear from our founders</p>
        <h2 class="c3650-h2">A better experience.</h2>
        <p>Hear from the founders about 3650's relationship and service-based approach. It is the driver for customer-centric outcomes that support borrowers and sponsors as they grow cash flow and the value of their properties.</p>
      </div>
      <div class="c3650-video-wrap">
        <iframe src="https://player.vimeo.com/video/879025491?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="3650 Capital founders video"></iframe>
      </div>
    </div>
  </section>

  <hr class="c3650-divider" />

  <!-- PROOF SECTION -->
  <section class="c3650-section">
    <p class="c3650-kicker">Platform at a glance</p>
    <h2 class="c3650-h2" style="margin-bottom:40px;">Transactions and credit solutions.</h2>
    <div class="c3650-proof-lead">
      <div>
        <p class="c3650-label">Lead transaction</p>
        <h3 class="c3650-h3" style="font-size:1.5rem;margin-bottom:12px;">Center at Miami Gardens</h3>
        <p>A $49.3 million senior construction loan supporting mixed-use development in Miami Gardens, Florida.</p>
        <ul class="c3650-tags">
          <li>$49.3M</li>
          <li>Senior construction loan</li>
          <li>Miami Gardens, FL</li>
        </ul>
      </div>
      <figure style="margin:0;border-radius:4px;overflow:hidden;">
        <img src="[UPLOADED_URL: rendering-center-at-miami-gardens]" alt="Center at Miami Gardens rendering" />
      </figure>
    </div>
    <div class="c3650-grid-2" style="margin-top:2px;">
      <article class="c3650-card">
        <p class="c3650-label">Real estate credit solutions</p>
        <h3>Creative capital across the property life cycle.</h3>
        <p>3650 specializes in credit solutions for acquisition, development, repositioning, recapitalization, and refinancing transactions.</p>
      </article>
      <article class="c3650-card">
        <p class="c3650-label">Special situations</p>
        <h3>Equity and structured capital.</h3>
        <p>Broken capital structures, loan purchases, and value-add business plans across North America and asset classes.</p>
      </article>
    </div>
  </section>

  <hr class="c3650-divider" />

  <!-- LEADERSHIP PROFILE -->
  <section class="c3650-section">
    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:32px;">
      <p class="c3650-kicker">Leadership profile</p>
      <a class="c3650-text-link" href="/leadership">View full leadership roster</a>
    </div>
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:48px;align-items:start;">
      <div class="c3650-grid-3" style="gap:2px;">
        <article class="c3650-card">
          <p class="c3650-label">Our ethos</p>
          <h3>One lender. Wholly committed.</h3>
          <p>The business philosophy hinges on the strength of relationships between lenders, partners, and borrowers.</p>
        </article>
        <article class="c3650-card">
          <p class="c3650-label">Our culture</p>
          <h3>Higher standards.</h3>
          <p>Predictable processes, high expectations, and readiness to respond efficiently as property and market conditions evolve.</p>
        </article>
        <article class="c3650-card">
          <p class="c3650-label">Leadership</p>
          <h3>An established industry force.</h3>
          <p>Cross-discipline experience across debt, equity, development, repositioning, leasing, and property management.</p>
        </article>
      </div>
      <figure style="margin:0;border-radius:4px;overflow:hidden;">
        <img src="[UPLOADED_URL: Founders-Profile]" alt="3650 Capital founders portrait" />
      </figure>
    </div>
  </section>

  <hr class="c3650-divider" />

  <!-- NEWS SECTION -->
  <section class="c3650-section">
    <p class="c3650-kicker">3650 in the news</p>
    <h2 class="c3650-h2" style="margin-bottom:40px;">News and press coverage.</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-bottom:2px;">
      <figure style="margin:0;aspect-ratio:16/9;overflow:hidden;border-radius:4px;">
        <img src="[UPLOADED_URL: Gateway-at-Wynwood]" alt="Gateway at Wynwood development image" style="width:100%;height:100%;object-fit:cover;" />
      </figure>
      <div class="c3650-card" style="justify-content:center;">
        <p class="c3650-label">News archive</p>
        <h3><a href="/transactions">Read the latest 3650 news.</a></h3>
        <p>Recent coverage tied to financings, dispositions, and market activity.</p>
      </div>
    </div>
    <div class="c3650-news-list">
      <a class="c3650-news-item" href="https://therealdeal.com/miami/2024/12/20/landau-taubco-nab-bay-harbor-offices-loan-form-3650-capital/" target="_blank" rel="noreferrer">
        <p class="c3650-label">December 20, 2024</p>
        <h3>Landau, Taubco land $74M construction loan for Bay Harbor office project.</h3>
        <p>South Florida construction financing coverage.</p>
      </a>
      <a class="c3650-news-item" href="https://www.multihousingnews.com/scenic-la-community-changes-hands/" target="_blank" rel="noreferrer">
        <p class="c3650-label">October 1, 2024</p>
        <h3>Scenic LA Community Changes Hands.</h3>
        <p>Los Angeles multifamily transaction coverage.</p>
      </a>
      <a class="c3650-news-item" href="https://commercialobserver.com/2024/05/3650-reit-jp-morgan-chase-provide-62m-refi-columbus-warehouse/" target="_blank" rel="noreferrer">
        <p class="c3650-label">May 20, 2024</p>
        <h3>3650 REIT, JP Morgan Chase provide $62M refi on Columbus warehouse.</h3>
        <p>Industrial refinancing coverage.</p>
      </a>
      <a class="c3650-news-item" href="https://commercialobserver.com/2024/01/3650-reit-provides-145m-construction-financing-two-socal-projects/" target="_blank" rel="noreferrer">
        <p class="c3650-label">January 8, 2024</p>
        <h3>3650 REIT provides $145M in construction financing for two SoCal projects.</h3>
        <p>Southern California construction lending coverage.</p>
      </a>
    </div>
  </section>

</div>
<!-- /wp:html -->
```

---

#### PAGE 2: FIRM (slug: `/firm`)

**Title:** `Firm`
**Meta description:** `3650 Capital's business philosophy and operating model hinge on the strength of relationships.`

```html
<!-- wp:html -->
<div class="c3650-container">

  <!-- HERO -->
  <section class="c3650-hero">
    <p class="c3650-kicker">Firm</p>
    <h1 class="c3650-h1" style="margin-bottom:24px;">One lender.<br>Wholly committed.</h1>
    <p class="c3650-lede">3650's business philosophy and operating model hinge on the strength of its relationships. Responsiveness, effectiveness, and transparency are visible throughout the organization.</p>
    <div class="c3650-chips">
      <span class="c3650-chip">Responsiveness</span>
      <span class="c3650-chip">Effectiveness</span>
      <span class="c3650-chip">Transparency</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:48px;">
      <div class="c3650-card"><strong>Who we are</strong><p>Commercial real estate credit platform with debt, servicing, and operating depth.</p></div>
      <div class="c3650-card"><strong>Why us</strong><p>Professional borrowers return when reliable structures and continuity are real.</p></div>
      <div class="c3650-card"><strong>How it holds</strong><p>Asset management, loan servicing, and origination are connected, not siloed.</p></div>
    </div>
  </section>

  <hr class="c3650-divider" />

  <!-- ETHOS -->
  <section class="c3650-section">
    <div class="c3650-split">
      <div>
        <p class="c3650-kicker">Our ethos</p>
        <h2 class="c3650-h2">Relationships anchor the operating model.</h2>
      </div>
      <p style="color:var(--ink-soft);line-height:1.7;">The connection between lenders, partners, and borrowers is bolstered by responsiveness, effectiveness, and transparency throughout the organization. As each relationship grows, the platform develops more intimate knowledge of the asset and the transaction.</p>
    </div>
  </section>

  <hr class="c3650-divider" />

  <!-- CULTURE -->
  <section class="c3650-section">
    <div class="c3650-split" style="margin-bottom:48px;">
      <div>
        <p class="c3650-kicker">Our culture</p>
        <h2 class="c3650-h2">Higher standards.</h2>
      </div>
      <p style="color:var(--ink-soft);line-height:1.7;">The leaders of 3650 facilitate a culture of high expectation with respect to principles, process, and service. The framework of operations aims to create positive results while staying prepared to respond efficiently and effectively as conditions evolve.</p>
    </div>
    <div class="c3650-grid-3" style="gap:2px;">
      <article class="c3650-card">
        <p class="c3650-label">Process</p>
        <h3>Predictable structure.</h3>
        <p>Reliable structures help build repeat business with professional property owners.</p>
      </article>
      <article class="c3650-card">
        <p class="c3650-label">Cycle</p>
        <h3>Origination, servicing, asset management.</h3>
        <p>The model targets continuity between the front end of a deal and the life after close.</p>
      </article>
      <article class="c3650-card">
        <p class="c3650-label">Expertise</p>
        <h3>An established industry force.</h3>
        <p>Cross-discipline experience spans CRE debt, equity, repositioning, leasing, and property management.</p>
      </article>
    </div>
  </section>

  <hr class="c3650-divider" />

  <!-- FOOTPRINT -->
  <section class="c3650-section">
    <div class="c3650-split" style="margin-bottom:40px;">
      <div>
        <p class="c3650-kicker">Footprint</p>
        <h2 class="c3650-h2">Real offices. Visible paths into the platform.</h2>
      </div>
      <p style="color:var(--ink-soft);line-height:1.7;">Five offices across the United States bring the platform close to the markets, the properties, and the relationships that matter most.</p>
    </div>
    <div class="c3650-office-grid">
      <div class="c3650-office-card"><strong>Miami</strong><span>2977 McFarlane Road, Suite 300<br>Miami, Florida 33133</span></div>
      <div class="c3650-office-card"><strong>New York</strong><span>410 Park Avenue, Suite 720<br>New York, New York 10022</span></div>
      <div class="c3650-office-card"><strong>Los Angeles</strong><span>9595 Wilshire Boulevard, Suite 611<br>Beverly Hills, CA 90212</span></div>
      <div class="c3650-office-card"><strong>Dallas</strong><span>Freedom Place at Old Parkland<br>4143 Maple Ave, Suite 220<br>Dallas, TX 75219</span></div>
      <div class="c3650-office-card"><strong>Atlanta</strong><span>Two Buckhead Plaza<br>3050 Peachtree Road NW, Suite 320<br>Atlanta, GA 30305</span></div>
    </div>
  </section>

</div>
<!-- /wp:html -->
```

---

#### PAGE 3: SOLUTIONS (slug: `/solutions`)

**Title:** `Solutions`
**Meta description:** `Commercial real estate credit solutions across all loan structures and the property life cycle.`

```html
<!-- wp:html -->
<div class="c3650-container">

  <section class="c3650-hero">
    <p class="c3650-kicker">Products &amp; Services</p>
    <h1 class="c3650-h1" style="margin-bottom:24px;">Short-term capital.<br>Long-term solutions.</h1>
    <p class="c3650-lede">Across all loan structures, across the property life cycle, 3650 offers a diverse range of financing products and services. Every relationship is supported by in-house loan servicing and asset management.</p>
    <div class="c3650-grid-5" style="margin-top:48px;gap:2px;">
      <article class="c3650-card"><p class="c3650-label">01</p><h3>Bridge &amp; Event</h3><p>Strategic short-term structuring for event-driven moments.</p></article>
      <article class="c3650-card"><p class="c3650-label">02</p><h3>Transitional</h3><p>Floating-rate financing for repositioning and stabilization.</p></article>
      <article class="c3650-card"><p class="c3650-label">03</p><h3>Stable Cash Flow</h3><p>Long-term fixed-rate lending with retained servicing.</p></article>
      <article class="c3650-card"><p class="c3650-label">04</p><h3>Loan Servicing</h3><p>Customer-centric servicing, transparency, and continuity.</p></article>
      <article class="c3650-card"><p class="c3650-label">05</p><h3>Special Situations</h3><p>Structured capital for complex and technical situations.</p></article>
    </div>
  </section>

  <hr class="c3650-divider" />

  <section class="c3650-section">
    <p class="c3650-kicker">Full cycle solutions</p>
    <h2 class="c3650-h2" style="margin-bottom:16px;">Across all loan structures, across the property life cycle.</h2>
    <p style="color:var(--ink-soft);max-width:60ch;margin-bottom:40px;">3650 offers capital solutions across stable cash flow and opportunistic business plans, for both debt and equity, across the short and long term.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;">
      <article class="c3650-card"><p class="c3650-label">Bridge &amp; Event Lending</p><h3>Strategic short-term structuring.</h3><p>Direct origination, hands-on diligence, bespoke structuring, efficient servicing, and continuous high-touch attention for event-driven moments.</p></article>
      <article class="c3650-card"><p class="c3650-label">Transitional Lending</p><h3>Value-add focused lending.</h3><p>Bespoke floating-rate financing for borrowers taking out construction financing, pursuing repositionings, or executing plans with a clear path to stabilization.</p></article>
      <article class="c3650-card"><p class="c3650-label">Stable Cash Flow Lending</p><h3>Driving longstanding results.</h3><p>Relationship lending, internal decision-making, retained servicing, incentive alignment, and matched-term financing for stabilized properties.</p></article>
      <article class="c3650-card"><p class="c3650-label">Loan Servicing</p><h3>Responsiveness through every stage.</h3><p>Commercial real estate, distressed asset, and development experience applied to creatively structure loans and support borrowers the way they deserve.</p></article>
      <article class="c3650-card" style="grid-column:span 2;"><p class="c3650-label">Special Situations</p><h3>Creating alpha through structure and asset management.</h3><p>Equity and structured capital solutions for broken capital structures, loan purchases, and value-add business plans on well-positioned CRE projects across North America.</p></article>
    </div>
  </section>

  <hr class="c3650-divider" />

  <section class="c3650-section">
    <div class="c3650-split" style="margin-bottom:48px;">
      <div>
        <p class="c3650-kicker">Operating platform</p>
        <h2 class="c3650-h2">Vertical integration.</h2>
      </div>
      <p style="color:var(--ink-soft);line-height:1.7;">One of 3650 Capital's key differentiators is its vertically integrated operating platform, built to conduct services and material credit decisions internally and streamline borrower communication across the full process.</p>
    </div>
    <div class="c3650-grid-5" style="gap:2px;">
      <article class="c3650-card"><span style="font-size:2rem;font-family:'Newsreader',serif;font-weight:600;color:var(--signal);">01</span><h3>Direct origination</h3><p>Initiated through relationships with intermediaries and borrowers nationwide.</p></article>
      <article class="c3650-card"><span style="font-size:2rem;font-family:'Newsreader',serif;font-weight:600;color:var(--signal);">02</span><h3>Hands-on diligence</h3><p>Focused on understanding the borrower's business plan and providing accretive capital.</p></article>
      <article class="c3650-card"><span style="font-size:2rem;font-family:'Newsreader',serif;font-weight:600;color:var(--signal);">03</span><h3>Bespoke structuring</h3><p>Loan structuring and risk management tailored to borrowers' needs.</p></article>
      <article class="c3650-card"><span style="font-size:2rem;font-family:'Newsreader',serif;font-weight:600;color:var(--signal);">04</span><h3>Service borrower relationships</h3><p>Efficient and responsive servicing at each stage of the process.</p></article>
      <article class="c3650-card"><span style="font-size:2rem;font-family:'Newsreader',serif;font-weight:600;color:var(--signal);">05</span><h3>High-touch attention</h3><p>Vigilant communication and monitoring across bridge, transitional, and stabilized loans.</p></article>
    </div>
  </section>

  <hr class="c3650-divider" />

  <section class="c3650-section">
    <div class="c3650-split">
      <div>
        <p class="c3650-kicker">Real estate credit solutions</p>
        <h2 class="c3650-h2">Flexible structures for sophisticated sponsors.</h2>
        <p style="color:var(--ink-soft);line-height:1.7;">3650 specializes in credit solutions for borrowers pursuing ground-up construction, acquisitions, repositionings, recapitalizations, or restructuring of partnerships. Through its lending strategy, the platform originates senior and mezzanine loans and preferred equity investments.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:2px;">
        <div class="c3650-card"><strong>Bridge &amp; Event</strong><p>Senior secured loans and mezzanine debt/preferred equity, 1 to 5 years, nationwide.</p></div>
        <div class="c3650-card"><strong>Transitional</strong><p>Senior secured loans up to 75% loan to value with 2 to 3 year initial terms and extensions.</p></div>
        <div class="c3650-card"><strong>Stable Cash Flow</strong><p>Commercial and multifamily target programs with 5 and 10 year terms and retained servicing.</p></div>
        <div class="c3650-card"><strong>Special Situations</strong><p>Equity, preferred equity, mezzanine loans, debt, and note purchases with target size of $20 million+.</p></div>
      </div>
    </div>
  </section>

</div>
<!-- /wp:html -->
```

---

#### PAGE 4: TRANSACTIONS (slug: `/transactions`)

**Title:** `Transactions`
**Meta description:** `Named assets and real transactions across construction, hospitality, and institutional property plans.`

```html
<!-- wp:html -->
<div class="c3650-container">

  <section class="c3650-hero">
    <p class="c3650-kicker">Featured transactions</p>
    <h1 class="c3650-h1" style="margin-bottom:24px;">Named assets.<br>Real transaction gravity.</h1>
    <p class="c3650-lede">Public transaction names, real loan amounts, and visible geographies show how 3650 operates across construction, hospitality, and institutional property plans.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:48px;">
      <div class="c3650-card"><strong>Lead case</strong><p>Center at Miami Gardens | $49.3M senior construction loan</p></div>
      <div class="c3650-card"><strong>Geographies</strong><p>Miami Gardens, Dania Beach, Miami, Austin, Tacoma, and Plano.</p></div>
      <div class="c3650-card"><strong>Coverage</strong><p>Construction, hospitality, and mixed-use activity across multiple major markets.</p></div>
    </div>
  </section>

  <hr class="c3650-divider" />

  <section class="c3650-section">
    <p class="c3650-kicker">Transaction record</p>
    <h2 class="c3650-h2" style="margin-bottom:40px;">Selected transactions.</h2>

    <div class="c3650-proof-lead" style="margin-bottom:2px;">
      <div>
        <p class="c3650-label">Lead case</p>
        <h3 style="font-size:1.5rem;margin-bottom:12px;">Center at Miami Gardens</h3>
        <p>A $49.3 million senior construction loan supporting mixed-use development in Miami Gardens, Florida.</p>
        <ul class="c3650-tags"><li>$49.3M</li><li>Senior construction loan</li><li>Miami Gardens, FL</li></ul>
      </div>
      <figure style="margin:0;border-radius:4px;overflow:hidden;">
        <img src="[UPLOADED_URL: rendering-center-at-miami-gardens]" alt="Center at Miami Gardens rendering" />
      </figure>
    </div>

    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:2px;">
      <article class="c3650-card" style="flex-direction:row;gap:24px;padding:0;overflow:hidden;align-items:stretch;">
        <figure style="margin:0;width:180px;flex-shrink:0;"><img src="https://3650capital.com/wp-content/uploads/2020/12/Oasis-Pointe-Rendering-1.jpg" alt="Oasis at Dania Pointe" style="width:100%;height:100%;object-fit:cover;" /></figure>
        <div style="padding:24px;display:flex;flex-direction:column;gap:6px;">
          <p class="c3650-label">Dania Beach, Florida</p>
          <h3>Oasis at Dania Pointe</h3>
          <p>$64.3 million senior construction loan in Dania Beach, Florida.</p>
        </div>
      </article>
      <article class="c3650-card" style="flex-direction:row;gap:24px;padding:0;overflow:hidden;align-items:stretch;">
        <figure style="margin:0;width:180px;flex-shrink:0;"><img src="https://3650capital.com/wp-content/uploads/2021/10/Gateway-at-Wynwood.png" alt="Gateway at Wynwood" style="width:100%;height:100%;object-fit:cover;" /></figure>
        <div style="padding:24px;display:flex;flex-direction:column;gap:6px;">
          <p class="c3650-label">Miami, Florida</p>
          <h3>Gateway at Wynwood</h3>
          <p>$79.0 million senior construction loan in Miami, Florida.</p>
        </div>
      </article>
      <article class="c3650-card" style="flex-direction:row;gap:24px;padding:0;overflow:hidden;align-items:stretch;">
        <figure style="margin:0;width:180px;flex-shrink:0;"><img src="https://3650capital.com/wp-content/uploads/2021/10/48-East.png" alt="48 East Austin" style="width:100%;height:100%;object-fit:cover;" /></figure>
        <div style="padding:24px;display:flex;flex-direction:column;gap:6px;">
          <p class="c3650-label">Austin, Texas</p>
          <h3>48 East</h3>
          <p>$90.9 million senior construction loan in Austin, Texas.</p>
        </div>
      </article>
      <article class="c3650-card" style="flex-direction:row;gap:24px;padding:0;overflow:hidden;align-items:stretch;">
        <figure style="margin:0;width:180px;flex-shrink:0;"><img src="https://3650capital.com/wp-content/uploads/2021/10/Tacoma-Marriott.png" alt="Tacoma Marriott" style="width:100%;height:100%;object-fit:cover;" /></figure>
        <div style="padding:24px;display:flex;flex-direction:column;gap:6px;">
          <p class="c3650-label">Tacoma, Washington</p>
          <h3>Tacoma Marriott</h3>
          <p>$82.0 million senior construction loan in Tacoma, Washington.</p>
        </div>
      </article>
      <article class="c3650-card" style="flex-direction:row;gap:24px;padding:0;overflow:hidden;align-items:stretch;grid-column:span 2;">
        <figure style="margin:0;width:240px;flex-shrink:0;"><img src="https://3650capital.com/wp-content/uploads/2019/06/RENAISSANCE.png" alt="Renaissance Dallas at Plano Legacy West" style="width:100%;height:100%;object-fit:cover;" /></figure>
        <div style="padding:24px;display:flex;flex-direction:column;gap:6px;">
          <p class="c3650-label">Plano, Texas</p>
          <h3>Renaissance Dallas at Plano Legacy West</h3>
          <p>$90.0 million senior loan in Plano, Texas.</p>
        </div>
      </article>
    </div>
  </section>

</div>
<!-- /wp:html -->
```

---

#### PAGE 5: LEADERSHIP (slug: `/leadership`)

**Title:** `Leadership`
**Meta description:** `3650 Capital's leadership team — lifetime professionals with cross-discipline experience in commercial real estate.`

```html
<!-- wp:html -->
<div class="c3650-container">

  <section class="c3650-hero">
    <p class="c3650-kicker">Our leadership team</p>
    <h1 class="c3650-h1" style="margin-bottom:24px;">An established<br>industry force.</h1>
    <p class="c3650-lede">3650 Capital boasts a highly skilled team of lifetime professionals with cross-discipline experience in the CRE industry and major regional markets across the United States.</p>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:20px;">
      <span class="c3650-chip">Toby Cobb</span>
      <span class="c3650-chip">Jonathan Roth</span>
      <span class="c3650-chip">Peter LaPointe</span>
      <span class="c3650-chip">Andrew Parower</span>
      <span class="c3650-chip">Daniel Antonelli</span>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:48px;">
      <div class="c3650-card"><strong>Capabilities</strong><p>CRE debt and equity, development, repositioning, leasing, and property management.</p></div>
      <div class="c3650-card"><strong>Borrower perspective</strong><p>The team understands what borrowers need and what they're looking to gain.</p></div>
      <div class="c3650-card"><strong>Credit outcome</strong><p>Every loan structure is tailored to match the property plan and enhance lasting value.</p></div>
    </div>
  </section>

  <hr class="c3650-divider" />

  <section class="c3650-section">
    <p class="c3650-kicker">Leadership roster</p>
    <h2 class="c3650-h2" style="margin-bottom:40px;">Managing partners and senior leadership.</h2>
    <div class="c3650-grid-4" style="gap:2px;margin-bottom:2px;">

      <article class="c3650-roster-card">
        <div class="c3650-roster-portrait"><img src="https://3650capital.com/wp-content/uploads/2020/08/3650-Headshots-A0746.jpg" alt="Toby Cobb" /></div>
        <div class="c3650-roster-copy">
          <p class="c3650-label">Managing Partner, Co-Founder</p>
          <h3 style="font-size:1.1rem;margin:4px 0;">Toby Cobb</h3>
          <p style="font-size:0.83rem;color:var(--ink-soft);">Co-founder with 30 years in commercial real estate and finance. Previously co-led LNR, built major origination and servicing platforms, and earlier co-headed US commercial real estate at Deutsche Bank.</p>
        </div>
      </article>

      <article class="c3650-roster-card">
        <div class="c3650-roster-portrait"><img src="https://3650capital.com/wp-content/uploads/2020/08/3650-Headshots-A0857.jpg" alt="Jonathan Roth" /></div>
        <div class="c3650-roster-copy">
          <p class="c3650-label">Managing Partner, Co-Founder</p>
          <h3 style="font-size:1.1rem;margin:4px 0;">Jonathan Roth</h3>
          <p style="font-size:0.83rem;color:var(--ink-soft);">Co-founder with 30 years originating, structuring, and servicing CRE investments. Previously led Canyon Partners Real Estate after nine years as a partner at Loeb &amp; Loeb.</p>
        </div>
      </article>

      <article class="c3650-roster-card">
        <div class="c3650-roster-portrait"><img src="https://3650capital.com/wp-content/uploads/2020/08/Peter-3650-A013.jpg" alt="Peter LaPointe" /></div>
        <div class="c3650-roster-copy">
          <p class="c3650-label">Managing Partner, Chief Operating Officer</p>
          <h3 style="font-size:1.1rem;margin:4px 0;">Peter LaPointe</h3>
          <p style="font-size:0.83rem;color:var(--ink-soft);">Chief operating officer with 21 years across CRE origination, servicing, development, and distressed assets. Previously led LNR's financial institution services business.</p>
        </div>
      </article>

      <article class="c3650-roster-card">
        <div class="c3650-roster-portrait"><img src="https://3650capital.com/wp-content/uploads/2023/12/3650-Headshots-Oct-2023-Miami-A0562-scaled.jpg" alt="Andrew Parower" /></div>
        <div class="c3650-roster-copy">
          <p class="c3650-label">Managing Partner, Chief Credit Officer</p>
          <h3 style="font-size:1.1rem;margin:4px 0;">Andrew Parower</h3>
          <p style="font-size:0.83rem;color:var(--ink-soft);">Chief credit officer with 29 years across real estate investment, capital markets, and fund management. Previously launched a $300M CMBS fund at Marketfield.</p>
        </div>
      </article>

    </div>

    <div class="c3650-grid-4" style="gap:2px;">

      <article class="c3650-roster-card">
        <div class="c3650-roster-portrait"><img src="https://3650capital.com/wp-content/uploads/2023/01/3650-Headshots-A0720-min.jpg" alt="Jake Stahler" /></div>
        <div class="c3650-roster-copy">
          <p class="c3650-label">Managing Director, Co Head of Fixed Rate Lending</p>
          <h3 style="font-size:1.1rem;margin:4px 0;">Jake Stahler</h3>
          <p style="font-size:0.83rem;color:var(--ink-soft);">Co-head of fixed rate lending with over 23 years of CRE experience. Responsible for national originations and SCF operations after roles at BNY, Deutsche Bank, and Gramercy Capital.</p>
        </div>
      </article>

      <article class="c3650-roster-card">
        <div class="c3650-roster-portrait"><img src="https://3650capital.com/wp-content/uploads/2020/08/3650-Headshots-A0385.jpg" alt="Malay Bansal" /></div>
        <div class="c3650-roster-copy">
          <p class="c3650-label">Managing Partner, Head of Trading &amp; Capital Markets</p>
          <h3 style="font-size:1.1rem;margin:4px 0;">Malay Bansal</h3>
          <p style="font-size:0.83rem;color:var(--ink-soft);">Head of trading and capital markets with over 30 years spanning CRE, capital markets, and technology. Previously held senior roles at BNY Mellon, Freddie Mac, NewOak, and Merrill Lynch.</p>
        </div>
      </article>

      <article class="c3650-roster-card">
        <div class="c3650-roster-portrait"><img src="https://3650capital.com/wp-content/uploads/2020/08/3650-Headshots-A0088-2.jpg" alt="Ken Dickey" /></div>
        <div class="c3650-roster-copy">
          <p class="c3650-label">Managing Partner, Head of Fixed Rate Lending</p>
          <h3 style="font-size:1.1rem;margin:4px 0;">Ken Dickey</h3>
          <p style="font-size:0.83rem;color:var(--ink-soft);">Head of fixed rate lending with 26 years of CRE lending and relationship management experience. Previously led origination at BNY and Deutsche Bank.</p>
        </div>
      </article>

      <article class="c3650-roster-card">
        <div class="c3650-roster-portrait"><img src="https://3650capital.com/wp-content/uploads/2023/06/Dan-.jpg" alt="Daniel Antonelli" /></div>
        <div class="c3650-roster-copy">
          <p class="c3650-label">Managing Director, Head of Asset Management &amp; Loan Servicing</p>
          <h3 style="font-size:1.1rem;margin:4px 0;">Daniel Antonelli</h3>
          <p style="font-size:0.83rem;color:var(--ink-soft);">Leads asset management and loan servicing with 15 years of CRE experience. Has helped manage more than $17.5 billion across geographies and asset types since joining in 2014.</p>
        </div>
      </article>

    </div>
  </section>

</div>
<!-- /wp:html -->
```

---

#### PAGE 6: CONTACT (slug: `/contact`)

**Title:** `Contact`
**Meta description:** `Contact 3650 Capital — five offices across Miami, New York, Los Angeles, Dallas, and Atlanta.`

```html
<!-- wp:html -->
<div class="c3650-container">

  <section class="c3650-hero">
    <p class="c3650-kicker">Contact</p>
    <h1 class="c3650-h1" style="margin-bottom:24px;">Direct channels.<br>Real offices.</h1>
    <p class="c3650-lede">A serious platform should be easy to reach — whether the need is a first conversation, a live opportunity, or servicing continuity after close.</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:48px;">
      <div class="c3650-card">
        <strong>General inquiries</strong>
        <p><a href="tel:3059011010" style="font-size:1.1rem;font-weight:700;">305-901-1010</a></p>
        <p><a href="mailto:info@3650capital.com" class="c3650-text-link">info@3650capital.com</a></p>
      </div>
      <div class="c3650-card">
        <strong>Loan servicing</strong>
        <p><a href="mailto:servicing@3650capital.com" class="c3650-text-link">servicing@3650capital.com</a></p>
        <p style="font-size:0.83rem;color:var(--ink-soft);">For continuity after the transaction closes.</p>
      </div>
      <div class="c3650-card">
        <strong>Deal inquiries</strong>
        <p><a href="mailto:info@3650capital.com" class="c3650-text-link">info@3650capital.com</a></p>
        <p style="font-size:0.83rem;color:var(--ink-soft);">Initial conversations and live opportunities.</p>
      </div>
    </div>
  </section>

  <hr class="c3650-divider" />

  <section class="c3650-section">
    <div class="c3650-split" style="margin-bottom:40px;">
      <div>
        <p class="c3650-kicker">Directory</p>
        <h2 class="c3650-h2">Visible paths into the platform.</h2>
      </div>
      <p style="color:var(--ink-soft);line-height:1.7;">Direct channels, the servicing email, the main line, and a real office footprint across Miami, New York, Los Angeles, Dallas, and Atlanta.</p>
    </div>
    <div class="c3650-office-grid">
      <div class="c3650-office-card"><strong>Miami</strong><span>2977 McFarlane Road, Suite 300<br>Miami, Florida 33133</span></div>
      <div class="c3650-office-card"><strong>New York</strong><span>410 Park Avenue, Suite 720<br>New York, New York 10022</span></div>
      <div class="c3650-office-card"><strong>Los Angeles</strong><span>9595 Wilshire Boulevard, Suite 611<br>Beverly Hills, CA 90212</span></div>
      <div class="c3650-office-card"><strong>Dallas</strong><span>Freedom Place at Old Parkland<br>4143 Maple Ave, Suite 220<br>Dallas, TX 75219</span></div>
      <div class="c3650-office-card"><strong>Atlanta</strong><span>Two Buckhead Plaza<br>3050 Peachtree Road NW, Suite 320<br>Atlanta, GA 30305</span></div>
    </div>
  </section>

</div>
<!-- /wp:html -->
```

---

#### PAGE 7: PRIVACY POLICY (slug: `/privacy-policy`)

**Title:** `Privacy Policy`
**Meta description:** `Privacy policy for 3650 Capital.`

Read the existing content from `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/privacy.html` and port all body text as `wp:paragraph` blocks, stripping HTML tags and preserving structure.

---

#### PAGE 8: TERMS OF USE (slug: `/terms-of-use`)

**Title:** `Terms of Use`
**Meta description:** `Terms of use for 3650 Capital.`

Read the existing content from `/Users/andrewshea/Desktop/Websites/3650/3650 Capital/terms.html` and port all body text as `wp:paragraph` blocks, stripping HTML tags and preserving structure.

---

### PHASE 5 — NAVIGATION MENUS

Use `wpcom-mcp-site-settings` or `wpcom-mcp-content-authoring` to create two menus:

**Primary Navigation** (in site header):
1. Home → `/`
2. Firm → `/firm`
3. Solutions → `/solutions`
4. Transactions → `/transactions`
5. Leadership → `/leadership`
6. Contact → `/contact`

**Footer Legal Menu:**
1. Privacy Policy → `/privacy-policy`
2. Terms of Use → `/terms-of-use`

---

### PHASE 6 — FULL SITE EDITOR: HEADER AND FOOTER

Using the FSE template editor (or via `wpcom-mcp-site-editor-context`), configure the Blank Canvas theme template parts:

**Header template part:**
- Left: `3650Capital-Logo.png` linked to `/`, height 36px
- Right: Primary navigation menu
- Background: transparent with border-bottom `1px solid rgba(19,19,19,0.14)`
- Sticky positioning

**Footer template part:**
Three-column layout wrapped in `c3650-footer` class:
- Column 1 (wide): `favicon-3650.png` (40px) + tagline text: "Commercial real estate credit platform with direct origination, retained servicing, and asset management continuity."
- Column 2: Site map links (Home, Firm, Solutions, Transactions, Leadership, Contact)
- Column 3: Legal links + address "2977 McFarlane Road, Suite 300, Miami, Florida 33133" + `info@3650capital.com`
- Footer bottom bar: "© 2026 3650 Capital. All rights reserved." | "Commercial real estate credit solutions across the property life cycle."

---

### PHASE 7 — READING SETTINGS + PUBLISH

1. Go to Reading settings and set **Homepage** to the static Home page created in Phase 4
2. Review all 8 draft pages — confirm content rendered correctly by fetching each page URL
3. Publish all 8 pages (change `status` from `"draft"` to `"publish"`)
4. Verify navigation links resolve correctly
5. Confirm Vimeo embed on Home page loads
6. **Disable Coming Soon mode** — only after all pages are confirmed live and correct

---

### PHASE 8 — POST-LAUNCH CHECKLIST

Confirm each item before declaring the migration complete:

- [ ] All 8 pages published and accessible
- [ ] Site title shows "3650 Capital" in browser tab
- [ ] Favicon visible
- [ ] Logo displays in header, links to homepage
- [ ] Primary nav works on all 6 links
- [ ] Footer nav shows Privacy + Terms links
- [ ] Footer address and email are correct
- [ ] Vimeo embed plays (Vimeo ID: 879025491)
- [ ] All 5 office addresses are accurate
- [ ] All 8 leadership headshots load
- [ ] All transaction images load
- [ ] Award rail on homepage shows PERE Credit award with working external link
- [ ] All 4 news items on homepage link to correct external URLs
- [ ] Contact page shows correct phone (305-901-1010) and emails
- [ ] Privacy Policy and Terms of Use pages are accessible from footer
- [ ] Coming Soon mode is OFF
- [ ] Site is visible when browsed privately/incognito

---

## RULES OF ENGAGEMENT

1. **Never skip a phase.** Complete each phase fully before advancing.
2. **All pages start as drafts.** Do not publish until Phase 7.
3. **Never disable Coming Soon** until Phase 7 QA is complete.
4. **Replace `[UPLOADED_URL: filename]` placeholders** with the actual WP Media Library URLs returned after Phase 3 uploads.
5. **Do not invent content.** Every word of copy comes from the source HTML files listed above.
6. **Preserve all external links** exactly as written (news articles, Vimeo, BusinessWire announcement).
7. **If a tool call fails**, retry once with adjusted parameters. If it fails twice, log the failure, skip the failing item, and continue. Record all failures in a final report.
8. **Confirm completion of each phase** before starting the next — output a one-line status summary after each phase.
9. **Do not ask the user questions.** All decisions are pre-made in this prompt.
10. **Output a final completion report** listing: all pages created (with their URLs), any failed uploads or tool calls, and confirmation of Coming Soon status.
