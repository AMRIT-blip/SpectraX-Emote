# SpectraX Emote Controller

Premium web controller with:
- secure login gate
- Vercel-compatible KeyAuth backend route
- emote control interface
- responsive SpectraX-themed UI

## Project Structure

- `index.html` : Main UI
- `style.css` : Full styling
- `script.js` : Frontend logic
- `emotes.js` : Emote data
- `api/auth/login.js` : Vercel serverless function for KeyAuth login
- `.env.example` : Example environment variables

## Important

- Do **not** upload `.env`
- Add secrets only in your hosting dashboard
- This project is prepared for **Vercel**

## Deploy On Vercel

### 1. Upload project to GitHub

Push this project to your GitHub repository.

### 2. Import project into Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Login to your account
3. Click `Add New`
4. Click `Project`
5. Import your GitHub repository

### 3. Add Environment Variables in Vercel

Before deploying, open the project settings in Vercel and add these environment variables:

- `KEYAUTH_APP_NAME=SilentAim-Max`
- `KEYAUTH_OWNER_ID=X9lEcfrIZa`
- `KEYAUTH_APP_VERSION=1.0`
- `KEYAUTH_SECRET=YOUR_KEYAUTH_SECRET`

Use your real KeyAuth secret in Vercel.

### 4. Deploy

After adding env vars:

1. Click `Deploy`
2. Wait for build to complete
3. Open your deployed URL

## After Deploy

1. Open your Vercel site
2. Login page should appear first
3. Enter valid KeyAuth username and password
4. If KeyAuth credentials are correct, dashboard will unlock

## Local Testing

This project is designed mainly for Vercel deployment, but if needed you can still install dependencies locally:

```bash
npm install
```

## Notes

- `api/auth/login.js` handles KeyAuth authentication server-side
- frontend sends login request to `/api/auth/login`
- secrets stay hidden from the browser

## Security Recommendation

If your KeyAuth secret has been shared anywhere publicly, rotate/change it from KeyAuth dashboard before production use.

## Summary

If you want this to work online:

1. Push code to GitHub
2. Import repo in Vercel
3. Add KeyAuth env vars
4. Deploy
5. Test login with valid KeyAuth credentials
