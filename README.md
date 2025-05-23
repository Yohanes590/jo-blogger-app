# 📝 Blogify — A Full-Stack Blog App (Next.js + Node.js + JWT Auth)

Welcome to **Blogify** — my first full-stack blog project built with **Next.js** on the frontend and **Node.js** on the backend. This isn’t just a simple blog. It’s a fully functional, secure app with **JWT authentication**, **OTP email verification**, and **admin-only access control**.

I built this to challenge myself and learn how real web apps are built and secured — and I’m proud to say, it’s 100% complete and ready to share!

---

## 🚀 Live Demo

🌐 [Coming Soon — deployed version]  
🛠️ Backend: [Coming Soon — deployed API]  
📁 Frontend Repo: [https://github.com/Yohanes590/jo-blogger-app)
📁 Backend Repo: [https://github.com/Yohanes590/jo-blogger-app/tree/main/server)

---
![Demo Screenshot](./screen)
## ✨ Key Features

- 🔐 Secure **JWT-based authentication**
- ✉️ **OTP verification** sent to email during admin login
- 🔒 Full **token verification** on every protected endpoint
- 🧠 Clean and structured **admin-only routes**
- 🗞️ Create, update, and manage blog posts
- 📧 Clickable author email under each post (with `mailto:jplussince34@gmail.com` link)

---

## 🛠 Tech Stack

### Frontend (Next.js)
- Next.js 14
- Tailwind CSS (for styling)
- Axios (API calls)
- Cookies for storing JWTs securely

### Backend (Node.js + Express)
- Node.js
- Express.js
- Nodemailer (for OTP emails)
- JWT (Authentication)
- Cookie-parser (JWT storage)
- dotenv (for environment configs)

---

## 📷 Screenshots

> _You can add screenshots here later after deployment or testing locally._

---

## 🧑‍💻 Getting Started

Clone both frontend and backend:

```bash
# Frontend
git clone [https://github.com/Yohanes590/jo-blogger-app.git)
cd blogify-frontend
npm install
npm run dev
