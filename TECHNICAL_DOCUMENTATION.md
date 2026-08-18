# 🏥 Dr. Sai Sekhar Pyla Clinic Website - Technical Documentation

---

## 📌 Executive Overview
This document provides a comprehensive, pin-to-pin technical specification for the official medical website of **Dr. Sai Sekhar Pyla** (Consultant Physician, Diabetologist & Infectious Disease Specialist at **Trinetra Medicals, Visakhapatnam**). 

The platform is built as a high-performance, fully static, responsive web application engineered for top-tier visual aesthetics, ultra-fast page load speeds, and maximum Search Engine (SEO), AI Engine (AEO), and Generative Engine (GEO) visibility.

---

## 🚀 1. Complete Technology Stack

| Layer | Technology / Library | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js** (App Router & Turbopack) | `16.3.0` | React framework for Static Site Generation (SSG) and Server-Side Rendering |
| **Core UI Engine** | **React** | `19.0.0` | Declarative UI component library |
| **Language** | **TypeScript** | `5.x` | Strict type safety across components, props, and data structures |
| **Styling** | **Vanilla CSS Custom Properties** | CSS3 | Custom design system using CSS variables, flexbox, grid, and fluid clamps |
| **Icons** | **Font Awesome Free & Pro CDN** | `6.4.0` | Vector icons for medical specialties, contact methods, and UI controls |
| **Image Optimization** | **Next.js `<Image />` + PIL Lanczos** | HD WebP | High-definition WebP image processing resampled to 1200px width at 95% quality |
| **Sitemap Generation** | **next-sitemap** | `4.2.3` | Automated XML sitemap generation pointing to production domain |
| **Build & Tooling** | **Node.js & npm** | `v20+` | Package management and production compilation pipeline |

---

## 🎨 2. Design System, Typography & Font Specifications

### 🅰️ Font Families
The website uses two curated Google Fonts imported via CSS `@import`:

1. **Heading Font (`Outfit`)**:
   - **CSS Variable**: `var(--font-heading)`
   - **Weights**: `600` (Semi-Bold), `700` (Bold), `800` (Extra Bold)
   - **Application**: Applied to all section titles (`h1`, `h2`, `h3`), navigation links, badges, and card headings.

2. **Body Font (`Inter`)**:
   - **CSS Variable**: `var(--font-body)`
   - **Weights**: `400` (Regular), `500` (Medium), `600` (Semi-Bold), `700` (Bold)
   - **Application**: Applied to paragraph text (`p`), lists (`ul/li`), form fields, subheadings, and footer links.

### 📏 Typography Scale & Fluid Clamps

| Element Tag | CSS Size Specification | Pixel Equivalent | Font Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **Main Page Title (`H1`)** | `clamp(2rem, 3.8vw, 2.8rem)` | `32px` – `44.8px` | `800` | `1.25` |
| **Section Header (`H2`)** | `clamp(1.8rem, 3.5vw, 2.5rem)` | `28.8px` – `40px` | `800` | `1.3` |
| **Card Heading (`H3`)** | `1.2rem` – `1.4rem` | `19.2px` – `22.4px` | `700` | `1.4` |
| **Body Text (`p`)** | `1.05rem` | `16.8px` | `400` / `500` | `1.7` |
| **Card Descriptions** | `0.95rem` | `15.2px` | `400` / `500` | `1.6` |
| **Badges & Chips** | `0.78rem` – `0.92rem` | `12.5px` – `14.7px` | `600` / `700` | `1.2` |

---

## 🎨 3. Color Palette & Design Tokens

```css
:root {
  /* Brand Primary Palette */
  --primary: #0d7a66;          /* Rich Medical Teal */
  --primary-light: #149b82;    /* Vibrant Hover Teal */
  --primary-glow: #e6f4f1;     /* Soft Background Teal Tint */
  --primary-glow-hover: #d2ebe6;

  /* Accent Palette */
  --accent-gold: #f59e0b;      /* Warm Medical Gold for Ratings & Badges */
  --accent-gold-glow: #fef3c7;

  /* Neutral Typography Palette */
  --neutral-dark: #1e293b;     /* High-Contrast Dark Slate Headings */
  --neutral-muted: #475569;    /* Readable Subtext Slate */
  --neutral-light: #f8fafc;    /* Soft Surface Background Tint */
  --neutral-border: rgba(226, 232, 240, 0.9); /* Clean Floating Card Border */

  /* Surface & Base */
  --white: #ffffff;            /* Pure White Card Surface */
  --max-width: 1280px;         /* Max Grid Container Width */
}
```

---

## 📦 4. Floating Card & Layout Standards

Every section across the site utilizes an **independent floating card architecture** rather than heavy outer box wrappers:

- **Card Background**: `var(--white)` (`#ffffff`)
- **Border Radius**: `16px` (`border-radius: 16px`)
- **Card Border**: `1px solid rgba(226, 232, 240, 0.9)`
- **Ambient Shadow (Rest)**: `0 8px 24px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.03)`
- **Hover Elevation Lift**: `transform: translateY(-6px)` to `translateY(-8px)` with `box-shadow: 0 16px 36px rgba(13, 122, 102, 0.14)` and `border-color: var(--primary-light)`
- **List Item Safeguard**: `li:empty, ul:empty { display: none !important; }` (eliminates phantom bullet dots)

