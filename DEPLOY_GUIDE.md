# LEAD Hydraulic Press — Website Deployment Guide

## 📋 Overview

This is a **Next.js 15 + Payload CMS 3** full-stack website for LEAD Hydraulic Press Machinery.

**Target markets:** South America, Russia, Middle East, Africa, Belt & Road countries.  
**Language:** English (multi-language ready).  
**Style:** Modern, professional, minimalist.

---

## 🚀 Quick Deploy to Vercel (Recommended)

### Step 1: Create Accounts (Free)

1. **GitHub** — https://github.com/signup (if you don't have one)
2. **Vercel** — https://vercel.com/signup (use "Continue with GitHub")
3. **MongoDB Atlas** — https://www.mongodb.com/atlas (use Google/GitHub login)

### Step 2: Create MongoDB Atlas Database

1. Log in to MongoDB Atlas
2. Click **"New Project"** → Name it `lead-website`
3. Click **"Build a Database"** → Choose **M0 (Free)** tier
4. Choose **AWS** as cloud provider, region closest to your target market (e.g., `us-east-1` for global, `me-south-1` for Middle East)
5. Click **"Create Cluster"**
6. In **Database Access** → Add Database User:
   - Username: `lead-admin`
   - Password: Generate a strong password, save it safely
   - Role: **Read and write to any database**
7. In **Network Access** → Add IP Address:
   - Click **"Allow Access from Anywhere"** (or add `0.0.0.0/0`)
8. Go back to **Database** → Click **"Connect"** → **"Drivers"** → Select **Node.js**
9. Copy the connection string:
   ```
   mongodb+srv://lead-admin:<password>@cluster0.xxxxx.mongodb.net/lead-website?retryWrites=true&w=majority
   ```
   Replace `<password>` with your actual password.

### Step 3: Prepare Environment Variables

Create a file named `.env.local` in the project root with:

```env
# MongoDB Connection (from Step 2)
MONGODB_URI=mongodb+srv://lead-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/lead-website?retryWrites=true&w=majority

# Payload Secret (generate a random string, 32+ characters)
PAYLOAD_SECRET=your-very-long-random-secret-key-here-at-least-32-characters

# Next.js public URL (set after Vercel deployment, or leave blank for auto)
NEXT_PUBLIC_SERVER_URL=https://your-domain.vercel.app
```

**How to generate PAYLOAD_SECRET:**
- Open https://www.random.org/strings/
- Generate a 32-character alphanumeric string

### Step 4: Push Code to GitHub

1. Create a new repository on GitHub (e.g., `lead-website`)
2. Open terminal in the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/lead-website.git
   git push -u origin main
   ```

### Step 5: Deploy to Vercel

1. Log in to Vercel → Click **"Add New Project"**
2. Import your GitHub repository `lead-website`
3. In **Environment Variables**, add:
   - `MONGODB_URI` → your MongoDB connection string
   - `PAYLOAD_SECRET` → your generated secret
   - `NEXT_PUBLIC_SERVER_URL` → leave blank for now (update after first deploy)
4. Click **"Deploy"**
5. Wait 3-5 minutes for build to complete

### Step 6: Configure Domain (Optional)

1. Buy a domain (e.g., from GoDaddy, Namecheap, or Alibaba Cloud)
2. In Vercel → Project Settings → **Domains**
3. Add your domain (e.g., `www.leadpress.com`)
4. Follow Vercel's DNS instructions to configure your domain registrar
5. Update `NEXT_PUBLIC_SERVER_URL` in Vercel environment variables to your actual domain

---

## 🛠️ Admin Panel Access

After deployment, your admin panel is at:

```
https://your-domain.vercel.app/admin
```

**First login:**
- On first visit, Payload CMS will ask you to create an **Admin User**
- Enter your email and password
- This account becomes the super-admin

**To create a new editor account:**
1. Log in as admin
2. Go to **Users** collection → Click **Create New**
3. Enter email, password, and set role to `editor`
4. Save

---

## 📁 Project Structure

```
lead-website/
├── app/
│   ├── (payload)/          # Payload CMS admin panel (auto-generated)
│   │   ├── admin/[[...segments]]/page.tsx
│   │   └── api/[...slug]/route.ts
│   ├── (website)/          # Public-facing website
│   │   ├── page.tsx          # Home
│   │   ├── about/page.tsx
│   │   ├── products/page.tsx
│   │   ├── products/[slug]/page.tsx   # Product detail
│   │   ├── news/page.tsx
│   │   ├── news/[slug]/page.tsx       # News detail
│   │   └── contact/page.tsx
│   └── globals.css
├── collections/             # Payload CMS data models
│   ├── Products.ts
│   ├── News.ts
│   ├── Media.ts
│   └── Users.ts
├── public/images/products/  # 74 product photos (compressed WebP)
├── payload.config.ts        # Payload CMS configuration
├── next.config.js           # Next.js configuration
├── products.json            # Static product data (74 items)
├── faq.json                 # FAQ data (12 Q&As)
└── company_info.json        # Company information
```

---

## 📝 Updating Content (No Coding Required)

### Option A: Admin Panel (Recommended)

1. Visit `https://your-domain.vercel.app/admin`
2. Log in with your admin credentials
3. Navigate to:
   - **Products** → Add / Edit / Delete products
   - **News** → Publish / Edit news articles
   - **Media** → Upload product images

