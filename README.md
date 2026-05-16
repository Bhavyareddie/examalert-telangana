# ExamAlert Telangana

Smart competitive exam discovery and alert platform for Telangana students.

## Live Stack (Free Tier)
- **Frontend**: Vercel (Next.js)
- **Backend**: Render (Node.js/Express)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email + Google)
- **Storage**: Supabase Storage (PDFs)
- **CDN**: Cloudflare
- **AI**: Google Gemini API (free tier)

## Quick Start

### Prerequisites
- Node.js 18+
- Git account
- Supabase account (free)
- Vercel account (free)
- Render account (free)

### 1. Clone & Install
```bash
git clone <your-repo>
cd examalert-telangana

# Install frontend
cd frontend && npm install

# Install backend
cd ../backend && npm install
```

### 2. Environment Setup
```bash
# frontend/.env.local
cp frontend/.env.example frontend/.env.local

# backend/.env
cp backend/.env.example backend/.env
```

### 3. Database Setup
- Create Supabase project at supabase.com
- Run migrations from `backend/migrations/001_init.sql`

### 4. Run Locally
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for full production deployment guide.
