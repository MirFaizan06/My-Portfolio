# 🚀 Portfolio Website - Mir Faizan (NxY)

A modern, full-stack portfolio website with a stunning dark/light theme, smooth animations, and an admin panel for dynamic content management.

## ✨ Features

### Frontend
- 🎨 **Modern UI/UX** - Clean, professional design with glassmorphism effects
- 🌓 **Dark/Light Mode** - Toggle between gaming-inspired dark mode and professional light mode
- ⚡ **Smooth Animations** - Framer Motion animations throughout
- 📱 **Fully Responsive** - Mobile-first design, works on all devices
- 🎯 **Dynamic Content** - Projects and pricing fetched from backend API
- 📊 **Interactive Components** - Filterable projects, animated pricing cards
- 📝 **Contact Form** - Easy-to-use contact form with validation
- 📄 **Resume Page** - Detailed resume with download functionality

### Backend
- 🔐 **Google OAuth** - Secure authentication (restricted to specific email)
- 🛡️ **Protected API Routes** - JWT-based authentication
- 📦 **File Upload** - Firebase Storage integration for images and PDFs
- 🔄 **Version Tracking** - Automatic version management
- 🗄️ **RESTful API** - Clean API structure for all resources

### Tech Stack

**Frontend:**
- React 19 + Vite
- TailwindCSS v4 (with @theme syntax)
- Framer Motion
- React Router
- Lucide React Icons
- Chart.js

**Backend:**
- Node.js + Express
- Firebase Admin SDK
- Google Auth Library
- JWT + Bcrypt
- Multer (file uploads)

## 🏗️ Project Structure

```
portfolio/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components (Navbar, Footer)
│   │   ├── pages/        # Page components (Home, Projects, etc.)
│   │   ├── context/      # React Context (Theme)
│   │   ├── assets/       # Static assets
│   │   └── utils/        # Utility functions
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/               # Express backend
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Route controllers
│   │   ├── middlewares/ # Auth & other middleware
│   │   └── config/      # Configuration files
│   ├── version.json     # Version tracking
│   └── package.json
│
├── firebase/            # Firebase configuration
│   ├── firebaseAdmin.js
│   └── serviceAccountKey.json (you'll add this)
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project (for storage & auth)
- Google Cloud Console project (for OAuth)

### Installation

1. **Clone the repository** (or you're already in it!)

2. **Install Client Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Server Dependencies**
   ```bash
   cd ../server
   npm install
   ```

### Configuration

#### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Firebase Storage**
4. Go to **Project Settings** → **Service Accounts**
5. Click **Generate New Private Key**
6. Save the JSON file as `serviceAccountKey.json` in the `firebase/` folder
7. Get your web app config (Project Settings → General → Your apps)

#### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen
6. Add authorized origins: `http://localhost:5173` and `http://localhost:5000`
7. Copy the Client ID

#### 3. Environment Variables

**Client (.env)**
```bash
cd client
cp .env.example .env
# Edit .env with your Firebase and Google OAuth credentials
```

**Server (.env)**
```bash
cd server
cp .env.example .env
# Edit .env with your configuration
```

### Running the Application

#### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

#### Production Build

**Build Client:**
```bash
cd client
npm run build
```

**Start Server:**
```bash
cd server
npm start
```

## 📖 API Documentation

### Public Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `GET /api/pricing` - Get all pricing plans
- `GET /api/pricing/:id` - Get single pricing plan
- `GET /api/version` - Get current version
- `GET /api/health` - Health check

### Protected Endpoints (Require Auth)

- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/verify` - Verify authentication
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/pricing` - Create pricing plan
- `PUT /api/pricing/:id` - Update pricing plan
- `DELETE /api/pricing/:id` - Delete pricing plan
- `POST /api/upload` - Upload file
- `DELETE /api/upload/:filename` - Delete file
- `POST /api/version` - Update version

## 🎨 Customization

### Colors & Theme

Edit `client/src/index.css` to customize colors:
- Light mode colors: `--color-light-*`
- Dark mode colors: `--color-dark-*`
- Gradients: `--gradient-*`

### Fonts

Fonts are defined in `client/index.html` (Google Fonts) and `client/src/index.css`:
- Sans-serif: Inter
- Display: Space Grotesk

## 🔐 Admin Panel

Access the admin panel at `/admin` (coming soon!)

**Features:**
- Google Sign-In only
- Restricted to `mirfaizan8803@gmail.com`
- Add/Edit/Delete projects
- Add/Edit/Delete pricing
- Upload CV/Images
- View analytics

## 📝 Version Tracking

The project automatically tracks versions in `server/version.json`.
The current version is displayed in the footer.

**Initial Version:** v1.0.0

## 🚧 Roadmap

- [ ] Complete Admin Panel UI
- [ ] Integrate Firestore for data persistence
- [ ] Add blog section
- [ ] Email notifications for contact form
- [ ] Analytics dashboard
- [ ] "Buy Me a Coffee" integration
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Unit & E2E tests

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 📧 Contact

**Mir Faizan (NxY)**
- Email: mirfaizan8803@gmail.com
- GitHub: [@mirfaizan8803](https://github.com/mirfaizan8803)

---

Made with ❤️ using React, TailwindCSS, and Node.js

🤖 Generated with [Claude Code](https://claude.com/claude-code)
