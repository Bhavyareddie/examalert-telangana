# How to Deploy a Full Stack Project (Next.js + Node.js)
# Written for: ExamAlert Telangana Project
# Use this file whenever you build a new project

---

## What is a Full Stack Project?

A full stack project has 3 parts:
1. **Frontend** - The website users see (built with Next.js)
2. **Backend** - The server that handles data and logic (built with Node.js + Express)
3. **Database** - Where all data is stored (we use Supabase/PostgreSQL)

---

## Accounts You Need (All Free)

| Account | Website | Why You Need It |
|---------|---------|-----------------|
| GitHub | github.com | Stores your code online |
| Supabase | supabase.com | Your database + user login system |
| Render | render.com | Hosts your backend/API server |
| Vercel | vercel.com | Hosts your frontend/website |
| Google Makersuite | makersuite.google.com | If your app uses Google Gemini AI |

---

## STEP 1: Push Your Code to GitHub

GitHub is like a cloud storage for your code. Render and Vercel will pull your code from here.

### First time setup:
1. Go to github.com → Sign up → Create new repository
2. Name it same as your project (e.g. `examalert-telangana`)
3. Keep it Public → Click "Create repository"
4. Open terminal (CMD) and run:

```
cd C:\path\to\your\project
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Every time you make changes:
```
git add .
git commit -m "describe what you changed"
git push
```

### If you see "nothing to commit":
Your code is already on GitHub. That's fine, move to next step.

### If you see "remote origin already exists":
Your GitHub is already connected. Just run `git push`.

---

## STEP 2: Setup Supabase (Database)

Supabase gives you a free PostgreSQL database + user authentication.

1. Go to supabase.com → Sign up with GitHub
2. Click **New Project**
   - Give it a name (e.g. `examalert`)
   - Set a strong database password (save it somewhere)
   - Choose region: closest to India = `Southeast Asia (Singapore)`
   - Click **Create new project** → wait 2 mins
3. Go to **SQL Editor** (left sidebar)
   - Open your project's `backend/migrations/` folder
   - Copy content of `001_init.sql` → paste in SQL Editor → click **Run**
   - Repeat for all migration files in order (001, 002, 003... till last)
4. Go to **Project Settings** → **API** (left sidebar)
   - Copy and save these 3 things:
     - `Project URL` (looks like: https://xxxx.supabase.co)
     - `anon public` key (long text starting with eyJ...)
     - `service_role` key (long text starting with eyJ... — KEEP THIS SECRET)

### What these keys do:
- `Project URL` → address of your database
- `anon key` → safe to use in frontend (public)
- `service_role key` → gives full database access → NEVER share or put in GitHub

---

## STEP 3: Get Gemini AI Key (only if your app uses AI)

1. Go to makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click **Create API Key**
4. Copy and save it (you only see it once)
5. Free tier gives 60 requests/minute — enough for small apps

---

## STEP 4: Deploy Backend to Render

Render hosts your Node.js/Express backend server for free.

1. Go to render.com → Sign up with GitHub
2. Click **New** → **Web Service**
3. Click **Connect GitHub** → select your repository
4. Fill in these settings:
   - **Name**: anything (e.g. `examalert-api`)
   - **Root Directory**: `backend` (the folder where your backend code is)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/index.js`
5. Scroll down to **Environment Variables** → click **Add Environment Variable**
   - Add each variable one by one:

```
NODE_ENV        = production
PORT            = 10000
SUPABASE_URL    = (paste your Supabase Project URL)
SUPABASE_SERVICE_KEY = (paste your service_role key)
GEMINI_API_KEY  = (paste your Gemini key)
JWT_SECRET      = (any random long text, e.g. myapp2024secretkey123456789)
FRONTEND_URL    = https://your-app-name.vercel.app
```

6. Click **Deploy Web Service**
7. Wait 3-5 minutes → you will see **"Your service is live 🎉"**
8. Copy your Render URL (looks like: `https://examalert-api.onrender.com`)
   - This is your backend API URL — you will need it for frontend

