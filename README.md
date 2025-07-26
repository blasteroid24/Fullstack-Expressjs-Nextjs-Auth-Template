# Fullstack Admin Dashboard (Express + Next.js)

A secure and modern admin dashboard built using:

-  **Backend**: Express.js + MySQL + Prisma + JWT Auth
- **Frontend**: Next.js 14 App Router + Redux Toolkit + TailwindCSS
- Admin authentication with protected routes
- Error logs viewer for backend diagnostics
- Modular and scalable structure

---

##  Getting Started

### Prerequisites

- Node.js (v18+)
- MySQL Database

---

### 🧪 Development Setup

#### 1. Clone the repo:

```bash
git clone https://github.com/blasteroid24/Fullstack-expressjs-nextjs-auth-template.git



# For backend
cd backend
npm install

# For frontend
cd frontend
npm install
```

## Configure environment variables backend
DATABASE_URL=mysql://user:pass@localhost:3306/dbname
JWT_SECRET=your_jwt_secret
PORT=5000
HOST=localhost
FRONTEND_URL = http://localhost:3000
NODE_ENV = development

frontend/.env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000


## Primsa Setup
-Navigate to the backend
cd backend

-Initialize Prisma (already done if schema.prisma exists)
npx prisma init

-Generate Prisma client
npx prisma generate

-Run migrations to create tables
npx prisma migrate dev --name init



# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev