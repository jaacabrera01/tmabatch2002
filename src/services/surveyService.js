// Uses backend API to store survey responses
// All data is synced across devices in real-time

const API_URL = 'http://localhost:3001/api'

export const submitSurvey = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/surveys`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (!response.ok) {
      throw new Error('Failed to submit survey')
    }

    const newResponse = await response.json()
    console.log('Survey submitted:', newResponse)
    return newResponse
  } catch (error) {
    console.error('Error submitting survey:', error)
    throw error
  }
}

export const getSurveyResponses = async () => {
  try {
    const response = await fetch(`${API_URL}/surveys`)
    if (!response.ok) {
      throw new Error('Failed to fetch surveys')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching responses:', error)
    return []
  }
}
