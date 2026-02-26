# Project WOW: Deployment Checklist

## 1. Supabase Preparation
- [ ] Run the SQL migration (`supabase/migrations/00001_project_wow_init.sql`) in the Supabase SQL Editor
- [ ] Run the seed script: `npm run seed`
- [ ] Verify data: check the `exercises` table has 55+ rows and `workouts` table has 10 rows
- [ ] Copy your **Project URL** from Supabase Settings > API
- [ ] Copy your **anon/public key** from Supabase Settings > API

## 2. GitHub Repository
- [ ] Ensure `.env` is in `.gitignore` (it is by default)
- [ ] Commit and push all files to your GitHub repository

## 3. Vercel Configuration
- [ ] Go to [vercel.com](https://vercel.com) and import your GitHub repository
- [ ] Vercel should auto-detect the Vite framework
- [ ] Verify build settings:
  - **Build Command:** `npm run build`
  - **Output Directory:** `dist`
  - **Install Command:** `npm install`

## 4. Environment Variables
Set these in Vercel's project settings under **Settings > Environment Variables**:

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | `https://abcdefg.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public API key | `eyJhbGciOiJIUzI1NiIs...` |

**Important:** The `VITE_` prefix is required — Vite only exposes env vars with this prefix to the client.

## 5. Deploy
- [ ] Click **Deploy** in Vercel
- [ ] Verify the live app loads and can generate workouts
- [ ] Test on mobile to verify responsive layout
- [ ] Test the Copy to Clipboard feature
