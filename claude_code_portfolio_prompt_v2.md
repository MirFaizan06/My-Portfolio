# 🚀 Claude Code — Portfolio Website Fullstack Project Initialization Prompt

## 🎯 Project Goal
You are an elite fullstack developer assistant. Your task is to create a **personal portfolio website** for user **NxY (Mir Faizan)** that is **modern, fast, dynamic, and professionally artistic**.

---

## 🧠 Before You Start
Before writing any code, **ask the user** (Mir Faizan) relevant questions about:
1. Preferred color palette (for both dark and light themes).
2. Font preferences (if unknown, choose beautiful, modern typography).
3. Hosting platform (Firebase Hosting, Vercel, or custom).
4. Domain setup (custom or temporary).
5. Whether to seed sample projects and pricing data initially.

Once clarified, begin full development automatically **in the current folder**.

---

## 🏗️ Project Overview

### 🖥️ Website Features
- **Pages**:
  - Home (About Me + What I Do)
  - Projects (Client + Personal)
  - Pricing (Dynamic from backend)
  - Resume (Download CV PDF from Firebase Storage)
  - Contact Me (form + mail handler)
  - “Buy Me a Coffee” (future-ready placeholder)

- **Themes**:
  - **Light Mode** → professional, minimalistic corporate look
  - **Dark Mode** → game-inspired, futuristic neon/glow accents

- **UI Requirements**:
  - Use **React.js (Vite)** + **TailwindCSS v4** (`@theme` & `@import` style, no config/postcss).
  - Use **Framer Motion** for animations.
  - Use **Lucide React** icons.
  - Use **Chart.js** for visual growth analytics.
  - Modern, clean, responsive, mobile-first layout.

---

## ⚙️ Backend Setup (Minimal)
- Stack: **Express.js + Node.js + Firebase + JWT + Bcrypt + Multer**
- Functions:
  - `/api/projects` → CRUD operations for portfolio projects.
  - `/api/pricing` → CRUD operations for pricing cards.
  - `/api/upload` → upload project images or CVs to Firebase Storage.
  - `/api/auth/google` → Google OAuth (only allow `mirfaizan8803@gmail.com`).
- Auto version control setup with **Git + GitHub**.
- On each commit or release, bump version (e.g., `1.0.1`) and display current version in website footer dynamically via `/api/version`.

---

## 🔐 Admin Panel
- Accessible at `/admin` route.
- Only Google Sign-In allowed.
- Email restriction: Only `mirfaizan8803@gmail.com` can access.
- Features:
  - Dashboard showing total projects, pricing entries, last update time, and version.
  - Add/Edit/Delete projects and pricing dynamically.
  - Upload CV (PDF) to Firebase Storage.
  - Track commit version + last deployment date.

---

## 🪄 Frontend Logic
- Dynamic rendering of all sections from backend (Firebase or Express API).
- Version display in footer: “v1.0.0” initially, auto-updates from backend version file.
- Smooth section transitions with Framer Motion.
- Fully responsive (mobile → 4K).

---

## 📊 Optional Dynamic Charts
- Use Chart.js to visualize personal growth, project count, or coding hours (data stored in backend).
- Animate charts with Framer Motion or custom easing transitions.

---

## 🧰 Tech Stack Summary
**Frontend:**
- React (Vite)
- TailwindCSS v4 (via `@theme` syntax)
- Framer Motion
- Lucide React
- Chart.js
- Firebase SDK (Storage + Auth)

**Backend:**
- Node.js + Express
- Firebase Admin SDK
- JWT + Bcrypt + Multer
- CORS + Helmet for security

**Storage:**
- Firebase Storage (CVs, images)

**Versioning:**
- GitHub repository auto-setup
- Display version number dynamically (from `/api/version`)

---

## 🧩 Development Rules
1. Code must be **production-ready**, modular, and cleanly documented.
2. Maintain consistent styling, typography, and spacing.
3. Optimize for **SEO** and **performance (Lighthouse 90+)**.
4. Use **semantic HTML** and **ARIA attributes** for accessibility.
5. All forms validated (client + server).
6. Fully mobile-responsive.

---

## 🔧 Folder Structure

```
/portfolio-root
 ├── /client              # React frontend (Vite)
 │    ├── src/
 │    │   ├── components/
 │    │   ├── pages/
 │    │   ├── hooks/
 │    │   ├── context/
 │    │   ├── assets/
 │    │   └── utils/
 │    └── index.html
 │
 ├── /server              # Express backend
 │    ├── src/
 │    │   ├── routes/
 │    │   ├── controllers/
 │    │   ├── models/
 │    │   ├── middlewares/
 │    │   └── config/
 │    └── server.ts
 │
 ├── /firebase            # Firebase configs and setup
 │    ├── firebase.js
 │    └── storageRules.txt
 │
 ├── README.md
 └── package.json
```

---

## 🧾 Version Tracking Logic
- Each successful commit → automatically increments version in a `version.json` file (e.g. `{"version": "1.0.1"}`).
- `/api/version` serves this file.
- Frontend footer auto-fetches and displays version.

---

## ☕ “Buy Me a Coffee” Setup (Future Ready)
- Placeholder button now.
- Later integration with BuyMeACoffee API or Stripe.

---

## 📦 Final Deliverables
1. Fully working portfolio website in the same folder.
2. Auto Git setup + version tracking.
3. Admin panel (Google login restricted).
4. Firebase integration for files + auth.
5. Dynamic backend API for projects & pricing.
6. Animated, modern, themed frontend (dark + light).

---

## 🔮 Prompt to Claude
When initialized in VS Code terminal, Claude should:
1. Ask clarifying questions.
2. Then scaffold the **entire project automatically** in the current working folder.
3. Set up Git repository, commits, and version file.
4. Output ready-to-run local commands like:
   ```bash
   cd server && npm run dev
   cd client && npm run dev
   ```
---

**Initial Version:** v1.0.0  
**Author:** Mir Faizan (NxY)
**Email:** mirfaizan8803@gmail.com  
**Goal:** Build the coolest personal portfolio with admin and dynamic content.
