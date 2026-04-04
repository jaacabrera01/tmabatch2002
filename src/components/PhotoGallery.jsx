import { useState, useRef, useEffect } from 'react'
import { submitPhoto, getPhotos, deletePhoto, convertImageToBase64 } from '../services/photoService'
import '../styles/PhotoGallery.css'

export default function PhotoGallery({ onBack, onViewSurvey, onViewResults }) {
  const [photos, setPhotos] = useState([])
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)

  // Load photos on mount
  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true)
      const loadedPhotos = await getPhotos()
      setPhotos(loadedPhotos)
      setLoading(false)
    }
    loadPhotos()
  }, [])

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    try {
      const base64 = await convertImageToBase64(file)
      setSelectedImage(base64)
    } catch (err) {
      alert('Error reading file')
      console.error(err)
    }
  }

  const handleUploadPhoto = async () => {
    if (!selectedImage) {
      alert('Please select an image')
      return
    }

    setUploading(true)
    try {
      await submitPhoto(selectedImage, caption)
      const updatedPhotos = await getPhotos()
      setPhotos(updatedPhotos)
      setSelectedImage(null)
      setCaption('')
      setUploaded(true)
      setTimeout(() => setUploaded(false), 2000)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      alert('Error uploading photo')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleDeletePhoto = async (photoId) => {
    if (window.confirm('Delete this photo?')) {
      try {
        await deletePhoto(photoId)
        const updatedPhotos = await getPhotos()
        setPhotos(updatedPhotos)
      } catch (err) {
        alert('Error deleting photo')
        console.error(err)
      }
    }
  }

  return (
    <div className="app-container gallery-page">
      <header className="app-header-survey">
        <button className="back-button" onClick={onBack}>←</button>
        <h1>Photo Gallery</h1>
      </header>

      <div className="gallery-content">
        <div className="upload-section">
          <h2>Upload Your Reunion Photo</h2>
          
          {selectedImage ? (
            <div className="preview-container">
              <img src={selectedImage} alt="Preview" className="image-preview" />
              <div className="preview-caption">
                <label htmlFor="caption">Add a caption (optional)</label>
                <input
                  type="text"
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g., Having fun at the beach..."
                  className="caption-input"
                />
              </div>
              <div className="preview-actions">
                <button 
                  className="upload-btn"
                  onClick={handleUploadPhoto}
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Upload Photo'}
                </button>
                <button 
                  className="cancel-btn"
                  onClick={() => setSelectedImage(null)}
                  disabled={uploading}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="file-input"
                id="photo-input"
              />
              <label htmlFor="photo-input" className="upload-label">
                <div className="upload-icon">📸</div>
                <p>Click to select a photo</p>
                <span className="file-hint">JPG, PNG (Max 5MB)</span>
              </label>
            </div>
          )}

          {uploaded && (
            <div className="upload-success">
              ✓ Photo uploaded successfully!
            </div>
          )}
        </div>

        <div className="photos-section">
          <h2>Reunion Photos ({photos.length})</h2>
          
          {loading ? (
            <div className="loading">Loading photos...</div>
          ) : photos.length > 0 ? (
            <div className="photos-grid">
              {photos.slice().reverse().map((photo) => (
                <div key={photo.id} className="photo-card">
                  <div className="photo-wrapper">
                    <img src={photo.data} alt="Reunion photo" className="photo-image" />
                    <button
                      className="delete-btn"
                      onClick={() => handleDeletePhoto(photo.id)}
                      title="Delete photo"
                    >
                      ✕
                    </button>
                  </div>
                  {photo.caption && (
                    <p className="photo-caption">{photo.caption}</p>
                  )}
                  <p className="photo-date">
                    {new Date(photo.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-photos">
              <p>No photos yet. Be the first to upload!</p>
            </div>
          )}
        </div>
      </div>

      <div className="gallery-footer">
        <button className="footer-button survey-btn" onClick={onViewSurvey}>
          <svg className="footer-icon survey-icon" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="32" y1="20" x2="32" y2="44" stroke="currentColor" strokeWidth="2"/>
            <line x1="20" y1="32" x2="44" y2="32" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Survey
        </button>
        <button className="footer-button results-btn" onClick={onViewResults}>
          <svg className="footer-icon results-icon" viewBox="0 0 64 64">
            <rect x="8" y="36" width="8" height="20" fill="currentColor"/>
            <rect x="20" y="24" width="8" height="32" fill="currentColor"/>
            <rect x="32" y="12" width="8" height="44" fill="currentColor"/>
            <rect x="44" y="28" width="8" height="28" fill="currentColor"/>
          </svg>
          Results
        </button>
        <button className="footer-button gallery-btn active">
          <svg className="footer-icon gallery-icon" viewBox="0 0 64 64">
            <rect x="8" y="12" width="48" height="40" fill="none" stroke="currentColor" strokeWidth="2" rx="2"/>
            <circle cx="20" cy="22" r="4" fill="currentColor"/>
            <path d="M 8 52 L 20 35 L 32 45 L 56 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Gallery
        </button>
      </div>
    </div>
  )
}
