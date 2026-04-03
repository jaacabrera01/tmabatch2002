export const submitPhoto = (photoData, caption = '') => {
  try {
    const photos = getPhotos()
    const newPhoto = {
      id: Date.now(),
      data: photoData, // Base64 encoded image
      caption: caption,
      timestamp: new Date().toISOString(),
      uploader: 'Anonymous'
    }
    photos.push(newPhoto)
    localStorage.setItem('galleryPhotos', JSON.stringify(photos))
    return newPhoto
  } catch (err) {
    console.error('Error saving photo:', err)
    throw err
  }
}

export const getPhotos = () => {
  try {
    const photos = localStorage.getItem('galleryPhotos')
    return photos ? JSON.parse(photos) : []
  } catch (err) {
    console.error('Error retrieving photos:', err)
    return []
  }
}

export const deletePhoto = (photoId) => {
  try {
    const photos = getPhotos()
    const filtered = photos.filter(p => p.id !== photoId)
    localStorage.setItem('galleryPhotos', JSON.stringify(filtered))
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
