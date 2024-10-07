'use client'

import React, { useState } from 'react'

interface DownloadButtonProps {
  url: string
  prompt: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ url, prompt }) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    const link = document.createElement('a')
    link.href = url
    link.download = `${prompt.slice(0, 20)}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setTimeout(() => setIsDownloading(false), 1000) // Reset after 1 second
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`mt-2 font-bold py-2 px-4 rounded ${
        isDownloading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-700 text-white'
      }`}
    >
      {isDownloading ? 'Downloading...' : 'Download'}
    </button>
  )
}

export default DownloadButton