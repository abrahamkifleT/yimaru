# Yimaru — AI-Powered English Learning Platform

A monorepo containing the **frontend** (React + Vite) and **backend** (Node.js + Express) for the Yimaru platform.

## 📂 Project Structure

```
yimaru/
├── frontend/          ← React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│ther
└── backend/           ← Node.js + Express REST API
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   └── routes/
    └── package.json
```

## 🚀 Getting Started

### 1. Start the Backend
```bash
cd backend
npm install
npm run dev
# → Runs on http://localhost:5000
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
# → Runs on http://localhost:5173
```

## 🔌 API Endpoints

| Method | Endpoint             | Auth     | Description              |
|--------|----------------------|----------|--------------------------|
| POST   | /api/auth/login      | Public   | Login, returns JWT token |
| GET    | /api/auth/me         | 🔒 JWT   | Get current user info    |
| POST   | /api/chat            | 🔒 JWT   | Send AI tutor message    |
| GET    | /api/chat/history    | 🔒 JWT   | Fetch chat history       |
| GET    | /api/health          | Public   | Server health check      |

## 🏗️ Tech Stack

| Layer     | Technology            |
|-----------|-----------------------|
| Frontend  | React 19, Vite, Tailwind CSS, React Router |
| Backend   | Node.js, Express, JWT, bcrypt |
| Auth      | JWT Bearer tokens (7d expiry) |

## 🔑 Demo Credentials
- **Email:** `abraham@yimaru.com`
- **Password:** `demo123`
