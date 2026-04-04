import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3001

// Data files
const SURVEYS_FILE = path.join(__dirname, 'data', 'surveys.json')
const PHOTOS_FILE = path.join(__dirname, 'data', 'photos.json')

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))

// Helper functions
const ensureDataFolder = () => {
  const dataDir = path.join(__dirname, 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

const readSurveys = () => {
  try {
    if (fs.existsSync(SURVEYS_FILE)) {
      const data = fs.readFileSync(SURVEYS_FILE, 'utf-8')
      return JSON.parse(data)
    }
    return []
  } catch (err) {
    console.error('Error reading surveys:', err)
    return []
  }
}

const writeSurveys = (data) => {
  try {
    ensureDataFolder()
    fs.writeFileSync(SURVEYS_FILE, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Error writing surveys:', err)
  }
}

const readPhotos = () => {
  try {
    if (fs.existsSync(PHOTOS_FILE)) {
      const data = fs.readFileSync(PHOTOS_FILE, 'utf-8')
      return JSON.parse(data)
    }
    return []
  } catch (err) {
    console.error('Error reading photos:', err)
    return []
  }
}

const writePhotos = (data) => {
  try {
    ensureDataFolder()
    fs.writeFileSync(PHOTOS_FILE, JSON.stringify(data, null, 2))
  } catch (err) {
    console.error('Error writing photos:', err)
  }
}

// API Routes

// GET all survey responses
app.get('/api/surveys', (req, res) => {
  try {
    const surveys = readSurveys()
    res.json(surveys)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch surveys' })
  }
})

// POST new survey response
app.post('/api/surveys', (req, res) => {
  try {
    const surveys = readSurveys()
    
    // Add new survey with timestamp and ID
    const newSurvey = {
      id: Date.now().toString(),
      ...req.body,
      timestamp: new Date().toISOString()
    }
    
    surveys.push(newSurvey)
    writeSurveys(surveys)
    
    res.json(newSurvey)
  } catch (error) {
    console.error('Error submitting survey:', error)
    res.status(500).json({ error: 'Failed to submit survey' })
  }
})

// DELETE survey response
app.delete('/api/surveys/:id', (req, res) => {
  try {
    const surveys = readSurveys()
    const filtered = surveys.filter(s => s.id !== req.params.id)
    writeSurveys(filtered)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete survey' })
  }
})

// GET all photos (without Base64 data to save bandwidth)
app.get('/api/photos', (req, res) => {
  try {
    const photos = readPhotos()
    // Return with data for client-side display
    res.json(photos)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch photos' })
  }
})

// POST new photo
app.post('/api/photos', (req, res) => {
  try {
    const photos = readPhotos()
    
    const newPhoto = {
      id: Date.now().toString(),
      data: req.body.data,
      caption: req.body.caption || '',
      timestamp: new Date().toISOString(),
      uploader: req.body.uploader || 'Anonymous'
    }
    
    photos.push(newPhoto)
    writePhotos(photos)
    
    res.json(newPhoto)
  } catch (error) {
    console.error('Error uploading photo:', error)
    res.status(500).json({ error: 'Failed to upload photo' })
  }
})

// DELETE photo
app.delete('/api/photos/:id', (req, res) => {
  try {
    const photos = readPhotos()
    const filtered = photos.filter(p => p.id !== req.params.id)
    writePhotos(filtered)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete photo' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Reunion API server running on http://localhost:${PORT}`)
  console.log(`📊 Surveys: http://localhost:${PORT}/api/surveys`)
  console.log(`📸 Photos: http://localhost:${PORT}/api/photos`)
})