---

## 🗂️ 5. Project Directory Structure

```
dr-sai-sekhar-clinic/
├── public/
│   ├── images/
│   │   ├── logo.png, logo-circle.png
│   │   ├── one.webp, two.webp, three.webp, four.webp
│   │   └── services/ (35 HD service banner images)
│   ├── videos/ (5 Patient Education mp4 reels)
│   ├── favicon.ico
│   ├── icon.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/
│   │   ├── page.tsx               # Homepage (Hero, Bio, Stats, Tabs, Reels, Reviews, FAQ, Contact)
│   │   ├── layout.tsx             # Root layout, Navbar, Footer, Global Metadata & JSON-LD
│   │   ├── globals.css            # 4,000+ line CSS Design System & Utility classes
│   │   ├── about-us/page.tsx      # Clinic Overview & Mission Page
│   │   ├── about-doctor/page.tsx  # Detailed Doctor Qualifications & Bio Page
│   │   ├── about-clinic/page.tsx  # Trinetra Medicals Facility & Amenities Page
│   │   ├── services/
│   │   │   ├── page.tsx           # All 42 Clinical Services Directory Page
│   │   │   └── [slug]/page.tsx    # Dynamic Service Detail Route (42 static pages)
│   │   ├── contact/page.tsx       # Contact Page with Form, Map & Regional SEO
│   │   ├── privacy-policy/page.tsx# Privacy & Patient Data Confidentiality Policy
│   │   └── api/
│   │       └── contact/route.ts   # Secure Local Contact Form Submission API Route
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive Header & Mobile Menu Drawer
│   │   ├── Footer.tsx             # Comprehensive Footer with Links & Clinic Timings
│   │   ├── HomeSlider.tsx         # Hero Image & CTA Slideshow Component
│   │   ├── FeaturedServicesTabs.tsx # Interactive Categorized Service Tabs
│   │   ├── AnimatedCounterSection.tsx # Live Counting Clinical Milestones
│   │   ├── AwarenessReels.tsx     # Custom Video Carousel with Auto-slide & Audio Controls
│   │   ├── ReviewsSection.tsx     # Patient Ratings & Testimonials Slider
│   │   ├── FaqSection.tsx         # Interactive Accordion with AEO Direct Answer Signals
│   │   ├── ContactForm.tsx        # Booking & Inquiry Form Component
│   │   ├── RegionalSEOBlock.tsx   # Regional Vizag Neighborhood Coverage Component
│   │   └── ScrollReveal.tsx       # Smooth IntersectionObserver Scroll Reveal Animations
│   ├── data/
│   │   └── serviceDetails.ts      # Structured Clinical Content & Sanitizer for 42 Services
│   └── lib/
│       └── servicesImageMap.ts    # Service Image Resolution & Fallback Mapping Utility
├── TECHNICAL_DOCUMENTATION.md    # Pin-to-pin technical architecture specification
├── next-sitemap.config.js
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## ⚡ 6. Standalone Architecture & Zero External API Dependency

The application is built **100% decoupled and standalone**. It operates with **zero network dependencies** on external CMS or admin backends:

1. **Instant SSG Compilation**: All 53 pages compile statically in under **3 seconds** during `npm run build`.
2. **Local Static Data**: Clinic contact info, 42 clinical service details, doctor qualifications, and FAQs are embedded directly in local TypeScript modules (`serviceDetails.ts`, `servicesImageMap.ts`).
3. **Local Contact Route**: Form submissions in `/api/contact` process locally with strict field sanitization and return instant success confirmation.

---

## 🔍 7. SEO, AEO & GEO Specifications

### 🏷️ Meta Title & Description Audit Standards
- **Title Tag Length**: Strict **30–65 characters** using `{ absolute: "..." }` to prevent Next.js template inflation.
- **Meta Description Length**: Strict **110–165 characters** written in benefit-driven tone.

### 📜 JSON-LD Structured Data Schemas
The application embeds 7 comprehensive Google Schema.org structured data graphs:
1. `Physician`: Doctor credentials, MD degree, 12 years experience, medical specialties.
2. `MedicalClinic`: Clinic address (*Trinetra Medicals, Beside Abhiruchi Sweets, Ramalayam Street, Muralinagar, Visakhapatnam*), geo-coordinates (`17.7458262, 83.1835354`), rating (`4.9/5` from `66` reviews), and consultation timings (`18:00–21:00`).
3. `FAQPage`: Schema mapping all patient queries and answers.
4. `BreadcrumbList`: Schema defining site navigation hierarchy.
5. `WebPage` & `WebSite`: Primary domain indexing graph.
6. `PostalAddress` & `GeoCoordinates`: Exact local map placement data.

### 🤖 AI Engine Optimization (AEO & GEO)
- **Executive Medical Summary Box**: Positioned in hero section listing Lead Physician, Specialization, Primary Clinic, and Timings in a structured grid for AI Search Crawlers (*Google AI Overviews, Perplexity, ChatGPT*).
- **Direct Answer Signals**: Each FAQ answer begins with an explicit 1-sentence direct answer statement.

---

## 🛠️ 8. Command Reference & Deployment

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build optimized static production bundle + XML sitemap
npm run build

# 4. Run production server
npm run start
```

---

*Documentation compiled and verified for Dr. Sai Sekhar Pyla Clinic Web Application.*
