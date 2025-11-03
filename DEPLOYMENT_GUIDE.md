# Deployment Guide

Complete step-by-step guide for deploying the Portfolio Website to production.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Firebase Setup](#firebase-setup)
- [Environment Configuration](#environment-configuration)
- [Vercel Deployment](#vercel-deployment)
- [Post-Deployment Configuration](#post-deployment-configuration)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedures](#rollback-procedures)

## Prerequisites

Before deploying, ensure you have:

- [ ] Node.js 18+ installed
- [ ] Git installed and configured
- [ ] GitHub account with repository access
- [ ] Vercel account (free tier works)
- [ ] Google Cloud Platform account
- [ ] Firebase project created
- [ ] Google OAuth credentials configured

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Enter project name (e.g., `my-portfolio`)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### 2. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Select "Production mode"
4. Choose location (e.g., `us-central1`)
5. Click "Enable"

### 3. Create Firestore Collections

Firestore will auto-create collections when data is first added, but you can create them manually:

**Collections to create:**
- `projects`
- `pricing`
- `services`
- `contactDetails`
- `version`
- `resume` (parent collection)
  - `experiences` (subcollection)
  - `education` (subcollection)
  - `skills` (subcollection)
  - `certifications` (subcollection)

### 4. Configure Firestore Security Rules

1. Go to "Firestore Database" > "Rules"
2. Replace default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null &&
             request.auth.token.email == 'mirfaizan8803@gmail.com';
    }

    // Projects - public read, admin write
    match /projects/{projectId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Pricing - public read, admin write
    match /pricing/{pricingId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Services - public read, admin write
    match /services/{serviceId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Resume categories - public read, admin write
    match /resume/{category}/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Version - public read, admin write
    match /version/{versionId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Contact Details - public read, admin write
    match /contactDetails/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

3. Click "Publish"

**Important:** Replace `mirfaizan8803@gmail.com` with your admin email address!

### 5. Enable Authentication

1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Click "Google" under Sign-in providers
4. Enable Google sign-in
5. Enter project public-facing name
6. Enter support email
7. Click "Save"

### 6. Get Firebase Credentials

#### For Frontend (Client Config):

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click web icon (</>)
4. Register app (e.g., "Portfolio Client")
5. Copy the config object:

```javascript
{
  apiKey: "AIzaSy...",
  authDomain: "my-portfolio.firebaseapp.com",
  projectId: "my-portfolio",
  storageBucket: "my-portfolio.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc",
  measurementId: "G-XXXXXXXXXX"
}
```

#### For Backend (Service Account):

1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save the JSON file securely
4. Extract these values for your `.env`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

**Security Warning:** Never commit the service account JSON or private key to git!

### 7. Configure OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Go to "APIs & Services" > "OAuth consent screen"
4. Select "External" user type
5. Fill in required information:
   - App name: Your Portfolio
   - User support email: your email
   - Developer contact: your email
6. Click "Save and Continue"
7. Skip scopes (default is fine)
8. Add test users if needed
9. Click "Save and Continue"

### 8. Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application"
4. Add authorized JavaScript origins:
   - `http://localhost:5173` (development)
   - `https://your-domain.vercel.app` (production)
5. Add authorized redirect URIs:
   - `http://localhost:5173` (development)
   - `https://your-domain.vercel.app` (production)
6. Click "Create"
7. Copy Client ID and Client Secret

### 9. Configure Authorized Domains in Firebase

1. Go to Firebase Console > Authentication > Settings
2. Scroll to "Authorized domains"
3. Add your domains:
   - `localhost` (already added)
   - `your-domain.vercel.app`
   - `*.vercel.app` (optional, for preview deployments)
4. Click "Add domain"

## Environment Configuration

### Backend Environment Variables

Create `server/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
CLIENT_URL=https://your-frontend.vercel.app

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# JWT Configuration
JWT_SECRET=your-very-long-and-random-secret-key-here-minimum-32-characters

# Google OAuth
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret
```

**Important Notes:**
- `FIREBASE_PRIVATE_KEY` must include the escaped newlines (`\n`)
- `JWT_SECRET` should be a long random string (use: `openssl rand -base64 32`)
- Never commit `.env` files to git

### Frontend Environment Variables

Create `client/.env`:

```env
# Backend API URL
VITE_API_URL=https://your-backend.vercel.app/api

# Firebase Client Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdefg
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Vercel Deployment

### Install Vercel CLI

```bash
npm install -g vercel
```

### Login to Vercel

```bash
vercel login
```

Follow the authentication flow in your browser.

### Deploy Backend

1. Navigate to server directory:
```bash
cd server
```

2. Create production build (optional, for testing):
```bash
npm run build
```

3. Deploy to Vercel:
```bash
vercel --prod
```

4. Follow prompts:
   - Setup and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time) or **Y** (subsequent)
   - Project name? `portfolio-server` (or your choice)
   - Directory? `.` (current directory)
   - Override settings? **N**

5. Note the production URL (e.g., `https://server-xxx.vercel.app`)

6. Set environment variables in Vercel:
   - Go to Vercel Dashboard
   - Select your server project
   - Go to Settings > Environment Variables
   - Add all variables from `server/.env`
   - **Important:** Select "Production" environment
   - Click "Save"

7. Redeploy to apply environment variables:
```bash
vercel --prod
```

### Deploy Frontend

1. Update `client/.env` with production backend URL:
```env
VITE_API_URL=https://server-xxx.vercel.app/api
```

2. Navigate to client directory:
```bash
cd client
```

3. Test production build locally:
```bash
npm run build
npm run preview
```

4. Deploy to Vercel:
```bash
vercel --prod
```

5. Follow prompts (same as backend)

6. Set environment variables in Vercel:
   - Go to Vercel Dashboard
   - Select your client project
   - Go to Settings > Environment Variables
   - Add all variables from `client/.env`
   - Select "Production" environment
   - Click "Save"

7. Redeploy:
```bash
vercel --prod
```

8. Note the production URL (e.g., `https://client-xxx.vercel.app`)

### Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel:
   - **A Record**: `76.76.21.21`
   - **CNAME Record**: `cname.vercel-dns.com`
4. Wait for DNS propagation (can take up to 48 hours)
5. Vercel will automatically provision SSL certificate

## Post-Deployment Configuration

### 1. Update Firebase Authorized Domains

1. Go to Firebase Console > Authentication > Settings
2. Add your production domains:
   - `client-xxx.vercel.app`
   - `your-custom-domain.com` (if using)

### 2. Update Google OAuth Authorized Origins

1. Go to Google Cloud Console > APIs & Services > Credentials
2. Click on your OAuth 2.0 Client ID
3. Add Authorized JavaScript origins:
   - `https://client-xxx.vercel.app`
   - `https://your-custom-domain.com`
4. Add Authorized redirect URIs:
   - `https://client-xxx.vercel.app`
   - `https://your-custom-domain.com`
5. Click "Save"

### 3. Update CORS Configuration

The backend automatically allows the CLIENT_URL. Verify:

1. Check `server/src/server.js`
2. Ensure `CLIENT_URL` environment variable is set correctly in Vercel
3. Test CORS by accessing frontend and checking browser console

### 4. Disable Vercel Deployment Protection

For public APIs, you may need to disable deployment protection:

1. Go to Vercel Dashboard
2. Select server project
3. Go to Settings > Deployment Protection
4. Turn off "Vercel Authentication"
5. Save changes

**Note:** Only disable if API needs to be publicly accessible!

### 5. Test Deployment

1. Visit your frontend URL
2. Test public pages:
   - [ ] Home page loads
   - [ ] Projects page displays data
   - [ ] Pricing page shows plans
   - [ ] Resume page loads
   - [ ] Contact page displays details
3. Test admin functionality:
   - [ ] Login with Google OAuth
   - [ ] Access admin dashboard
   - [ ] Create/edit/delete project
   - [ ] Update pricing
   - [ ] Manage resume
   - [ ] Update contact details
4. Test currency conversion:
   - [ ] Currency selector works
   - [ ] Prices convert correctly
   - [ ] Smart rounding applied

### 6. Setup Monitoring

1. **Vercel Analytics:**
   - Go to Vercel Dashboard > Analytics
   - Enable Web Analytics

2. **Firebase Console:**
   - Monitor Firestore usage
   - Check Authentication logs
   - Set up budget alerts

3. **Error Tracking:**
   - Check Vercel Functions logs for backend errors
   - Check browser console for frontend errors

### 7. Backup Strategy

1. **Firestore Backup:**
   - Go to Firestore > Import/Export
   - Export collections to Cloud Storage
   - Schedule regular exports

2. **Code Backup:**
   - Code is already on GitHub
   - Tag releases: `git tag v1.0.0 && git push origin v1.0.0`

## Troubleshooting

### Issue: 404 on Refresh

**Problem:** Getting 404 when refreshing on routes like `/projects` or `/admin`

**Solution:**
- Ensure `client/vercel.json` has SPA rewrite rules:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
- Redeploy: `vercel --prod`

### Issue: CORS Errors

**Problem:** `Access-Control-Allow-Origin` errors in browser console

**Solutions:**
1. Check `CLIENT_URL` in backend environment variables matches frontend domain exactly
2. Verify backend CORS configuration in `server/src/server.js`
3. Clear browser cache and hard refresh (Ctrl+Shift+R)
4. Check if Vercel deployment protection is blocking requests

### Issue: Firebase Authentication Failed

**Problem:** Google login not working or "domain not authorized" error

**Solutions:**
1. Check authorized domains in Firebase Console
2. Verify OAuth credentials in Google Cloud Console
3. Ensure redirect URIs match exactly (no trailing slashes)
4. Clear browser cookies and try again
5. Check browser console for detailed error messages

### Issue: Environment Variables Not Working

**Problem:** `undefined` values or wrong configuration

**Solutions:**
1. Verify environment variables are set in Vercel Dashboard
2. Ensure "Production" environment is selected
3. Redeploy after adding/changing variables: `vercel --prod`
4. For Vite variables, ensure they start with `VITE_`
5. Check for typos in variable names

### Issue: Firestore Permission Denied

**Problem:** `7 PERMISSION_DENIED` errors

**Solutions:**
1. Check Firestore security rules are published
2. Verify admin email in security rules matches your account
3. Ensure user is authenticated (JWT token is valid)
4. Check if Firestore API is enabled in Google Cloud Console

### Issue: Data Disappearing

**Problem:** Data shows briefly then vanishes

**Solution:**
- This was caused by in-memory storage on serverless functions
- Ensure all controllers use Firestore (not `let array = []`)
- Check `pricingController.js`, `projectController.js`, etc. use Firestore

### Issue: Build Failures

**Problem:** Deployment fails during build

**Solutions:**
1. Check build logs in Vercel Dashboard
2. Test build locally: `npm run build`
3. Ensure all dependencies are in `package.json`
4. Check Node.js version compatibility
5. Clear cache: `vercel --force`

### Issue: Slow Performance

**Problem:** Website loads slowly

**Solutions:**
1. Enable Vercel Edge caching
2. Optimize images (compress, use WebP)
3. Check Firestore query efficiency
4. Monitor Vercel Analytics for bottlenecks
5. Consider lazy loading for heavy components

## Rollback Procedures

### Rollback to Previous Deployment

1. Go to Vercel Dashboard
2. Select project (client or server)
3. Go to "Deployments" tab
4. Find the last working deployment
5. Click "⋯" (three dots) > "Promote to Production"

### Rollback Code Changes

If you need to revert code:

```bash
# Find the commit to revert to
git log --oneline

# Revert to specific commit
git reset --hard <commit-hash>

# Force push (be careful!)
git push --force

# Vercel will auto-deploy the reverted code
```

### Emergency Shutdown

If something is critically broken:

1. **Disable Backend:**
   - Go to Vercel > Server Project > Settings
   - Change environment to "Paused"

2. **Disable Frontend:**
   - Show maintenance page
   - Or pause deployment in Vercel

3. **Disable Firestore:**
   - Go to Firebase Console > Firestore > Rules
   - Temporarily deny all access:
   ```javascript
   match /{document=**} {
     allow read, write: if false;
   }
   ```

## Deployment Checklist

Before going live, verify:

- [ ] All environment variables set correctly
- [ ] Firebase authorized domains updated
- [ ] Google OAuth configured with production URLs
- [ ] Firestore security rules published
- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] CORS working between frontend and backend
- [ ] Google OAuth login working
- [ ] Admin panel accessible
- [ ] All public pages loading
- [ ] Currency conversion working
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] Error handling working
- [ ] Analytics enabled
- [ ] Backup strategy in place
- [ ] SSL certificate active (Vercel handles this)
- [ ] Custom domain configured (if using)

## Continuous Deployment

Vercel supports automatic deployments from Git:

### Setup Git Integration

1. Go to Vercel Dashboard > Project Settings
2. Click "Git"
3. Connect to GitHub repository
4. Configure:
   - **Production Branch:** `main`
   - **Deploy Hooks:** Create webhook URL for manual triggers

### Automatic Deployments

Now whenever you push to `main`:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Run build
3. Deploy to production
4. Invalidate cache

### Preview Deployments

For feature branches:

```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
```

Vercel creates a preview deployment with unique URL for testing before merging to main.

## Support

If you encounter issues not covered here:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [Firebase Documentation](https://firebase.google.com/docs)
3. Review deployment logs in Vercel Dashboard
4. Check browser console for client-side errors
5. Review Firestore security rules and usage

---

**Last Updated:** November 3, 2025

**Deployed URLs:**
- Frontend: https://client-the-nxt-lvls-projects.vercel.app
- Backend: https://server-the-nxt-lvls-projects.vercel.app
