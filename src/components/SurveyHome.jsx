import '../styles/SurveyHome.css'
import logoImg from '../assets/school-logo.jpeg?url'

export default function SurveyHome({ onStartSurvey, onViewResults }) {
  
  return (
    <div className="survey-home">
      <div className="home-banner">
        <img src={logoImg} alt="School Logo" className="banner-logo" />
      </div>
      
      <div className="home-content">
        <h1>Help Us Plan Our Reunion!</h1>
        <p>Take a quick survey to share your preferences for our 25th year upcoming reunion in 2027!</p>
        <p className="tagline">Your input helps us create an unforgettable celebration for everyone!</p>
        
        <button className="start-button" onClick={onStartSurvey}>
          📋 Start Survey
        </button>
      </div>

      <div className="home-navigation">
        <button className="nav-button survey-nav" onClick={onStartSurvey}>
          + Survey
        </button>
        <button className="nav-button results-nav" onClick={onViewResults}>
          📊 Results
        </button>
      </div>
    </div>
  )
}
