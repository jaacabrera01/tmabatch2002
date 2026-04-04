# Reunion App - Backend Setup Guide

Your Reunion app now uses a **simple Node.js backend** for shared data across all users!

## How It Works

✅ **All survey responses** are stored on the server (JSON file)  
✅ **All photos** are stored on the server (JSON file)  
✅ **Real-time sync** - Results update automatically every 2-3 seconds  
✅ **Shared link** - Everyone sees the same data  
✅ **Simple** - No database setup needed

## Quick Start

### Step 1: Start the Server

In the terminal, run:
```bash
npm run server
```

You should see:
```
🚀 Reunion API server running on http://localhost:3001
📊 Surveys: http://localhost:3001/api/surveys
📸 Photos: http://localhost:3001/api/photos
```

### Step 2: Open Another Terminal and Start the Client

In a new terminal tab, run:
```bash
npm run dev
```

Visit: `http://localhost:5173`

### Or Run Both Together

Run this single command to start both server and client:
```bash
npm run dev:full
```

## Data Storage

- **Surveys** stored in: `data/surveys.json`
- **Photos** stored in: `data/photos.json`

Both files are automatically created when you submit data.

## How to Share the Link

1. **Locally (same WiFi):**
   - Get your machine's IP: `ipconfig getifaddr en0` (macOS) or `hostname -I` (Linux)
   - Share: `http://YOUR_IP:5173`

2. **Remote (different networks):**
   - Deploy to a server (Render, Vercel, Railway, etc.)
   - Share: `https://your-app.com`

## Features

### Survey Results
- Automatically updates when new surveys arrive
- Shows real-time statistics
- Export to Excel button

### Photo Gallery
- Upload photos with captions
- Photos are synced across all devices
- Delete photos anytime

### Excel Export
- Download all data as Excel file
- Includes survey responses and photo metadata
- Filename: `reunion-data-export-YYYY-MM-DD.xlsx`

## Clearing Data

To start fresh, delete the data folder:
```bash
rm -rf data/
```

Then restart the server.

## API Endpoints

### Surveys
- `GET /api/surveys` - Get all surveys
- `POST /api/surveys` - Submit new survey
- `DELETE /api/surveys/:id` - Delete survey

### Photos
- `GET /api/photos` - Get all photos
- `POST /api/photos` - Upload photo
- `DELETE /api/photos/:id` - Delete photo

### Health
- `GET /api/health` - Check server status

## Troubleshooting

### "Connection refused" error
- Make sure server is running: `npm run server`
- Server should be on `http://localhost:3001`

### Photos not showing
- Server must be running
- Check `data/photos.json` exists
- Refresh the page

### Results not updating
- Results auto-refresh every 3 seconds
- Check browser console (F12) for errors
- Verify server is responding: `curl http://localhost:3001/api/health`

## Deployment (Optional)

To deploy online:

1. **Render.com (Recommended)**
   - Push code to GitHub
   - Connect repository to Render
   - Deploy as Node.js service

2. **Vercel**
   - Frontend: Deploy in Vercel
   - Backend: Deploy server separately on Railway or Render

3. **Local network**
   - Keep running locally
   - Share IP address with others on same WiFi

## Need Help?

Check the server logs in your terminal for errors. The server logs all requests and issues.

Happy surveying! 🎉
