# LEAD Website — Admin Panel User Manual

## 💻 Local Development (Zero Setup)

The project works out of the box locally with a file-based SQLite database — no MongoDB or other external service needed.

```bash
npm install        # once
npm run seed       # once — creates admin user + imports all products/news
npm run dev        # then open http://localhost:3000
```

**Local admin panel:** `http://localhost:3000/admin`

| | |
|---|---|
| **Email** | `admin@leadhyd.com` |
| **Password** | `LeadAdmin2026!` |

> These credentials are created by `npm run seed` for local development. Change them after your first login (Account page). The production site on Vercel creates its own first user on first visit (see below).
>
> The local database is stored in the `payload.db` file in the project folder. Delete that file and run `npm run seed` again to start fresh.

## 🔐 Logging In

1. Open your browser and go to: `https://your-domain.vercel.app/admin`
2. On the **first visit**, you will see a screen to **Create First User**
3. Enter:
   - **Email:** your admin email (e.g., `admin@leadhyd.com`)
   - **Password:** a strong password (minimum 8 characters)
   - **Confirm Password:** same as above
4. Click **Create**
5. You are now the super-administrator

> ⚠️ **Important:** Save these credentials in a secure place. If you lose access, you must reset the database.

---

## 📸 Managing Products

### Add a New Product

1. In the left sidebar, click **"Products"**
2. Click the **"Create New"** button (top right)
3. Fill in the form:

| Field | Required | Description |
|-------|----------|-------------|
| **Name (EN)** | ✅ | Product name in English, e.g., "500T Four Column Hydraulic Press" |
| **Name (CN)** | ❌ | Chinese name (optional) |
| **Slug** | ✅ | The product URL is `/products/<slug>`. Existing products use numbers (`90`, `91`, ...). Using the next free number is the safest choice. |
| **Category** | ✅ | Choose from: H Frame Hydraulic Press / Four Column Hydraulic Press / Single Column Hydraulic Press / Door Panel Embossing Machine |
| **Tonnage** | ❌ | Press capacity in tons, e.g., `500` |
| **Hero Image** | ✅ | The main product photo. Click **"Choose from existing"** or upload a new image. |
| **Gallery** | ❌ | Additional product photos (up to 10 images recommended). |
| **Short Description** | ❌ | 1-2 sentence summary for product cards. |
| **Description** | ❌ | Full product description (rich text editor). |
| **Specifications** | ❌ | Technical parameters table. Click **"Add Row"** to add label-value pairs. |
| **Applications** | ❌ | What this machine is used for, e.g., "metal stamping, deep drawing" |
| **SEO Title** | ❌ | Page title for Google search results. |
| **SEO Description** | ❌ | Meta description for search engines. |
| **SEO Keywords** | ❌ | Comma-separated keywords. |
| **Status** | ✅ | `Published` (visible on website) or `Draft` (hidden). |
| **Featured** | ❌ | Check to show on homepage "Featured Products" section. |

4. Click **"Save"** (top right)
5. The product will appear on the website within seconds (no need to redeploy)

### Edit an Existing Product

1. Go to **Products** in the sidebar
2. Find the product in the list (use search bar if needed)
3. Click the product name to open the editor
4. Make changes
5. Click **"Save"**

### Delete a Product

1. Open the product editor
2. Click the **"Actions"** dropdown (top right, next to Save)
3. Select **"Delete"**
4. Confirm the deletion

---

## 📰 Managing News / Articles

### Publish a News Article

1. In the left sidebar, click **"News"**
2. Click **"Create New"**
3. Fill in the form:

| Field | Required | Description |
|-------|----------|-------------|
| **Title** | ✅ | Article headline, e.g., "LEAD Exhibits at METALEX 2026" |
| **Slug** | ✅ | URL identifier, e.g., `metalex-2026-exhibition` |
| **Category** | ✅ | Company News / Industry News / Exhibition / Product Launch |
| **Excerpt** | ❌ | Short summary (2-3 sentences) for the news list page. |
| **Content** | ✅ | Full article body (rich text editor). Use the toolbar to add headings, lists, links, and images. |
| **Cover Image** | ❌ | Featured image for the article card. |
| **Published At** | ❌ | Date and time. Leave blank to use current time. |
| **Author** | ❌ | Author name, e.g., "LEAD Marketing Team" |
| **Status** | ✅ | `Published` or `Draft` |
| **Featured** | ❌ | Check to show on homepage or top of news list. |
| **SEO Title** | ❌ | Custom title tag for this article. |
| **SEO Description** | ❌ | Meta description for search engines. |

4. Click **"Save"**
5. The article appears on `/news` immediately

### Edit or Delete News

