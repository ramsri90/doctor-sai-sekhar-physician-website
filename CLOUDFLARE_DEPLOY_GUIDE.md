# Deploying to Cloudflare Pages Guide

This guide details how to deploy **Trinetra Medicals (Dr. Sai Sekhar Physician Website)** to **Cloudflare Pages**.

---

## Method 1: Automatic Deployment via Cloudflare Dashboard (Recommended)

Since your code is already pushed to GitHub (`ramsri90/doctor-sai-sekhar-physician-website`), Cloudflare Pages can automatically build and deploy your site whenever you push new changes to `main`.

### Steps:
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** in the left sidebar and click **Create application**.
3. Select the **Pages** tab and click **Connect to Git**.
4. Authorize Cloudflare to connect to your GitHub account and select your repository:
   * **Repository:** `ramsri90/doctor-sai-sekhar-physician-website`
   * **Branch:** `main`
5. Configure the **Build Settings**:
   * **Framework Preset:** `Next.js (Static)` or `Next.js`
   * **Build command:** `npm run build`
   * **Build output directory:** `out` (or `.next`)
6. Click **Save and Deploy**.
7. Cloudflare will clone your repository, run the build, and assign a live production URL (e.g. `doctor-sai-sekhar-physician-website.pages.dev`).

---

## Method 2: Deploying via Wrangler CLI (Command Line)

If you prefer to deploy directly from your local terminal using the Cloudflare Wrangler CLI:

### Step 1: Install Cloudflare Wrangler
```bash
npm install -g wrangler
```

### Step 2: Login to Cloudflare via Terminal
```bash
npx wrangler login
```

### Step 3: Add Static Export to Next.js Config
To export standard static HTML/CSS/JS for Cloudflare Pages, update `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  output: 'export',
  // ... rest of configuration
};
```

### Step 4: Build the Application
```bash
npm run build
```
This generates an `out/` folder containing static HTML and assets.

### Step 5: Deploy to Cloudflare Pages
```bash
npx wrangler pages deploy out --project-name=dr-sai-sekhar-clinic
```

---

## Setting Up Your Custom Domain on Cloudflare Pages

1. In the Cloudflare Pages Dashboard, select your deployed project (`dr-sai-sekhar-clinic`).
2. Go to **Custom Domains** -> click **Set up a custom domain**.
3. Enter your domain name: `www.drsaisekharphysician.com` (or `drsaisekharphysician.com`).
4. Follow the automatic DNS CNAME record routing provided by Cloudflare.
5. Cloudflare will automatically issue a free SSL/TLS certificate.
