import React from 'react'

interface Props {
  loadingText?: string
}

const Loading: React.FC<Props> = ({ loadingText = 'Loading...' }) => {
  return (
    <div className="flex justify-center items-center h-full border rounded-lg drop-shadow-md p-4">
      <div className="border-t-4 border-b-4 border-gray-400 rounded-full animate-spin h-6 w-6 mr-3"></div>
      <span className="text-gray-700 text-lg">{loadingText}</span>
    </div>
  )
}

export default Loading