Same process as Products: click the item in the list → edit → save (or use Actions → Delete).

---

## 🖼️ Managing Images (Media Library)

1. Click **"Media"** in the left sidebar
2. This shows all uploaded images
3. To upload new images:
   - Click **"Create New"**
   - Drag and drop files or click to browse
   - Add **Alt Text** for each image (required for accessibility and SEO)
   - Click **"Save"**
4. Images uploaded here can be reused across Products and News articles

---

## 📨 Viewing Form Inquiries

Every submission from the website's **Contact / Request a Quote** form is stored in the CMS.

1. Click **"Inquiries"** in the left sidebar
2. The list shows: name, email, country, product interest, and submission date
3. Click any row to read the full message
4. Reply to the customer directly from your own email program (e.g., reply to `sales@leadhyd.com` mail)
5. Inquiries are read-only records; only admins can delete them

> 💡 Tip: check Inquiries at least once a day — the site does not send email notifications yet.

---

## 📞 Updating Phone / WhatsApp / Address

The phone number, WhatsApp and address shown on the website (header, footer, contact page) are stored in the `company_info.json` file in the project folder:

```json
"contact": {
  "email": "sales@leadhyd.com",
  "phone": "+86-XXX-XXXX-XXXX",
  "whatsapp": "+86-XXX-XXXX-XXXX",
  "address": "No. 998 Zhenxing North Road, Tengzhou, Zaozhuang, Shandong Province, China"
}
```

Ask your developer to update this file (a 2-minute change), then redeploy. The placeholder `+86-XXX-XXXX-XXXX` is intentional until your real number is added.

---

## 👤 Managing Users (Admin Accounts)

### Create an Editor Account

1. Click **"Users"** in the sidebar
2. Click **"Create New"**
3. Fill in:
   - **Email:** editor's email
   - **Password:** temporary password (share securely)
   - **Name:** editor's name
   - **Role:** `editor` (can add/edit content but cannot manage other users)
4. Click **"Save"**

### Change Your Password

1. Click your **avatar / email** in the top-right corner of the admin panel
2. Select **"Account"**
3. Enter your current password and new password
4. Click **"Save"**

---

## 📝 Rich Text Editor Tips

The **Description** and **Content** fields use a powerful rich text editor. Here's how to use it:

| Action | How To |
|--------|--------|
| **Bold** | Select text → Click **B** or press `Ctrl+B` |
| **Heading** | Select text → Click the paragraph style dropdown → Choose H1/H2/H3 |
| **List** | Click the bullet list or numbered list icon |
| **Link** | Select text → Click **🔗** → Enter URL |
| **Image** | Click **📷** → Choose from Media Library or upload new |
| **Quote** | Select text → Click the quotation mark icon |
| **Undo** | Press `Ctrl+Z` |

---

## 🔍 SEO Checklist for Every Product / News Article

Before saving, verify:

- [ ] **Slug** is short, descriptive, and uses hyphens (no spaces)
- [ ] **SEO Title** is 50-60 characters and includes a keyword
- [ ] **SEO Description** is 150-160 characters and summarizes the content
- [ ] **Hero Image** has descriptive **Alt Text**
- [ ] **Status** is set to `Published` (not `Draft`)

---

## 🆘 Troubleshooting

### Can't log in?
- Make sure you're visiting `/admin` (not `/login` or `/dashboard`)
- Check Caps Lock
- If you forgot your password, there is no "Forgot Password" by default. Contact your developer or reset the database.

### Images not showing on the website?
- Check that the product/article status is `Published`
- Check that the image **Alt Text** is filled in the Media library
- Refresh the page after 30 seconds (CDN caching)

### Product not appearing on the homepage?
- The homepage "Featured Equipment" section automatically shows a curated mix of top models from each category
- Mark products as **Featured = true** if you want them prioritized in future layouts

### Changes not showing on the website?
- Static pages (home, about, contact) update instantly
- If you see old content, press `Ctrl+Shift+R` to hard-refresh the browser
- Vercel CDN caches pages for a few seconds; wait 10-20 seconds

---

## 📊 Quick Reference: Admin URL

| Page | URL |
|------|-----|
| Admin Login | `https://your-domain.vercel.app/admin` |
| Products List | `https://your-domain.vercel.app/admin/collections/products` |
| News List | `https://your-domain.vercel.app/admin/collections/news` |
| Media Library | `https://your-domain.vercel.app/admin/collections/media` |
| Inquiries | `https://your-domain.vercel.app/admin/collections/inquiries` |
| Users | `https://your-domain.vercel.app/admin/collections/users` |

---

**Last updated:** 2026-07-17  
**For technical support:** Refer to `DEPLOY_GUIDE.md` or contact your developer.
