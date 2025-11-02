# Production Setup Guide

## Overview
This guide will help you configure your portfolio for production deployment.

## Issues Fixed
✅ **Fixed hardcoded Firebase project URL** in AdminLogin.jsx
✅ **Fixed bucket reference issue** in uploadController.js
✅ **Optimized Vite build configuration** with code splitting
✅ **Updated environment variable templates** with production sections
✅ **Verified build process** - no errors

---

## Pre-Deployment Checklist

### 1. Environment Variables

#### Client (.env)
Create a `.env` file in the `client/` directory:

```env
# Production API URL
VITE_API_URL=https://your-backend-url.railway.app/api

# Firebase Configuration (same for dev and prod)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

#### Server (.env)
Create a `.env` file in the `server/` directory:

```env
# IMPORTANT: Set NODE_ENV to production
NODE_ENV=production
PORT=5000

# Frontend URL (update with your deployed frontend)
CLIENT_URL=https://your-frontend-url.railway.app

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com

# Firebase Client Configuration
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

# Admin Email (for access control)
ADMIN_EMAIL=your-admin-email@gmail.com
```

---

## 2. Firebase Configuration

### Enable Google Authentication
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Navigate to **Authentication** > **Sign-in method**
4. Enable **Google** sign-in provider
5. Add authorized domains:
   - `localhost` (for development)
   - Your production domain (e.g., `your-app.railway.app`)

### Configure Storage Rules
1. Navigate to **Storage** in Firebase Console
2. Update security rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Get Service Account Key
1. Go to **Project Settings** > **Service Accounts**
2. Click **Generate New Private Key**
3. Download the JSON file
4. Extract the values for your `.env` file:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY`

---

## 3. Deployment Steps

### Railway Deployment

#### Deploy Backend (Server)
1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Select the `server` directory as root
4. Add all environment variables from server `.env`
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Deploy and note the backend URL

#### Deploy Frontend (Client)
1. Create another service in Railway
2. Select the `client` directory as root
3. Add environment variables from client `.env`
4. Update `VITE_API_URL` with your backend URL
5. Set build command: `npm install && npm run build`
6. Set start command: `npm run preview`
7. Deploy

---

## 4. Post-Deployment Verification

### Test Checklist
- [ ] Homepage loads correctly
- [ ] All pages are accessible
- [ ] Firebase authentication works
- [ ] Admin login with Google works
- [ ] Admin dashboard accessible
- [ ] File uploads work
- [ ] API endpoints respond correctly
- [ ] CORS is properly configured
- [ ] Environment variables are set correctly

### Common Issues

#### CORS Errors
**Problem:** Frontend can't access backend API
**Solution:** Update `CLIENT_URL` in server `.env` with correct frontend URL

#### Firebase Authentication Fails
**Problem:** "Unauthorized domain" error
**Solution:** Add your production domain to Firebase authorized domains

#### 404 on Refresh
**Problem:** Page refreshes result in 404
**Solution:** Configure your hosting platform for SPA routing

---

## 5. Environment-Specific Settings

### Development
```env
NODE_ENV=development
CLIENT_URL=http://localhost:5173
VITE_API_URL=http://localhost:5000/api
```

### Production
```env
NODE_ENV=production
CLIENT_URL=https://your-frontend.railway.app
VITE_API_URL=https://your-backend.railway.app/api
```

---

## 6. Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use environment variables** for all secrets
3. **Enable HTTPS** on production (Railway does this by default)
4. **Restrict admin access** to specific email addresses
5. **Configure CORS** to only allow your frontend domain
6. **Set up Firebase security rules** properly
7. **Use strong authentication** for admin panel

---

## 7. Performance Optimizations (Already Applied)

✅ **Code Splitting:** Vite config splits code into optimized chunks
✅ **Chunk Size Optimized:** Separated React, Firebase, Motion, and Charts
✅ **Minification:** Enabled with esbuild
✅ **Source Maps:** Disabled for production builds

---

## 8. Monitoring and Logs

### View Logs
- Railway: Dashboard > Deployments > View Logs
- Firebase: Console > Analytics

### Monitor Performance
- Use Chrome DevTools
- Check Network tab for API calls
- Monitor Firebase usage

---

## Support

If you encounter issues:
1. Check environment variables are correctly set
2. Review deployment logs
3. Verify Firebase configuration
4. Ensure CORS is properly configured
5. Check that NODE_ENV is set to 'production'

---

## Build Information

- **Client Build:** Optimized with Vite, code-split chunks
- **Server:** Node.js with Express
- **Database:** Firebase Firestore (in-memory for projects/pricing)
- **Storage:** Firebase Cloud Storage
- **Authentication:** Firebase Auth with Google Sign-In

---

## Quick Commands

```bash
# Client
cd client
npm install
npm run build    # Production build
npm run preview  # Test production build locally

# Server
cd server
npm install
npm start        # Production mode (requires NODE_ENV=production)
npm run dev      # Development mode
```

---

**Last Updated:** 2025-01-02
**Portfolio Version:** 1.0.0
**Status:** Production Ready ✅