### Common Render Errors:
- `Cannot find module` → your Build Command is wrong, make sure it's `npm install`
- `Build failed` → check if Start Command matches your main file path

---

## STEP 5: Deploy Frontend to Vercel

Vercel hosts your Next.js frontend for free.

1. Go to vercel.com → Sign up with GitHub
2. Click **New Project** → **Import Git Repository**
3. Select your GitHub repository
4. Fill in these settings:
   - **Root Directory**: `frontend` (the folder where your frontend code is)
   - **Framework Preset**: Next.js (auto detected)
   - **Build Command**: `npm run build` (leave as default)
   - **Install Command**: `npm install --legacy-peer-deps` (add this if you get peer dependency errors)
5. Scroll down to **Environment Variables** → add each one:

```
NEXT_PUBLIC_SUPABASE_URL      = (paste your Supabase Project URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY = (paste your anon public key)
NEXT_PUBLIC_API_URL           = (paste your Render URL from Step 4)
NEXT_PUBLIC_APP_URL           = https://your-app-name.vercel.app
```

6. Click **Deploy**
7. Wait 2-3 minutes → you will see **"Ready"**
8. Your website is now LIVE at `https://your-app-name.vercel.app` 🎉

### Common Vercel Errors:
- `references Secret which does not exist` → your vercel.json has `@secret` references, remove the `env` section from vercel.json
- `peer dependency conflict` → change Install Command to `npm install --legacy-peer-deps`
- `Type error` → TypeScript error in your code, fix the error and push again
- Build is **Queued** → normal on free tier, just wait

---

## STEP 6: Connect Everything Together

After both are deployed, update these values:

### In Render dashboard → Environment Variables:
- Change `FRONTEND_URL` to your actual Vercel URL

### In Vercel dashboard → Environment Variables:
- Make sure `NEXT_PUBLIC_API_URL` is your actual Render URL

### In Supabase → Authentication → URL Configuration:
- Site URL: `https://your-app.vercel.app`
- Redirect URLs: `https://your-app.vercel.app/auth/callback`

---

## Environment Variables — Important Rules

- **Never** put secret keys directly in your code
- **Never** commit `.env` files to GitHub (add `.env` to `.gitignore`)
- **Always** add secrets through Render/Vercel dashboards only
- Variables starting with `NEXT_PUBLIC_` are visible to browser (safe for public keys only)
- Variables without `NEXT_PUBLIC_` are server-only (safe for secret keys)

---

## How to Update Your Live App

Whenever you make changes to your code:

```
git add .
git commit -m "what you changed"
git push
```

- Vercel will **automatically redeploy** your frontend
- Render will **automatically redeploy** your backend

---

## Cost Summary (Monthly)

| Service | Free Limit | Cost |
|---------|-----------|------|
| GitHub | Unlimited public repos | ₹0 |
| Vercel | 100GB bandwidth | ₹0 |
| Render | 750 hrs/month | ₹0 |
| Supabase | 500MB DB, 50,000 users | ₹0 |
| Gemini API | 60 requests/minute | ₹0 |
| **Total** | | **₹0/month** |

---

## Quick Reference — What Each Service Does

```
User visits website
       ↓
   Vercel (Frontend - Next.js)
       ↓ calls API
   Render (Backend - Node.js)
       ↓ reads/writes data
   Supabase (Database - PostgreSQL)
```

---

## Files to Never Touch After Deployment

- `backend/.env` → local only, never push to GitHub
- `frontend/.env.local` → local only, never push to GitHub
- `.gitignore` → makes sure .env files are ignored by Git

---

## If Something Breaks

1. Check Render logs → Render dashboard → your service → **Logs** tab
2. Check Vercel logs → Vercel dashboard → your project → **Deployments** → click deployment → **Build Logs**
3. Check Supabase → supabase.com → your project → **Logs** tab
4. Google the exact error message

---

*This guide was written based on deploying ExamAlert Telangana project.*
*Stack: Next.js + TypeScript (frontend), Node.js + Express (backend), Supabase (database)*
