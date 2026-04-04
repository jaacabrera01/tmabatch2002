import { useState } from 'react'
import { submitSurvey, getSurveyResponses } from '../services/surveyService'
import '../styles/SurveyForm.css'

export default function SurveyForm({ onSubmitSuccess, onBack, onViewResults, onViewGallery }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    section: '',
    preferredMonth: '',
    preferredVenue: '',
    attending: '',
    suggestions: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.name || !formData.email || !formData.section || !formData.attending) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      // Check for duplicate name or email
      const existingResponses = await getSurveyResponses()
      const isDuplicate = existingResponses.some(response => 
        response.name.toLowerCase() === formData.name.toLowerCase() || 
        response.email.toLowerCase() === formData.email.toLowerCase()
      )

      if (isDuplicate) {
        setError('This name or email has already submitted a response. Please use different information.')
        setLoading(false)
        return
      }

      await submitSurvey(formData)
      setSubmitted(true)
      setLoading(false)
      // Navigate to results after 2 seconds
      setTimeout(() => {
        onSubmitSuccess()
      }, 2000)
    } catch (err) {
      setError('Failed to submit. Please try again.')
      console.error(err)
      setLoading(false)
    }
  }

  const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const venues = ['Hotel', 'School', 'Resort', 'Restaurant']

  return (
    <div className="app-container">
      <header className="app-header-survey">
        <button className="back-button" onClick={onBack}>←</button>
        <h1>Reunion Survey</h1>
      </header>

      <div className="form-wrapper">
        {submitted ? (
          <div className="thank-you-container">
            <div className="thank-you-message">
              <h2>Thank You!</h2>
              <p className="redirect-text">Redirecting to results...</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="survey-form">
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="section">Section *</label>
          <select
            id="section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Section --</option>
            {sections.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email">Contact Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="09XX XXX XXXX"
            pattern="^(\+63|0)?9\d{9}$"
            title="Philippine format: 09XX XXX XXXX or +639XX XXX XXXX"
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferredMonth">Preferred Month</label>
          <select
            id="preferredMonth"
            name="preferredMonth"
            value={formData.preferredMonth}
            onChange={handleChange}
          >
            <option value="">-- Select Month --</option>
            {months.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="preferredVenue">Preferred Venue Type</label>
          <select
            id="preferredVenue"
            name="preferredVenue"
            value={formData.preferredVenue}
            onChange={handleChange}
          >
            <option value="">-- Select Venue --</option>
            {venues.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="attending">Will You Attend? *</label>
          <select
            id="attending"
            name="attending"
            value={formData.attending}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="Yes">Yes</option>
            <option value="Maybe">Maybe</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="suggestions">Any Suggestions?</label>
          <textarea
            id="suggestions"
            name="suggestions"
            value={formData.suggestions}
            onChange={handleChange}
            placeholder="Share your ideas or requests..."
            rows="4"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button
          type="submit"
          disabled={loading || submitted}
          className="submit-button"
        >
          {loading ? 'Submitting...' : 'Submit Response'}
        </button>
      </form>
        )}
      </div>

      <div className="survey-footer">
        <button className="footer-button survey-btn active" onClick={onBack} disabled>
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
        <button className="footer-button gallery-btn" onClick={onViewGallery}>
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
