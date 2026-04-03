// For now, this saves to localStorage
// Later, integrate with Firebase for cloud storage

export const submitSurvey = async (formData) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Get existing responses from localStorage
    const existingResponses = JSON.parse(localStorage.getItem('surveyResponses') || '[]')
    
    // Add new response with timestamp
    const newResponse = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    }
    
    existingResponses.push(newResponse)
    
    // Save back to localStorage
    localStorage.setItem('surveyResponses', JSON.stringify(existingResponses))
    
    console.log('Survey submitted:', newResponse)
    return newResponse
  } catch (error) {
    console.error('Error submitting survey:', error)
    throw error
  }
}

export const getSurveyResponses = () => {
  try {
    return JSON.parse(localStorage.getItem('surveyResponses') || '[]')
  } catch (error) {
    console.error('Error fetching responses:', error)
    return []
  }
}
