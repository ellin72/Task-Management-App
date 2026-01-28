# Quick Deployment Guide

## Prerequisites

Before deploying, make sure you have:

1. Created a `.env` file with your Firebase configuration
2. Built the project successfully (`npm run build`)
3. Tested the application locally

## Deployment Options

### 1. Vercel (Recommended for Quick Deploy)

**Using Vercel Website:**

1. Visit [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables in Project Settings
4. Deploy!

**Using Vercel CLI:**

```bash
npm install -g vercel
vercel login
vercel
```

### 2. Netlify

**Using Netlify Website:**

1. Visit [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder after building
3. Add environment variables in Site Settings

**Using Netlify CLI:**

```bash
npm install -g netlify-cli
npm run build
netlify login
netlify deploy --prod
```

### 3. Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Environment Variables

Make sure to add these environment variables in your hosting platform:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Troubleshooting

### Build Errors

- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Verify environment variables are set

### Authentication Not Working

- Check Firebase console for enabled authentication methods
- Verify authorized domains in Firebase Authentication settings
- Ensure environment variables are correctly set

### Real-time Updates Not Working

- Verify Firestore rules are properly configured
- Check browser console for errors
- Ensure Firebase configuration is correct

## Post-Deployment

1. Add your deployment URL to Firebase authorized domains:
   - Go to Firebase Console > Authentication > Settings
   - Add your domain to "Authorized domains"

2. Test all features:
   - User registration and login
   - Task creation, editing, and deletion
   - Real-time updates
   - Comments functionality

3. Monitor your application:
   - Check Firebase Usage & Billing
   - Monitor Firestore reads/writes
   - Review authentication logs
