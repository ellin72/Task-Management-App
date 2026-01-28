# Firebase Setup Guide

This guide will walk you through setting up Firebase for your Task Management App.

## Prerequisites

- A Google account
- Basic understanding of Firebase Console

## Step-by-Step Firebase Configuration

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "task-management-app")
4. (Optional) Enable Google Analytics
5. Click "Create project"

### 2. Set Up Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable"
   - Click "Save"

4. Enable **Google Sign-In** (Optional):
   - Click on "Google"
   - Toggle "Enable"
   - Select a support email
   - Click "Save"

### 3. Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Select a location closest to your users
5. Click "Enable"

### 4. Configure Firestore Security Rules

1. In Firestore Database, click on the "Rules" tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Tasks collection
    match /tasks/{taskId} {
      // Allow read and write for authenticated users
      allow read, write: if request.auth != null;
    }
    
    // Comments collection
    match /comments/{commentId} {
      // Allow read and write for authenticated users
      allow read, write: if request.auth != null;
    }
    
    // Users collection (optional, for future use)
    match /users/{userId} {
      // Anyone authenticated can read
      allow read: if request.auth != null;
      // Only the user themselves can write their own data
      allow write: if request.auth.uid == userId;
    }
  }
}
```

1. Click "Publish"

### 5. Get Firebase Configuration

1. Click the gear icon ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register your app:
   - Enter an app nickname (e.g., "Task Management Web App")
   - (Optional) Check "Also set up Firebase Hosting"
   - Click "Register app"

6. Copy the Firebase configuration object:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

### 6. Add Configuration to Your App

1. Create a `.env` file in your project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

1. Replace the values with your actual Firebase config values

### 7. Configure Authorized Domains (For Deployment)

When you deploy your app, you need to authorize the domain:

1. Go to Firebase Console > Authentication > Settings
2. Scroll to "Authorized domains"
3. Click "Add domain"
4. Add your deployment domain (e.g., `your-app.vercel.app`)

## Testing Your Setup

1. Start your development server:

```bash
npm run dev
```

1. Try to sign up with email/password
2. Create a task
3. Check if the task appears in Firestore:
   - Go to Firestore Database
   - You should see a "tasks" collection with your task

## Security Best Practices

### Production Rules

For production, consider more restrictive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isSignedIn() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the document
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    match /tasks/{taskId} {
      // Users can read all tasks
      allow read: if isSignedIn();
      
      // Users can create tasks
      allow create: if isSignedIn() && 
                       request.resource.data.createdBy == request.auth.uid;
      
      // Users can update tasks they created or are assigned to
      allow update: if isSignedIn() && 
                       (resource.data.createdBy == request.auth.uid ||
                        request.auth.uid in resource.data.assignedTo);
      
      // Only task creator can delete
      allow delete: if isSignedIn() && 
                       resource.data.createdBy == request.auth.uid;
    }
    
    match /comments/{commentId} {
      // Users can read all comments
      allow read: if isSignedIn();
      
      // Users can create comments
      allow create: if isSignedIn() && 
                       request.resource.data.userId == request.auth.uid;
      
      // Only comment author can update/delete
      allow update, delete: if isSignedIn() && 
                               resource.data.userId == request.auth.uid;
    }
  }
}
```

### Environment Variables Security

- Never commit `.env` files to version control
- Use different Firebase projects for development and production
- Rotate API keys periodically
- Monitor Firebase Usage & Billing dashboard

## Firestore Indexes

For better performance with complex queries, you may need to create indexes:

1. Go to Firestore Database > Indexes
2. Firebase will suggest indexes based on your queries
3. Click "Create index" when prompted

Common indexes for this app:

- Collection: `tasks`, Fields: `createdAt` (Descending)
- Collection: `comments`, Fields: `taskId` (Ascending), `createdAt` (Ascending)

## Monitoring and Analytics

### Enable Firebase Analytics

1. Go to Project Settings > Integrations
2. Enable Google Analytics
3. Follow the setup wizard

### Monitor Usage

1. Go to "Usage and billing" in Firebase Console
2. Monitor:
   - Authentication sign-ins
   - Firestore reads/writes
   - Storage usage

### Set Budget Alerts

1. Go to "Usage and billing"
2. Click "Details & settings"
3. Set up budget alerts to avoid unexpected costs

## Troubleshooting

### Common Issues

**Issue**: "Firebase: Error (auth/configuration-not-found)"

- **Solution**: Check that you've enabled Email/Password authentication in Firebase Console

**Issue**: "Missing or insufficient permissions"

- **Solution**: Check your Firestore security rules and ensure you're authenticated

**Issue**: "API key not valid"

- **Solution**: Verify your `.env` file has the correct Firebase configuration

**Issue**: "Domain not authorized"

- **Solution**: Add your domain to Authorized domains in Authentication settings

### Getting Help

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Support](https://firebase.google.com/support)
- [Stack Overflow - Firebase Tag](https://stackoverflow.com/questions/tagged/firebase)

## Next Steps

- Set up [Firebase Hosting](https://firebase.google.com/docs/hosting) for deployment
- Enable [Firebase Performance Monitoring](https://firebase.google.com/docs/perf-mon)
- Implement [Firebase Cloud Functions](https://firebase.google.com/docs/functions) for backend logic
- Add [Firebase Storage](https://firebase.google.com/docs/storage) for file uploads

---

**Need more help?** Check out the [Firebase Documentation](https://firebase.google.com/docs) or the project README.md
