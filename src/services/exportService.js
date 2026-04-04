import * as XLSX from 'xlsx'

export const exportSurveyResponsesToExcel = (responses) => {
  if (responses.length === 0) {
    alert('No survey responses to export')
    return
  }

  // Prepare data for Excel
  const dataForExcel = responses.map(response => ({
    'Full Name': response.name || '',
    'Email': response.email || '',
    'Mobile Number': response.mobileNumber || '',
    'Attendance': response.attending || '',
    'Preferred Month': response.preferredMonth || '',
    'Preferred Venue': response.preferredVenue || '',
    'Section': response.section || '',
    'Suggestions': response.suggestions || '',
    'Submitted Date': response.timestamp ? new Date(response.timestamp).toLocaleDateString() : ''
  }))

  // Create a new workbook
  const worksheet = XLSX.utils.json_to_sheet(dataForExcel)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Survey Responses')

  // Style the header row
  const headerCells = Object.keys(dataForExcel[0])
  headerCells.forEach((key, index) => {
    const cellAddress = XLSX.utils.encode_col(index) + '1'
    if (!worksheet[cellAddress]) return
    worksheet[cellAddress].s = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '0052CC' } },
      alignment: { horizontal: 'center' }
    }
  })

  // Set column widths
  worksheet['!cols'] = [
    { wch: 15 },
    { wch: 20 },
    { wch: 18 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 25 },
    { wch: 15 }
  ]

  // Generate filename with date
  const date = new Date().toISOString().split('T')[0]
  const filename = `reunion-survey-responses-${date}.xlsx`

  // Trigger download
  XLSX.writeFile(workbook, filename)
}

export const exportPhotosMetadataToExcel = (photos) => {
  if (photos.length === 0) {
    alert('No photos to export')
    return
  }

  // Prepare data for Excel (without Base64 images)
  const dataForExcel = photos.map(photo => ({
    'Photo ID': photo.id || '',
    'Caption': photo.caption || '(No caption)',
    'Uploader': photo.uploader || 'Anonymous',
    'Upload Date': photo.timestamp ? new Date(photo.timestamp).toLocaleDateString() : '',
    'Upload Time': photo.timestamp ? new Date(photo.timestamp).toLocaleTimeString() : ''
  }))

  // Create a new workbook
  const worksheet = XLSX.utils.json_to_sheet(dataForExcel)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Photo Metadata')

  // Style the header row
  const headerCells = Object.keys(dataForExcel[0])
  headerCells.forEach((key, index) => {
    const cellAddress = XLSX.utils.encode_col(index) + '1'
    if (!worksheet[cellAddress]) return
    worksheet[cellAddress].s = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '0052CC' } },
      alignment: { horizontal: 'center' }
    }
  })

  // Set column widths
  worksheet['!cols'] = [
    { wch: 15 },
    { wch: 30 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 }
  ]

  // Generate filename with date
  const date = new Date().toISOString().split('T')[0]
  const filename = `reunion-photos-metadata-${date}.xlsx`

  // Trigger download
  XLSX.writeFile(workbook, filename)
}

export const exportAllData = (responses, photos) => {
  if (responses.length === 0 && photos.length === 0) {
    alert('No data to export')
    return
  }

  const workbook = XLSX.utils.book_new()

  // Add survey responses sheet if data exists
  if (responses.length > 0) {
    const surveyData = responses.map(response => ({
      'Full Name': response.name || '',
      'Email': response.email || '',
      'Mobile Number': response.mobileNumber || '',
      'Attendance': response.attending || '',
      'Preferred Month': response.preferredMonth || '',
      'Preferred Venue': response.preferredVenue || '',
      'Section': response.section || '',
      'Suggestions': response.suggestions || '',
      'Submitted Date': response.timestamp ? new Date(response.timestamp).toLocaleDateString() : ''
    }))
    
    const surveySheet = XLSX.utils.json_to_sheet(surveyData)
    XLSX.utils.book_append_sheet(workbook, surveySheet, 'Survey Responses')
  }

  // Add photos metadata sheet if data exists
  if (photos.length > 0) {
    const photoData = photos.map(photo => ({
      'Photo ID': photo.id || '',
      'Caption': photo.caption || '(No caption)',
      'Uploader': photo.uploader || 'Anonymous',
      'Upload Date': photo.timestamp ? new Date(photo.timestamp).toLocaleDateString() : '',
      'Upload Time': photo.timestamp ? new Date(photo.timestamp).toLocaleTimeString() : ''
    }))
    
    const photoSheet = XLSX.utils.json_to_sheet(photoData)
    XLSX.utils.book_append_sheet(workbook, photoSheet, 'Photo Metadata')
  }

  // Generate filename with date
  const date = new Date().toISOString().split('T')[0]
  const filename = `reunion-data-export-${date}.xlsx`

  // Trigger download
  XLSX.writeFile(workbook, filename)
}
