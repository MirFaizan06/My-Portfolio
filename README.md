# Portfolio Website

A modern, full-stack portfolio website built with React, Node.js, Express, and Firebase. Features a complete admin panel for managing projects, pricing, resume content, and more.

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Preview)

## Features

### Public Features
- 🏠 **Modern Landing Page** - Animated hero section with smooth scrolling
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Dark/Light Mode** - Theme toggle with persistent preference
- 📂 **Projects Showcase** - Display your portfolio projects
- 💰 **Pricing Plans** - Show your service offerings
- 📄 **Dynamic Resume** - Experience, education, skills, and certifications
- 📧 **Contact Form** - Get in touch functionality
- 🎯 **Smooth Animations** - Powered by Framer Motion

### Admin Features
- 🔐 **Google OAuth Authentication** - Secure admin login
- 📊 **Admin Dashboard** - Complete management interface
- ✏️ **Project Management** - Full CRUD operations
- 💵 **Pricing Management** - Create and manage pricing plans
- 📝 **Resume Management** - Manage experience, education, skills, certifications
- 📤 **File Uploads** - Upload images and PDF certificates
- 🎭 **Custom Modals** - Beautiful, consistent UI feedback

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Firebase** - Authentication & Storage
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Firebase Admin SDK** - Database & Auth
- **Firestore** - NoSQL database
- **Firebase Storage** - File storage

## Project Structure

```
My Portfolio/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── config/        # Firebase config
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/        # Firebase admin config
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   └── routes/        # API routes
│   └── package.json
│
├── RAILWAY_DEPLOYMENT_GUIDE.md  # Detailed Railway deployment guide
├── DEPLOYMENT_CHECKLIST.md      # Quick deployment checklist
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd "My Portfolio"
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → Google sign-in method
3. Create **Firestore Database** (start in production mode)
4. Enable **Firebase Storage**
5. Download service account key:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `server/src/config/serviceAccountKey.json`

### 3. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in `server/` directory:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# From serviceAccountKey.json
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----"

# From Firebase Project Settings → General
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id

# Your Google account email for admin access
ADMIN_EMAIL=your-email@gmail.com
```

Start the backend:

```bash
npm start
```

Backend will run at: `http://localhost:5000`

### 4. Frontend Setup

```bash
cd client
npm install
```

Create `.env` file in `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api

# Same Firebase config as backend
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

### 5. Access Admin Panel

1. Visit `http://localhost:5173/admin/login`
2. Click "Sign in with Google"
3. Sign in with the email you set as `ADMIN_EMAIL`
4. You'll be redirected to the admin dashboard

## Firestore Collections

The app uses these Firestore collections:

- `projects` - Portfolio projects
- `pricing` - Pricing plans
- `resume_experiences` - Work experience
- `resume_education` - Education history
- `resume_skills` - Skills by category
- `resume_certifications` - Certifications with optional PDFs

## API Endpoints

### Public Endpoints
```
GET  /api/projects           # Get all projects
GET  /api/pricing            # Get all pricing plans
GET  /api/resume/experiences # Get all experiences
GET  /api/resume/education   # Get all education
GET  /api/resume/skills      # Get all skills
GET  /api/resume/certifications # Get certifications
GET  /api/health             # Health check
```

### Protected Endpoints (Admin only)
```
POST   /api/projects         # Create project
PUT    /api/projects/:id     # Update project
DELETE /api/projects/:id     # Delete project

POST   /api/pricing          # Create pricing plan
PUT    /api/pricing/:id      # Update pricing plan
DELETE /api/pricing/:id      # Delete pricing plan

POST   /api/resume/experiences # Create experience
PUT    /api/resume/experiences/:id # Update experience
DELETE /api/resume/experiences/:id # Delete experience
# ... similar for education, skills, certifications

POST   /api/upload           # Upload file
DELETE /api/upload/:filename # Delete file
```

### Authentication
```
POST /api/auth/google        # Google OAuth login
GET  /api/auth/verify        # Verify auth token
```

## Deployment

### Deploy to Railway

Follow the comprehensive guides:
- **[Railway Deployment Guide](./RAILWAY_DEPLOYMENT_GUIDE.md)** - Detailed step-by-step instructions
- **[Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)** - Quick checklist for deployment

Quick deployment steps:

1. Push your code to GitHub
2. Create a Railway account
3. Create a new project from GitHub repo
4. Deploy backend:
   - Set root directory to `server`
   - Add environment variables
   - Generate domain
5. Deploy frontend:
   - Set root directory to `client`
   - Add environment variables
   - Generate domain
6. Update CORS settings
7. Add domains to Firebase authorized domains

Estimated cost: **$10-18/month** on Railway

## Development

### Run Both Services Concurrently

Install `concurrently` globally:
```bash
npm install -g concurrently
```

From root directory:
```bash
concurrently "cd server && npm start" "cd client && npm run dev"
```

### Code Style

- ESLint configured for React
- Use functional components with hooks
- Follow existing naming conventions
- Keep components modular and reusable

## Environment Variables

See `.env.example` files in both `client/` and `server/` directories for all required variables.

## Security

- Admin access restricted to `ADMIN_EMAIL`
- Firebase security rules for authenticated users
- CORS configured for specific origins
- Helmet.js for HTTP headers security
- Environment variables never committed to git

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading for images
- Code splitting with React Router
- Vite for fast builds and HMR
- Optimized bundle size

## Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project as a template for your own portfolio!

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Firebase](https://firebase.google.com/)
- [Railway](https://railway.app/)

## Contact

For questions or feedback:
- Email: [your-email@example.com](mailto:your-email@example.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

---

Built with ❤️ using React and Node.js
