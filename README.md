# Portfolio Website - Mir Faizan (NxY)

A modern, full-stack portfolio website featuring a dynamic admin panel, multi-currency pricing system, and comprehensive project showcase. Built with React, Node.js, Express, and Firebase.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Security](#security)
- [Contributing](#contributing)

## Overview

This portfolio website is a comprehensive full-stack application designed to showcase projects, provide pricing information, display professional resume, and offer seamless contact options. It includes an admin panel for dynamic content management and features a sophisticated multi-currency pricing system with automatic exchange rate conversion.

**Live URLs:**
- **Frontend**: https://client-the-nxt-lvls-projects.vercel.app
- **Backend API**: https://server-the-nxt-lvls-projects.vercel.app
- **Admin Panel**: https://client-the-nxt-lvls-projects.vercel.app/admin

## Features

### Public Features

#### 1. Home Page
- Hero section with animated background effects
- Skills showcase with gradient cards
- Statistics display (projects completed, clients, experience)
- Social media links (GitHub, LinkedIn, Email)
- Responsive design with dark/light theme support

#### 2. Projects Page
- Dynamic project cards with images
- Filter projects by technology
- Detailed project information (tech stack, links)
- Smooth animations with Framer Motion
- Real-time data from Firebase Firestore

#### 3. Pricing Page
- **Multi-Currency Support**: 12 currencies including USD, EUR, GBP, INR, JPY, AUD, CAD, CHF, CNY, AED, PHP, IDR
- **Auto-Detection**: Automatically detects user location and displays prices in their local currency
- **Smart Rounding**: Prices automatically round to nearest 100 for clean display
- **Real-Time Exchange Rates**: Fetches live exchange rates from exchangerate-api.com
- **Pricing Plans**: Low-to-high sorted pricing tiers with features
- **Additional Services**: Table of extra services with pricing and turnaround times
- Popular plan highlighting

#### 4. Resume Page
- Professional experience timeline
- Education history
- Skills showcase with categorization
- Certifications and achievements
- Downloadable PDF resume

#### 5. Contact Page
- **Dynamic Contact Details**: Email, phone, location, and social links stored in Firestore
- Contact form with validation
- Loading states and success/error feedback
- Responsive layout with name/email fields in same row
- Enhanced animations matching site design
- Default fallback to India location

### Admin Features

#### 1. Authentication
- Google OAuth integration via Firebase
- Secure JWT token-based authentication
- Protected routes and API endpoints
- Admin-only access (email whitelist)

#### 2. Admin Dashboard
- **Projects Management**: Create, read, update, delete projects
- **Pricing Management**: Manage pricing plans and features
- **Services Management**: Add/edit additional services
- **Resume Management**: Update experience, education, skills, certifications
- **Contact Details Management**: Update email, phone, location, social links
- **Version Control**: Track and update site version
- **File Upload**: Upload project images and assets
- Statistics overview with charts

#### 3. Data Management
- Real-time updates via Firestore
- Confirmation dialogs for destructive actions
- Success/error notifications
- Form validation

## Tech Stack

### Frontend
- **Framework**: React 19.1.1
- **Routing**: React Router DOM 6.30.1
- **Styling**: Tailwind CSS 4.1.16
- **Animations**: Framer Motion 11.18.2
- **Icons**: Lucide React 0.548.0
- **Charts**: Chart.js 4.5.1 + React ChartJS 2
- **Authentication**: Firebase 10.14.1
- **Build Tool**: Vite 7.1.7

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.18.2
- **Database**: Firebase Firestore
- **Authentication**: Firebase Admin SDK 12.0.0, JWT 9.0.2
- **Security**: Helmet 7.1.0, CORS 2.8.5
- **File Upload**: Multer 1.4.5-lts.1
- **Environment**: dotenv 16.3.1

### DevOps & Deployment
- **Hosting**: Vercel (both frontend and backend)
- **Database**: Google Cloud Firestore
- **Version Control**: Git + GitHub
- **CI/CD**: Vercel automatic deployments

## Project Structure

```
My Portfolio/
├── client/                     # Frontend React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/            # Images, fonts, etc.
│   │   ├── components/        # Reusable React components
│   │   │   ├── admin/        # Admin-specific components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── Notification.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── config/
│   │   │   └── firebase.js   # Firebase client config
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Authentication state
│   │   │   └── ThemeContext.jsx   # Dark/Light theme
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Pricing.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       └── AdminDashboard.jsx
│   │   ├── utils/
│   │   │   ├── api.js         # API client functions
│   │   │   └── currency.js    # Currency conversion utilities
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── .env                   # Environment variables (not in git)
│   ├── vercel.json            # Vercel SPA config
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # Tailwind CSS config
│   └── package.json
│
├── server/                     # Backend Express API
│   ├── src/
│   │   ├── config/
│   │   │   ├── firebase.js          # Firebase config
│   │   │   └── firebaseAdmin.js     # Firebase Admin SDK
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── projectController.js
│   │   │   ├── pricingController.js
│   │   │   ├── servicesController.js
│   │   │   ├── resumeController.js
│   │   │   ├── contactDetailsController.js
│   │   │   ├── uploadController.js
│   │   │   └── versionController.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js    # JWT verification
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   ├── pricingRoutes.js
│   │   │   ├── servicesRoutes.js
│   │   │   ├── resumeRoutes.js
│   │   │   ├── contactDetailsRoutes.js
│   │   │   ├── uploadRoutes.js
│   │   │   └── versionRoutes.js
│   │   └── server.js           # Express app setup
│   ├── .env                    # Environment variables (not in git)
│   ├── vercel.json             # Vercel serverless config
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Firebase project created
- Google Cloud credentials configured

### 1. Clone Repository
```bash
git clone https://github.com/MirFaizan06/My-Portfolio.git
cd My-Portfolio
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file in `server/` directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email

# JWT Secret
JWT_SECRET=your-jwt-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Start backend server:
```bash
npm run dev
```

Backend will run on http://localhost:5000

### 3. Setup Frontend

```bash
cd client
npm install
```

Create `.env` file in `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api

# Firebase Client Config
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

Start frontend development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

### 4. Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database in production mode
3. Enable Authentication with Google provider
4. Add authorized domains:
   - localhost
   - Your production domain
5. Create Firestore collections:
   - `projects`
   - `pricing`
   - `services`
   - `resume` (with subcollections: experiences, education, skills, certifications)
   - `contactDetails`
   - `version`

6. Configure Firestore Security Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.token.email == 'mirfaizan8803@gmail.com';
    }

    // Public read, admin write for all collections
    match /projects/{projectId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /pricing/{pricingId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /services/{serviceId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /resume/{category}/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /version/{versionId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /contactDetails/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

## Environment Variables

### Backend (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `FIREBASE_PROJECT_ID` | Firebase project ID | `my-portfolio-9e277` |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin private key | `"-----BEGIN PRIVATE KEY-----\n..."` |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email | `firebase-adminsdk-xxx@xxx.iam.gserviceaccount.com` |
| `JWT_SECRET` | Secret for JWT tokens | `your-secret-key` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `xxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | `GOCSPX-xxx` |

### Frontend (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `VITE_FIREBASE_API_KEY` | Firebase API key | `AIzaSyXXX...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `my-portfolio-9e277.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | `my-portfolio-9e277` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | `my-portfolio-9e277.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | `1:123:web:abc` |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics ID | `G-XXXXXXXXXX` |

## API Documentation

### Base URL
- **Development**: `http://localhost:5000/api`
- **Production**: `https://server-the-nxt-lvls-projects.vercel.app/api`

### Authentication
Most write endpoints require JWT authentication. Include token in header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Health Check
```
GET /api/health
Response: { status: 'ok', message: 'Server is running' }
```

#### Projects
```
GET    /api/projects           # Get all projects (public)
GET    /api/projects/:id       # Get project by ID (public)
POST   /api/projects           # Create project (admin only)
PUT    /api/projects/:id       # Update project (admin only)
DELETE /api/projects/:id       # Delete project (admin only)
```

#### Pricing
```
GET    /api/pricing            # Get all pricing plans (public, sorted low-to-high)
GET    /api/pricing/:id        # Get pricing plan by ID (public)
POST   /api/pricing            # Create pricing plan (admin only)
PUT    /api/pricing/:id        # Update pricing plan (admin only)
DELETE /api/pricing/:id        # Delete pricing plan (admin only)
```

#### Services
```
GET    /api/services           # Get all services (public)
POST   /api/services           # Create service (admin only)
PUT    /api/services/:id       # Update service (admin only)
DELETE /api/services/:id       # Delete service (admin only)
```

#### Resume
```
# Experiences
GET    /api/resume/experiences            # Get all experiences (public)
GET    /api/resume/experiences/:id        # Get experience by ID (public)
POST   /api/resume/experiences            # Create experience (admin only)
PUT    /api/resume/experiences/:id        # Update experience (admin only)
DELETE /api/resume/experiences/:id        # Delete experience (admin only)

# Education
GET    /api/resume/education              # Get all education (public)
POST   /api/resume/education              # Create education (admin only)
PUT    /api/resume/education/:id          # Update education (admin only)
DELETE /api/resume/education/:id          # Delete education (admin only)

# Skills
GET    /api/resume/skills                 # Get all skills (public)
POST   /api/resume/skills                 # Create skill (admin only)
PUT    /api/resume/skills/:id             # Update skill (admin only)
DELETE /api/resume/skills/:id             # Delete skill (admin only)

# Certifications
GET    /api/resume/certifications         # Get all certifications (public)
POST   /api/resume/certifications         # Create certification (admin only)
PUT    /api/resume/certifications/:id     # Update certification (admin only)
DELETE /api/resume/certifications/:id     # Delete certification (admin only)
```

#### Contact Details
```
GET    /api/contact-details    # Get contact details (public)
PUT    /api/contact-details    # Update contact details (admin only)
```

#### Authentication
```
POST   /api/auth/google        # Login with Google OAuth token
GET    /api/auth/verify        # Verify JWT token (protected)
```

#### Upload
```
POST   /api/upload             # Upload file (admin only)
DELETE /api/upload/:filename   # Delete file (admin only)
```

#### Version
```
GET    /api/version            # Get current version (public)
POST   /api/version            # Update version (admin only)
```

### Request/Response Examples

#### Create Project
```javascript
POST /api/projects
Headers: { Authorization: 'Bearer <token>' }
Body: {
  name: "E-commerce Platform",
  description: "Full-stack e-commerce solution",
  techStack: ["React", "Node.js", "MongoDB"],
  image: "https://example.com/image.jpg",
  liveLink: "https://example.com",
  githubLink: "https://github.com/user/repo"
}

Response: {
  success: true,
  data: {
    id: "abc123",
    name: "E-commerce Platform",
    // ... rest of the data
    createdAt: "2025-11-03T10:00:00.000Z"
  }
}
```

#### Get Pricing Plans
```javascript
GET /api/pricing

Response: {
  success: true,
  data: [
    {
      id: "xyz789",
      name: "Starter",
      price: "99",
      period: "project",
      description: "Perfect for small projects",
      features: ["Responsive Design", "Basic SEO", "3 Revisions"],
      popular: false,
      color: "from-blue-500 to-cyan-500"
    },
    // ... more plans sorted by price (low to high)
  ]
}
```

## Deployment

### Vercel Deployment (Recommended)

Both frontend and backend are deployed on Vercel for optimal performance and zero configuration.

#### Backend Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy backend:
```bash
cd server
vercel --prod
```

4. Set environment variables in Vercel dashboard:
   - Go to project settings
   - Add all backend environment variables
   - Redeploy if needed

5. Note the production URL (e.g., `server-xxx.vercel.app`)

#### Frontend Deployment

1. Update `client/.env` with production backend URL:
```env
VITE_API_URL=https://server-xxx.vercel.app/api
```

2. Deploy frontend:
```bash
cd client
vercel --prod
```

3. Set environment variables in Vercel dashboard

4. Configure custom domain (optional)

#### Vercel Configuration

**Backend** (`server/vercel.json`):
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

**Frontend** (`client/vercel.json`):
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

### Post-Deployment

1. Update Firebase authorized domains:
   - Add Vercel production domain
   - Add Vercel deployment domains if needed

2. Update Google OAuth:
   - Add authorized JavaScript origins
   - Add authorized redirect URIs

3. Update CORS in backend:
   - Add production domain to allowed origins

4. Disable Vercel deployment protection (if API needs to be public)

## Architecture

### System Design

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
         │ HTTPS
         │
    ┌────▼─────┐
    │  Vercel  │ (Frontend - React SPA)
    │  CDN     │
    └────┬─────┘
         │
         │ API Calls (REST)
         │
    ┌────▼─────┐
    │  Vercel  │ (Backend - Express Serverless)
    │  Edge    │
    └────┬─────┘
         │
         │ Firebase Admin SDK
         │
    ┌────▼─────────┐
    │   Firebase    │
    │   Firestore   │ (NoSQL Database)
    └───────────────┘
         │
         │ Authentication
         │
    ┌────▼─────────┐
    │   Firebase    │
    │     Auth      │ (Google OAuth)
    └───────────────┘
```

### Data Flow

1. **Public User Flow**:
   - User visits website → Vercel CDN serves React app
   - React app fetches data → Backend API on Vercel Edge
   - Backend queries Firestore → Returns data to frontend
   - Frontend renders data with animations

2. **Admin Flow**:
   - Admin logs in → Google OAuth via Firebase
   - Firebase returns token → Stored in localStorage
   - Admin makes changes → Backend verifies JWT token
   - Backend updates Firestore → Returns success/error
   - Frontend shows notification

3. **Currency Conversion Flow**:
   - User visits pricing page → Detects location via IP
   - Fetches exchange rates → exchangerate-api.com
   - Converts prices from USD → User's local currency
   - Applies smart rounding → Displays clean prices

### Key Design Decisions

1. **Serverless Architecture**: Vercel serverless functions for zero-config deployment and automatic scaling

2. **Firestore over SQL**: NoSQL for flexible schema, real-time updates, and seamless Firebase integration

3. **JWT + Firebase Auth**: Combined approach for secure API while leveraging Google OAuth

4. **Smart Rounding**: Prices round to nearest 100 for professional appearance across all currencies

5. **Sorting**: Pricing plans sorted low-to-high for better user experience

6. **In-Memory to Firestore Migration**: Critical fix for serverless environment - memory doesn't persist across function invocations

## Security

### Authentication & Authorization

- **Google OAuth**: Secure third-party authentication
- **JWT Tokens**: Stateless authentication for API requests
- **Email Whitelist**: Admin access restricted to specific email (mirfaizan8803@gmail.com)
- **Protected Routes**: Client-side route protection
- **Middleware Verification**: Server-side JWT verification for all admin endpoints

### Firestore Security Rules

- **Public Read**: All collections readable by anyone
- **Admin Write**: Only authenticated admin can write
- **Function-based Rules**: Centralized admin check function
- **Email Verification**: Admin status based on token email

### API Security

- **Helmet**: HTTP security headers
- **CORS**: Cross-origin resource sharing configured for known domains
- **Environment Variables**: Sensitive data in .env files (not in git)
- **Input Validation**: Request body validation in controllers
- **Error Handling**: Generic error messages to prevent information leakage

### Best Practices

1. Never commit `.env` files
2. Rotate JWT secrets regularly
3. Use HTTPS in production (Vercel handles this)
4. Keep dependencies updated
5. Review Firestore security rules periodically
6. Monitor Firebase usage and set budget alerts

## Currency System

### Supported Currencies

12 major world currencies with auto-detection:

| Code | Symbol | Name | Flag |
|------|--------|------|------|
| USD | $ | US Dollar | 🇺🇸 |
| EUR | € | Euro | 🇪🇺 |
| GBP | £ | British Pound | 🇬🇧 |
| INR | ₹ | Indian Rupee | 🇮🇳 |
| JPY | ¥ | Japanese Yen | 🇯🇵 |
| AUD | A$ | Australian Dollar | 🇦🇺 |
| CAD | C$ | Canadian Dollar | 🇨🇦 |
| CHF | CHF | Swiss Franc | 🇨🇭 |
| CNY | ¥ | Chinese Yuan | 🇨🇳 |
| AED | د.إ | UAE Dirham | 🇦🇪 |
| PHP | ₱ | Philippine Peso | 🇵🇭 |
| IDR | Rp | Indonesian Rupiah | 🇮🇩 |

### Features

- **Auto-Detection**: Uses ipapi.co to detect user location
- **Live Rates**: Fetches real-time rates from exchangerate-api.com
- **Caching**: 1-hour cache to reduce API calls
- **Smart Rounding**: Rounds to nearest 100 for all currencies
- **Fallback**: Default base rates if API fails

### Implementation

All prices stored in USD in database. Frontend converts to user's currency:

```javascript
// Convert and format
const priceInUSD = 100;
const userCurrency = 'INR';
const exchangeRate = 83.12;

const convertedPrice = priceInUSD * exchangeRate; // 8312
const roundedPrice = Math.round(convertedPrice / 100) * 100; // 8300
const formatted = '₹8,300'; // Final display
```

## Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly
5. Commit with clear messages (`git commit -m 'Add some AmazingFeature'`)
6. Push to your branch (`git push origin feature/AmazingFeature`)
7. Open a pull request

## License

This project is private and proprietary. All rights reserved by Mir Faizan (NxY).

## Contact

**Mir Faizan (NxY)**
- Email: mirfaizan8803@gmail.com
- GitHub: [@mirfaizan8803](https://github.com/mirfaizan8803)
- Website: https://client-the-nxt-lvls-projects.vercel.app

## Acknowledgments

- React team for the amazing framework
- Vercel for seamless deployment
- Firebase for backend infrastructure
- Framer Motion for beautiful animations
- Tailwind CSS for utility-first styling
- All open-source contributors

---

**Built with ❤️ by Mir Faizan (NxY)**

*Last Updated: November 3, 2025*
