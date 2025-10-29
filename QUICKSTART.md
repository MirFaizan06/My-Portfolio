# 🚀 Quick Start Guide

Get your portfolio running in 5 minutes!

## Immediate Testing (Without Firebase/OAuth)

You can test the frontend and basic backend immediately without setting up Firebase or Google OAuth.

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 Environment: development
```

The server will run with in-memory storage (no database required for testing).

### Step 2: Start the Frontend

Open a **new terminal** and run:

```bash
cd client
npm run dev
```

You should see something like:
```
VITE v7.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser

Open your browser and navigate to:
```
http://localhost:5173
```

You should now see your portfolio website! 🎉

## What Works Right Now

✅ **Home Page** - Hero section with animations, skills, and stats
✅ **Projects Page** - Sample projects with filtering and search
✅ **Pricing Page** - Beautiful pricing cards and services table
✅ **Resume Page** - Work experience, education, skills, certifications
✅ **Contact Page** - Contact form (frontend only for now)
✅ **Dark/Light Theme** - Toggle between themes
✅ **Smooth Animations** - Framer Motion animations throughout
✅ **Responsive Design** - Works on all devices

## What Needs Setup Later

⚙️ **Firebase** - For file uploads (resume PDF, project images)
⚙️ **Google OAuth** - For admin panel authentication
⚙️ **Admin Panel** - To be built next
⚙️ **Contact Form Backend** - To send actual emails

## Next Steps

### 1. Customize Your Content

Edit these files to add your own information:

**Home Page:**
- `client/src/pages/Home.jsx` - Update name, bio, stats

**Projects:**
- `client/src/pages/Projects.jsx` - Replace sample projects with your own

**Pricing:**
- `client/src/pages/Pricing.jsx` - Update pricing and services

**Resume:**
- `client/src/pages/Resume.jsx` - Add your experience, education, skills

### 2. Customize Theme Colors

Edit `client/src/index.css` to change colors:
- Lines 4-34: Theme color variables
- Modify `--color-*` variables for different colors

### 3. Set Up Firebase (Optional for now)

When you're ready for file uploads:

1. Create a Firebase project at https://console.firebase.google.com/
2. Download service account key
3. Place in `firebase/serviceAccountKey.json`
4. Copy `.env.example` to `.env` in both client and server
5. Fill in Firebase credentials

### 4. Set Up Google OAuth (For Admin Panel)

When you want to add the admin panel:

1. Go to https://console.cloud.google.com/
2. Create OAuth 2.0 credentials
3. Add credentials to `.env` files

## Testing Features

### Test Dark/Light Mode
- Click the sun/moon icon in the navigation bar

### Test Projects Filtering
- Go to Projects page
- Click "Client Work" or "Personal" filters
- Try searching for project names

### Test Responsive Design
- Open DevTools (F12)
- Toggle device toolbar (Ctrl/Cmd + Shift + M)
- Try different screen sizes

## Common Issues

**Port already in use?**
```bash
# Kill processes on ports
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

**Module not found errors?**
```bash
# Re-install dependencies
cd client
npm install

cd ../server
npm install
```

**Styling not working?**
Make sure Vite is running and check the browser console for errors.

## API Endpoints (Testing)

You can test the API directly:

```bash
# Get version
curl http://localhost:5000/api/version

# Health check
curl http://localhost:5000/api/health

# Get projects
curl http://localhost:5000/api/projects

# Get pricing
curl http://localhost:5000/api/pricing
```

## Development Tips

1. **Hot Module Replacement (HMR)** - Changes auto-reload
2. **Error Overlay** - Vite shows errors in browser
3. **React DevTools** - Install browser extension for debugging
4. **Tailwind IntelliSense** - Install VS Code extension for autocomplete

## Need Help?

Check the main README.md for detailed documentation!

---

Happy coding! 🚀

Built with ❤️ by Mir Faizan (NxY)
