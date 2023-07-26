'use client'

import { useState } from 'react'

const Uploader = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadUrl, setUploadUrl] = useState(null)

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!file) return

    setUploading(true)
    console.log(file)

    const formData = new FormData()
    formData.append('file', file)

    console.log(formData)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      console.log('Success:', data)

      setUploadUrl(data.url)
      setUploading(false)
    } catch (error) {
      console.error('Error uploading file:', error)
      setUploading(false)
    }
  }

  return (
    <div>
      <h2>Upload Images and Videos to Amazon S3</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*,video/*'
          onChange={handleFileChange}
        />
        <button type='submit' disabled={!file || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {uploadUrl && (
        <p>
          File uploaded successfully!{' '}
          <a href={uploadUrl} target='_blank' rel='noopener noreferrer'>
            View File
          </a>
        </p>
      )}
    </div>
  )
}

export default Uploader
