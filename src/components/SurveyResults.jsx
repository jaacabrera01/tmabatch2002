import { useState, useEffect } from 'react'
import { getSurveyResponses } from '../services/surveyService'
import { getPhotos } from '../services/photoService'
import { exportAllData } from '../services/exportService'
import '../styles/SurveyResults.css'

export default function SurveyResults({ onBack, onBackHome, onViewGallery }) {
  const [responses, setResponses] = useState([])
  const [stats, setStats] = useState({
    monthStats: {},
    venueStats: {},
    sectionStats: {},
    totalResponses: 0
  })

  useEffect(() => {
    const loadResponses = async () => {
      const allResponses = await getSurveyResponses()
      setResponses(allResponses)
      calculateStats(allResponses)
    }
    loadResponses()
  }, [])

  const calculateStats = (data) => {
    const monthStats = {}
    const venueStats = {}
    const sectionStats = {}

    data.forEach(response => {
      if (response.preferredMonth) {
        monthStats[response.preferredMonth] = (monthStats[response.preferredMonth] || 0) + 1
      }
      if (response.preferredVenue) {
        venueStats[response.preferredVenue] = (venueStats[response.preferredVenue] || 0) + 1
      }
      if (response.section) {
        sectionStats[response.section] = (sectionStats[response.section] || 0) + 1
      }
    })

    setStats({
      monthStats,
      venueStats,
      sectionStats,
      totalResponses: data.length
    })
  }

  const getPercentage = (count) => {
    if (stats.totalResponses === 0) return 0
    return Math.round((count / stats.totalResponses) * 100)
  }

  const getBarWidth = (count) => {
    if (stats.totalResponses === 0) return 0
    return (count / stats.totalResponses) * 100
  }

  const sortedMonths = Object.entries(stats.monthStats)
    .sort((a, b) => b[1] - a[1])

  const sortedVenues = Object.entries(stats.venueStats)
    .sort((a, b) => b[1] - a[1])

  const sortedSections = Object.entries(stats.sectionStats)
    .sort((a, b) => a[0].localeCompare(b[0]))

  const getVenueColor = (venue) => {
    const colors = {
      'Hotel': 'blue',
      'School': 'gray',
      'Resort': 'blue',
      'Restaurant': 'blue'
    }
    return colors[venue] || 'blue'
  }

  const handleExportData = async () => {
    const photos = await getPhotos()
    exportAllData(responses, photos)
  }

  return (
    <div className="app-container results-page">
      <header className="app-header-survey">
        <button className="back-button" onClick={onBack}>←</button>
        <h1>Survey Results</h1>
        <button 
          className="export-button"
          onClick={handleExportData}
          title="Download responses and photos as Excel"
        >
          📥 Export
        </button>
      </header>

      <div className="results-content">
        {stats.totalResponses > 0 ? (
          <>
            <div className="results-section">
              <h2>Preferred Month</h2>
              {sortedMonths.length > 0 ? (
                <div className="month-items">
                  {sortedMonths.map(([month, count]) => (
                    <div key={month} className="month-item">
                      <div className="month-label">
                        <span className="percentage">{getPercentage(count)}%</span>
                        <span className="month-name">{month}</span>
                      </div>
                      <div className="month-bar-container">
                        <div className="month-bar" style={{ width: `${getBarWidth(count)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No month preferences recorded</p>
              )}
            </div>

            <div className="results-section">
              <h2>Section Distribution</h2>
              {sortedSections.length > 0 ? (
                <div className="section-items">
                  {sortedSections.map(([section, count]) => (
                    <div key={section} className="section-item">
                      <div className="section-label">
                        <span className="section-letter">{section}</span>
                        <span className="section-count">{count} responses</span>
                      </div>
                      <div className="section-bar-container">
                        <div className="section-bar" style={{ width: `${getBarWidth(count)}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No section data recorded</p>
              )}
            </div>

            <div className="results-section">
              <h2>Venue Preference</h2>
              {sortedVenues.length > 0 ? (
                <div className="venue-items">
                  {sortedVenues.map(([venue, count]) => (
                    <div key={venue} className="venue-item">
                      <div className="venue-icon-wrapper">{getVenueIcon(venue)}</div>
                      <span className="venue-percentage">{getPercentage(count)}%</span>
                      <div className="venue-bar-wrapper">
                        <div className={`venue-bar ${getVenueColor(venue)}`} style={{ width: `${getBarWidth(count) * 1.5}%` }}>
                          <span className="venue-label">{venue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No venue preferences recorded</p>
              )}
              <div className="gallery-section">
              </div>
            </div>
          </>
        ) : (
          <div className="no-responses">
            <p>No responses yet. Start collecting surveys!</p>
          </div>
        )}
      </div>

      <div className="results-footer">
        <button className="footer-button survey-btn" onClick={onBack}>
          <svg className="footer-icon survey-icon" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="32" y1="20" x2="32" y2="44" stroke="currentColor" strokeWidth="2"/>
            <line x1="20" y1="32" x2="44" y2="32" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Survey
        </button>
        <button className="footer-button results-btn active">
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

function getVenueIcon(venue) {
  switch(venue) {
    case 'Hotel':
      return (
        <svg viewBox="0 0 100 100" width="48" height="48">
          {/* Main building */}
          <rect x="15" y="35" width="70" height="45" fill="#0052CC" rx="3"/>
          
          {/* Top crown/tower */}
          <rect x="35" y="15" width="30" height="20" fill="#0052CC" rx="2"/>
          <rect x="42" y="8" width="8" height="8" fill="#0052CC"/>
          <rect x="50" y="8" width="8" height="8" fill="#0052CC"/>
          
          {/* Windows - top row */}
          <rect x="25" y="42" width="10" height="10" fill="white"/>
          <rect x="40" y="42" width="10" height="10" fill="white"/>
          <rect x="55" y="42" width="10" height="10" fill="white"/>
          <rect x="70" y="42" width="10" height="10" fill="white"/>
          
          {/* Windows - middle row */}
          <rect x="25" y="58" width="10" height="10" fill="white"/>
          <rect x="40" y="58" width="10" height="10" fill="white"/>
          <rect x="55" y="58" width="10" height="10" fill="white"/>
          <rect x="70" y="58" width="10" height="10" fill="white"/>
          
          {/* Door */}
          <rect x="45" y="65" width="10" height="15" fill="#003366"/>
          <circle cx="54" cy="73" r="1.5" fill="white"/>
        </svg>
      )
    case 'School':
      return (
        <svg viewBox="0 0 100 100" width="48" height="48">
          {/* Roof */}
          <polygon points="25,50 50,25 75,50" fill="#0052CC"/>
          
          {/* Main building */}
          <rect x="25" y="50" width="50" height="35" fill="#0052CC" rx="2"/>
          
          {/* Windows - left column */}
          <rect x="32" y="58" width="9" height="9" fill="white"/>
          <rect x="32" y="72" width="9" height="9" fill="white"/>
          
          {/* Windows - center column */}
          <rect x="45" y="58" width="9" height="9" fill="white"/>
          <rect x="45" y="72" width="9" height="9" fill="white"/>
          
          {/* Windows - right column */}
          <rect x="58" y="58" width="9" height="9" fill="white"/>
          <rect x="58" y="72" width="9" height="9" fill="white"/>
          
          {/* Door */}
          <rect x="47" y="73" width="6" height="12" fill="#003366"/>
          
          {/* Flag pole */}
          <rect x="49" y="18" width="2" height="10" fill="#333"/>
          
          {/* Flag */}
          <polygon points="51,20 51,25 60,22.5" fill="#FF5252"/>
        </svg>
      )
    case 'Resort':
      return (
        <svg viewBox="0 0 100 100" width="48" height="48">
          {/* Palm trunk */}
          <rect x="42" y="50" width="6" height="35" fill="#654321" rx="3"/>
          
          {/* Palm fronds - top layer */}
          <ellipse cx="35" cy="48" rx="12" ry="10" fill="#2D5016" transform="rotate(-30 35 48)"/>
          <ellipse cx="65" cy="48" rx="12" ry="10" fill="#2D5016" transform="rotate(30 65 48)"/>
          <ellipse cx="45" cy="35" rx="12" ry="10" fill="#3A6B2F" transform="rotate(60 45 35)"/>
          <ellipse cx="55" cy="35" rx="12" ry="10" fill="#3A6B2F" transform="rotate(-60 55 35)"/>
          
          {/* Hut base */}
          <polygon points="35,65 65,65 62,52 38,52" fill="#8B6F47"/>
          
          {/* Hut roof */}
          <polygon points="38,52 62,52 50,35" fill="#A0826D"/>
          
          {/* Hut door */}
          <rect x="47" y="68" width="6" height="12" fill="#654321"/>
          
          {/* Door handle */}
          <circle cx="54" cy="74" r="1" fill="#333"/>
        </svg>
      )
    case 'Restaurant':
      return (
        <svg viewBox="0 0 100 100" width="48" height="48">
          {/* Left spoon */}
          <ellipse cx="28" cy="25" rx="8" ry="10" fill="#333"/>
          <path d="M 28 35 Q 25 50 25 70 Q 25 75 28 75 Q 31 75 31 70 Q 31 50 28 35" fill="#333"/>
          <circle cx="28" cy="78" r="3" fill="#333"/>
          
          {/* Right spoon */}
          <ellipse cx="72" cy="25" rx="8" ry="10" fill="#333"/>
          <path d="M 72 35 Q 75 50 75 70 Q 75 75 72 75 Q 69 75 69 70 Q 69 50 72 35" fill="#333"/>
          <circle cx="72" cy="78" r="3" fill="#333"/>
        </svg>
      )
    default:
      return '📍'
  }
}
