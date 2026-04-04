// Uses backend API to store photos
// All photos are synced across devices in real-time

const API_URL = 'http://localhost:3001/api'

export const submitPhoto = async (photoData, caption = '') => {
  try {
    const response = await fetch(`${API_URL}/photos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: photoData,
        caption: caption,
        uploader: 'Anonymous'
      })
    })

    if (!response.ok) {
      throw new Error('Failed to upload photo')
    }

    const newPhoto = await response.json()
    console.log('Photo uploaded:', newPhoto)
    return newPhoto
  } catch (err) {
    console.error('Error saving photo:', err)
    throw err
  }
}

export const getPhotos = async () => {
  try {
    const response = await fetch(`${API_URL}/photos`)
    if (!response.ok) {
      throw new Error('Failed to fetch photos')
    }
    return await response.json()
  } catch (err) {
    console.error('Error retrieving photos:', err)
    return []
  }
}

export const deletePhoto = async (photoId) => {
  try {
    const response = await fetch(`${API_URL}/photos/${photoId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete photo')
    }

    return true
  } catch (err) {
    console.error('Error deleting photo:', err)
    throw err
  }
}

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}
