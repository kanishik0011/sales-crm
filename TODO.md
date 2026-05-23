# TODO - Deployment (Render + Vercel) + Auth Fix

## Step 1: Normalize frontend API env handling
- [x] Update `client/src/context/AuthContext.jsx` so `VITE_API_URL` is backend origin only and code builds `/api`.
- [x] Confirm `client/src/hooks/useApi.js` uses `${API_URL}${endpoint}` where `API_URL` already ends with `/api`.

## Step 2: Validate local runtime (after env normalization)
- [ ] Start backend: `cd server && npm start`
- [ ] Verify: `GET http://localhost:5000/health` returns `Server is running`
- [ ] Start frontend: `cd client && npm run dev`
- [ ] Verify login works end-to-end.

## Step 3: Render backend deployment
- [ ] Deploy backend from `/server` with `npm start`
- [ ] Set env vars on Render: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` (Vercel origin), `PORT=5000`.

## Step 4: Vercel frontend deployment
- [ ] Deploy frontend from `/client` with `npm run build`
- [ ] Set env var on Vercel: `VITE_API_URL=https://<your-render-domain>.onrender.com`

## Step 5: Final validation
- [ ] Open deployed Vercel frontend URL and verify login + dashboard.

