# 2027 Reunion Survey App

A cross-platform reunion survey application built with React, compatible with iOS, Android, and all browsers.

## Features

✅ **Cross-Platform**: Works on web, iOS (PWA), and Android (PWA)  
✅ **Mobile-Optimized**: Beautiful responsive design  
✅ **Easy to Use**: Simple survey form for reunion attendance and planning  
✅ **Data Storage**: Stores responses locally (can be upgraded to Firebase)  
✅ **No Backend Required**: Pure frontend solution  

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
npm build
```

The optimized build will be in the `dist` folder.

## Survey Fields

- **Full Name** (required)
- **Email Address** (required)
- **Attendance Status** - Yes/Maybe/No (required)
- **Number of Guests** - Planning for how many people
- **Dietary Restrictions** - Allergies and preferences
- **Suggestions** - Ideas for the reunion

## Data Storage

Currently, responses are stored in **localStorage** (browser storage). This means:
- Data persists on the same device/browser
- Perfect for testing and small deployments
- Not synced across devices

### Upgrade to Firebase (Optional)

To sync data across devices and have a central database:

1. Create a Firebase project at https://firebase.google.com
2. Get your Firebase config
3. Update `src/services/surveyService.js` to use Firebase instead of localStorage

## Deployment

### Web (Netlify, Vercel, etc.)

```bash
npm run build
# Deploy the 'dist' folder to your hosting service
```

### PWA Installation

The app is PWA-enabled. On mobile:
1. Open the survey URL in your browser
2. Tap the share button
3. Select "Add to Home Screen"
4. The app will work like a native app!

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool
- **CSS3** - Styling with gradients and animations
- **LocalStorage** - Client-side data persistence

## Next Steps

- [ ] Add Firebase integration for cloud storage
- [ ] Create admin dashboard to view responses
- [ ] Add email notifications for new submissions
- [ ] Customize colors and branding
- [ ] Add more survey questions as needed
