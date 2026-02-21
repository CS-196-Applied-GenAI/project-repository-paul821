# Project WOW: Vercel Deployment Checklist

This document provides a checklist for deploying **Project WOW** to Vercel, integrating both the React Frontend and the Supabase Backend.

## 1. Supabase Preparation
- [ ] Go to your Supabase dashboard and verify the `Project WOW` project is active.
- [ ] Navigate to **SQL Editor** and run the contents of `supabase/migrations/00001_project_wow_init.sql` to initialize the tables (`exercises` and `workouts`).
- [ ] Run the seeding command `npx tsc scripts/seed.ts && node scripts/seed.js` or execute the queries manually to populate the DB with 20 exercises and 5 WODs.
- [ ] Go to **Project Settings -> API** and retrieve your:
  - `Project URL`
  - `anon public key`

## 2. GitHub Repository
- [ ] Ensure all local files are committed (including `vercel.json` and the `vite.config.ts` updates).
- [ ] Push the `Project WOW` code to a GitHub repository.

## 3. Vercel Configuration
- [ ] Go to [vercel.com](https://vercel.com) and click **Add New... -> Project**.
- [ ] Import your `Project WOW` GitHub repository.
- [ ] Under **Framework Preset**, Vercel should auto-detect **Vite**.
- [ ] Double check the **Build Command** is `npm run build` and **Output Directory** is `dist` (this is also explicitly enforced via `vercel.json`).

## 4. Environment Variables
- [ ] Expand the **Environment Variables** section on the Vercel import page.
- [ ] Add the following variables retrieved from Supabase:
  - `VITE_SUPABASE_URL` = `<your_supabase_project_url>`
  - `VITE_SUPABASE_ANON_KEY` = `<your_supabase_anon_public_key>`

## 5. Deploy
- [ ] Click **Deploy**.
- [ ] Wait for the build process to finish.
- [ ] Visit the assigned `.vercel.app` domain and verify the dashboard loads on desktop and mobile. 
- [ ] Click "Generate Workout" and verify data fetches successfully from Supabase!
