# LEAD Hydraulic Press Machinery — Corporate Website

**Modern, professional, and fully deployable corporate website for overseas markets.**

## 🌐 Live Website

- **Homepage** — Hero, product categories, featured products, company advantages, FAQ, CTA
- **About Us** — Company profile, key facts, global markets, services, full FAQ
- **Products** — 74 hydraulic press models with filtering by category
- **Product Detail** — Full specifications, image gallery, related products, inquiry buttons
- **News** — Company announcements, exhibitions, product launches
- **Contact** — Contact form, email/phone/WhatsApp, quick response promise
- **Admin Panel** — Password-protected backend for managing products, news, and media

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
