# LEAD Hydraulic Press Machinery — Corporate Website

> **Project status (July 2026):** The site is feature-complete and production-ready. 89 products in 4 categories (H Frame 12 · Four Column 51 · Single Column 15 · Door Embossing 11), 5 news articles, working inquiry form, full SEO (sitemap, robots, JSON-LD), and a Payload CMS admin panel for all content. Local preview runs with one command (`npm run dev`) using a zero-setup SQLite database; production deploys to Vercel + MongoDB Atlas (see `DEPLOY_GUIDE.md`).

**Modern, professional, and fully deployable corporate website for overseas markets.**

## 🌐 Live Website

- **Homepage** — Full-screen hero, animated stats, four product families, featured equipment, factory strength, applications, global presence, certifications, FAQ, CTA
- **About Us** — Company profile, key-fact counters, factory & equipment gallery, certifications, customer visits & exhibitions, global markets, packaging & shipment
- **Products** — 89 hydraulic press models in 4 categories with sticky filter bar
- **Product Detail** — Image gallery with lightbox, engineering datasheet specs, quote CTA, related models, Product JSON-LD
- **News** — Editorial newsroom with featured story, article detail with prev/next navigation
- **Contact** — Split layout with info cards, response-time promise, and an inquiry form that stores submissions in the CMS (Inquiries collection)
- **Admin Panel** — Password-protected backend for managing products, news, media, and inquiries
- **SEO** — Metadata templates, OpenGraph/Twitter cards, sitemap.xml, robots.txt, Organization/Product/Breadcrumb JSON-LD

## 🛠️ Technology Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15.3.9 (App Router) |
| CMS / Backend | Payload CMS 3.85.1 |
| Database | MongoDB Atlas (Free Tier) |
| Styling | Tailwind CSS 3.4.17 |
| Language | TypeScript |
| Deployment | Vercel |

## 📦 Content Included

- **74 Products** with real product photos (compressed WebP, ~36MB total)
- **3 Categories:** H Frame Hydraulic Press, Four Column Hydraulic Press, Door Panel Embossing Machine
- **12 FAQ Entries** with bilingual Q&A
- **5 Sample News Articles**
- **Company Profile** with market and service information

## 🚀 How to Deploy

See **`DEPLOY_GUIDE.md`** for step-by-step instructions.

## 📝 How to Manage Content

See **`ADMIN_MANUAL.md`** for the backend user guide.

## 📂 Key Files

```
├── app/(website)/          # Public pages (Home, About, Products, News, Contact)
├── app/(payload)/           # Admin panel & API routes
├── collections/             # Payload CMS data models
├── public/images/products/  # 74 product photo sets
├── payload.config.ts        # CMS configuration
├── DEPLOY_GUIDE.md          # Deployment instructions
└── ADMIN_MANUAL.md          # Content management guide
```

## 💰 Operating Cost

**Approximately $10–15 USD per year** (domain name only).  
Vercel hosting and MongoDB Atlas are free tier.

---

© 2026 LEAD Hydraulic Press Machinery. All rights reserved.
