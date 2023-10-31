const dataUrlToBuffer = (dataUrl: string) => {
  // Extract the base64 data and MIME type from the Data URL
  if (!dataUrl || !dataUrl.startsWith('data')) {
    return null
  }

  const [header, base64Data] = dataUrl.split(',')
  const mimeType = header.split(':')[1].split(';')[0]

  // Convert base64 data to a Buffer
  const buffer = Buffer.from(base64Data, 'base64')

  return buffer
}

export default dataUrlToBuffer
