# Reunion App - Local Storage with Excel Export

Your Reunion app is now set up with **localStorage** for simple data storage and **Excel export** functionality. Here's how it works:

## How Data is Stored

✅ **All data is stored locally** on your device/browser using localStorage  
✅ **No account needed** - no Firebase, no backend  
✅ **Works offline** - data persists even without internet  
✅ **Private** - data stays on your device  

## Using the App

### 1. **Survey Page**
- Click **"Start Survey"** to open the survey form
- Fill in your information and submit
- Responses are saved to localStorage instantly

### 2. **Results Page**
- Click **"Results"** to see survey statistics
- You'll see charts for month preferences, venue choices, and section distribution
- An **📥 Export** button is in the top right

### 3. **Gallery Page**
- Click **"Gallery"** to upload and view photos
- Upload photos with optional captions
- Photos are stored locally as Base64 (no file upload needed)

## Exporting Data to Excel

### **Export All Data**
1. Go to **Results** page
2. Click **📥 Export** button (top right)
3. This downloads a single Excel file with:
   - **Survey Responses** sheet - all responses with timestamps
   - **Photo Metadata** sheet - photo captions, dates, uploader info

### **File Format**
The exported Excel file includes:
- Survey responses with all fields (Name, Email, Attendance, Preferences, etc.)
- Photo metadata (Caption, Upload Date/Time)
- Filename: `reunion-data-export-YYYY-MM-DD.xlsx`

## Clearing Your Data

If you need to start fresh:

1. **Open DevTools** (F12 or Cmd+Option+I)
2. Go to **Application** tab
3. Click **Local Storage** → `http://localhost:5174` (or your port)
4. Delete these keys:
   - `surveyResponses`
   - `galleryPhotos`
5. Refresh the page

Or use the **Clear Site Data** option in browser settings.

## Data Limits

- **Everything is stored locally** - no cloud sync
- **Max storage:** ~5-10 MB per browser
- **Different browsers = Different data** (use same browser or export/import)
- **No backup** - export to Excel if you want to backup

## Best Practices

1. **Export regularly** to have backups of your responses
2. **Use the same browser** where you collected data
3. **Keep your Excel exports** as permanent backups
4. **Test locally first** before sharing the link with others (they'll see empty data on their device)

## Sharing with Others

Since data is local:
- ✅ Share the **app link** - they can fill surveys on their device
- ✅ Share the **Excel export** - they get all previous responses
- ❌ They won't see real-time updates (not synced)

To collect responses across multiple devices:
1. Have each person fill surveys locally
2. Export their Excel file
3. Combine all Excel files (manual merge in Excel)

## Need to Sync Across Devices?

If you need real-time syncing across devices in the future, you can upgrade to Firebase (cloud storage) - just let me know!

---

**Happy surveying! 🎉**
