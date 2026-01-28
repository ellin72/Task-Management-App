# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Set Up Firebase

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Email/Password** and **Google** authentication
3. Create a **Firestore Database** (start in test mode)
4. Get your Firebase config from Project Settings

### Step 3: Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 4: Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` and start managing tasks! 🎉

## 🔥 Firestore Security Rules

Add these rules in Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
    match /comments/{commentId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 📚 Next Steps

- Check out the [README.md](README.md) for detailed documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
- Start creating tasks and invite your team!

## ⚡ Quick Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🆘 Having Issues?

Common solutions:

1. **Build errors**: Run `npm install` again
2. **Firebase not working**: Check your `.env` file
3. **Authentication errors**: Enable auth methods in Firebase Console
4. **Can't see updates**: Check Firestore rules

For more help, check the README or open an issue!
