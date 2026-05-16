# Deployment Guide — ExamAlert Telangana

## Architecture Overview

```
User → Cloudflare CDN → Vercel (Next.js Frontend)
                      → Render (Express Backend API)
                              → Supabase (PostgreSQL + Auth + Storage)
                              → Google Gemini API (AI Chat)
```

---

## Step 1: Supabase Setup (Database + Auth + Storage)

1. Go to https://supabase.com → New Project
2. Note your: `Project URL`, `anon key`, `service_role key`
3. Go to SQL Editor → paste contents of `backend/migrations/001_init.sql` → Run
4. Go to Authentication → Providers → Enable Google OAuth
   - Add Google Client ID & Secret from Google Cloud Console
5. Go to Storage → Create bucket named `exam-pdfs` (public)
6. Go to Authentication → URL Configuration:
   - Site URL: `https://your-frontend.vercel.app`
   - Redirect URLs: `https://your-frontend.vercel.app/auth/callback`

---

## Step 2: Deploy Backend to Render

1. Push code to GitHub
2. Go to https://render.com → New Web Service
3. Connect your GitHub repo → select `backend` folder
4. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
5. Add Environment Variables (from Render dashboard):
```
NODE_ENV=production
PORT=10000
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_key
JWT_SECRET=your_random_secret_32chars
FRONTEND_URL=https://your-app.vercel.app
```
6. Deploy → copy your Render URL (e.g. `https://examalert-api.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com → New Project → Import GitHub repo
2. Set Root Directory to `frontend`
3. Add Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=https://examalert-api.onrender.com
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```
4. Deploy → get your Vercel URL

---

## Step 4: Cloudflare CDN (Optional but Recommended)

1. Go to https://cloudflare.com → Add Site → enter your domain
2. Update nameservers at your domain registrar
3. Add CNAME records:
   - `www` → `cname.vercel-dns.com`
   - `api` → `examalert-api.onrender.com`
4. Enable: Auto HTTPS, Brotli compression, Caching

---

## Step 5: Google OAuth Setup

1. Go to https://console.cloud.google.com
2. Create Project → APIs & Services → Credentials
3. Create OAuth 2.0 Client ID (Web application)
4. Authorized redirect URIs:
   - `https://xxxx.supabase.co/auth/v1/callback`
5. Copy Client ID & Secret → paste in Supabase Auth settings

---

## Step 6: Gemini AI Setup

1. Go to https://makersuite.google.com/app/apikey
2. Create API Key (free tier: 60 req/min)
3. Add to Render environment variables as `GEMINI_API_KEY`

---

## Custom Domain (Free with Cloudflare)

1. Buy domain (~₹500/year at GoDaddy or Namecheap)
2. Point to Cloudflare nameservers
3. In Vercel: Settings → Domains → Add `examalert.in`
4. In Cloudflare: Add CNAME `@` → `cname.vercel-dns.com`

---

## SEO Checklist

- [ ] Submit sitemap to Google Search Console: `https://yourdomain.com/sitemap.xml`
- [ ] Add Google Analytics (free)
- [ ] Verify site in Google Search Console
- [ ] Submit to Bing Webmaster Tools
- [ ] Create Google Business Profile

---

## Monitoring (Free)

- **Uptime**: UptimeRobot (free) → monitors your Render API
- **Errors**: Vercel Analytics (built-in)
- **DB**: Supabase Dashboard

---

## Cost Summary (Monthly)

| Service | Free Tier Limit | Cost |
|---------|----------------|------|
| Vercel | 100GB bandwidth | ₹0 |
| Render | 750 hrs/month | ₹0 |
| Supabase | 500MB DB, 1GB storage | ₹0 |
| Cloudflare | Unlimited CDN | ₹0 |
| Gemini API | 60 req/min | ₹0 |
| **Total** | | **₹0/month** |