### Option B: Edit Static JSON (Advanced)

If you need to bulk-update product data before the admin panel is fully configured:
1. Edit `products.json` directly
2. Re-deploy to Vercel (git push triggers auto-rebuild)

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|--------|------|-------|
| **Vercel** | Free | 100GB bandwidth, 6000 build minutes/month |
| **MongoDB Atlas** | Free | 512MB storage, 1M reads/month |
| **Domain** | ~$10-15/year | `.com` via GoDaddy/Namecheap |
| **GitHub** | Free | Unlimited public repos |
| **Total** | **~$10-15/year** | |

---

## ⚠️ Important Notes

1. **MongoDB Atlas M0 (Free)** has a 512MB limit. Product images are stored in `public/` (static files), not in MongoDB, so the database only stores text/metadata. 512MB is sufficient for thousands of products.

2. **Image uploads via Admin** will save to the local filesystem by default. On Vercel, this is ephemeral (resets on redeploy). For permanent image storage in the admin panel, configure **Vercel Blob** or **Cloudinary** (see Advanced section below).

3. **Email form** on the Contact page currently uses `mailto:` links. To enable true form submission, connect to a service like Resend, SendGrid, or Formspree (requires API key).

4. **Search Engine Optimization (SEO)** is pre-configured with meta tags, Open Graph, and structured data. Submit your sitemap to Google Search Console after deployment.

---

## 🔧 Advanced: Vercel Blob for Image Storage

If you want uploaded admin images to persist across deployments:

1. In Vercel Dashboard → **Storage** → **Create Blob Store**
2. Copy the `BLOB_READ_WRITE_TOKEN`
3. Add it to your Vercel Environment Variables
4. Install the adapter: `npm install @payloadcms/storage-vercel-blob`
5. Update `payload.config.ts` to use the Vercel Blob storage adapter (see Payload docs)

---

## 📞 Support

If you encounter issues during deployment:

1. Check Vercel **Build Logs** in the project dashboard
2. Verify MongoDB connection string is correct (whitelist `0.0.0.0/0`)
3. Ensure `PAYLOAD_SECRET` is at least 32 characters
4. For Payload CMS specific issues: https://payloadcms.com/docs
5. For Next.js issues: https://nextjs.org/docs

---

**Project generated:** 2026-06-13  
**Stack:** Next.js 15.3.9 + Payload CMS 3.85.1 + Tailwind CSS 3.4.17 + MongoDB Atlas  
**Frontend pages:** 87 (Home, About, 74 Products, 5 News, Contact, Admin, API)
