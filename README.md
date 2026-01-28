# 🚀 Collaborative Task Management App

A modern, real-time collaborative task management application built with React, TypeScript, Tailwind CSS, and Firebase.

![Task Management App](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.x-orange)

## ✨ Features

### 🔐 Authentication

- Email/Password authentication
- Google OAuth integration
- Protected routes for authenticated users
- User profile management

### 📋 Task Management

- Create, edit, and delete tasks
- Organize tasks by status (To Do, In Progress, Done)
- Set task priorities (Low, Medium, High)
- Add due dates to tasks
- Assign tasks to team members

### 🤝 Collaboration

- Real-time updates using Firestore listeners
- Multiple users can view and update tasks simultaneously
- Comment system for team discussions on tasks
- Live task status updates

### 🎨 UI/UX

- Responsive design with Tailwind CSS
- Kanban-style board layout
- Clean and intuitive interface
- Mobile-friendly design

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Backend/Database**: Firebase (Firestore)
- **Authentication**: Firebase Auth
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Hosting**: Vercel / Netlify / Firebase Hosting

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Firebase account

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd Task-Management-App
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new Firebase project
3. Enable Authentication:
   - Go to **Authentication** > **Sign-in method**
   - Enable **Email/Password**
   - Enable **Google** (optional)
4. Create Firestore Database:
   - Go to **Firestore Database** > **Create database**
   - Start in **test mode** (you can configure rules later)
5. Get your Firebase configuration:
   - Go to **Project Settings** > **General**
   - Scroll down to **Your apps** section
   - Click on **Web** icon to add a web app
   - Copy the Firebase configuration

### Step 4: Environment Variables

1. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

1. Add your Firebase configuration to `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

### Step 5: Firestore Security Rules

Configure Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write tasks
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow authenticated users to read and write comments
    match /comments/{commentId} {
      allow read, write: if request.auth != null;
    }
    
    // Allow users to read user profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

### Step 6: Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

## 🚀 Deployment

### Option 1: Deploy to Vercel

1. Install Vercel CLI:

```bash
npm install -g vercel
```

1. Deploy:

```bash
vercel
```

1. Add environment variables in Vercel Dashboard:
   - Go to your project settings
   - Add all `VITE_FIREBASE_*` variables

### Option 2: Deploy to Netlify

1. Install Netlify CLI:

```bash
npm install -g netlify-cli
```

1. Build and deploy:

```bash
npm run build
netlify deploy --prod
```

1. Add environment variables in Netlify Dashboard:
   - Go to Site settings > Environment variables
   - Add all `VITE_FIREBASE_*` variables

### Option 3: Deploy to Firebase Hosting

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```

1. Login to Firebase:

```bash
firebase login
```

1. Initialize Firebase Hosting:

```bash
firebase init hosting
```

- Select your Firebase project
- Use `dist` as the public directory
- Configure as a single-page app: **Yes**
- Don't overwrite `dist/index.html`

1. Build and deploy:

```bash
npm run build
firebase deploy
```

## 📁 Project Structure

```
Task-Management-App/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── CommentsModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── TaskCard.tsx
│   │   └── TaskModal.tsx
│   ├── contexts/        # React contexts
│   │   └── AuthContext.tsx
│   ├── hooks/           # Custom hooks
│   │   ├── useComments.ts
│   │   └── useTasks.ts
│   ├── pages/           # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   └── SignUp.tsx
│   ├── services/        # Firebase services
│   │   ├── authService.ts
│   │   ├── commentService.ts
│   │   ├── firebase.ts
│   │   └── taskService.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.tsx         # Entry point
├── .env.example         # Example environment variables
├── .gitignore           # Git ignore file
├── firebase.json        # Firebase configuration
├── netlify.toml         # Netlify configuration
├── vercel.json          # Vercel configuration
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🔑 Key Features Explained

### Real-time Collaboration

The app uses Firestore's real-time listeners to ensure all users see updates instantly. When one user creates, updates, or deletes a task, all other users viewing the dashboard will see the changes immediately.

### Task Organization

Tasks are organized in a Kanban-style board with three columns:

- **To Do**: New tasks that haven't been started
- **In Progress**: Tasks currently being worked on
- **Done**: Completed tasks

### Comment System

Each task has a dedicated comment section where team members can discuss the task, ask questions, or provide updates. Comments are also real-time and support multiple users.

### Security

- All routes except login/signup require authentication
- Firestore security rules ensure users can only access their data
- Environment variables keep Firebase credentials secure

## 🎯 Usage

1. **Sign Up/Login**: Create an account or login with email/password or Google
2. **Create Tasks**: Click "New Task" button to create a new task
3. **Manage Tasks**:
   - Click on a task to edit it
   - Use the status buttons to move tasks between columns
   - Set priority levels and due dates
   - Delete tasks using the menu
4. **Collaborate**: Add comments to tasks to discuss with team members
5. **Track Progress**: View all tasks organized by status on the dashboard

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- ESLint for code quality

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React Team for the amazing framework
- Firebase Team for the backend infrastructure
- Tailwind CSS for the utility-first CSS framework
- Vite for the blazing fast build tool

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Firebase**
