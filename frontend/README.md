# Chatify - Real-time Chat App

React + Vite frontend with Node.js/Express/Socket.io backend.

## Quick Start

```bash
npm install
npm run dev # backend
# Frontend: cd frontend && npm run dev
```

## Production Build & Start

```bash
npm run build  # Builds frontend to backend/../frontend/dist
npm start      # Starts backend (serves frontend in prod)
```

## Deployment to Render

### Backend Service (Web Service, Port 10000)

1. Connect GitHub repo
2. Build Command: `npm install && npm install --prefix frontend && npm run build --prefix frontend`
3. Start Command: `npm start`
4. ENV Vars (from .env.example):
   - PORT=10000
   - MONGO_URI=...
   - JWT_SECRET=...
   - NODE_ENV=production
   - CLIENT_URL=https://your-frontend-domain.onrender.com
   - RESEND_API_KEY=...
   - All others...

### Frontend Static Site

1. New Static Site
2. Build Command: `npm install && npm run build`
3. Publish Directory: `dist`
4. ENV: VITE_API_URL=https://your-backend-service.onrender.com/api

**Note:** Deploy backend first, get URL, set as VITE_API_URL for frontend.

## Features

- Real-time messaging with Socket.io
- Auth (JWT cookies)
- Avatar upload (Cloudinary)
- Welcome emails (Resend)
- Keyboard sounds
- Responsive UI (Tailwind/DaisyUI)

## Troubleshooting

- Ensure MongoDB Atlas IP whitelist allows 0.0.0.0/0 for Render
- Check Render logs for env var issues
