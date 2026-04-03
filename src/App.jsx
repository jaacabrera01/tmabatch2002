import { useState } from 'react'
import SurveyHome from './components/SurveyHome'
import SurveyForm from './components/SurveyForm'
import SurveyResults from './components/SurveyResults'
import PhotoGallery from './components/PhotoGallery'
import './App.css'

function App() {
  const [page, setPage] = useState('home') // home, survey, results, gallery

  const handleStartSurvey = () => {
    setPage('survey')
  }

  const handleViewResults = () => {
    setPage('results')
  }

  const handleSubmitSuccess = () => {
    setPage('results')
  }

  const handleBackHome = () => {
    setPage('home')
  }

  const handleBackToSurvey = () => {
    setPage('survey')
  }

  const handleViewGallery = () => {
    setPage('gallery')
  }

  const handleBackFromGallery = () => {
    setPage('results')
  }

  return (
    <div className="app-wrapper">
      {page === 'home' && <SurveyHome onStartSurvey={handleStartSurvey} onViewResults={handleViewResults} />}
      {page === 'survey' && <SurveyForm onSubmitSuccess={handleSubmitSuccess} onBack={handleBackHome} onViewResults={handleViewResults} />}
      {page === 'results' && <SurveyResults onBack={handleBackToSurvey} onBackHome={handleBackHome} onViewGallery={handleViewGallery} />}
      {page === 'gallery' && <PhotoGallery onBack={handleBackFromGallery} onViewSurvey={handleStartSurvey} onViewResults={handleViewResults} />}
    </div>
  )
}

export default App
