import React from 'react'

const ShimmerRequest = () => {
  return (
    <div className="animate-pulse flex flex-col items-center gap-4 p-4">
    <div className="w-32 h-32 bg-white rounded-full"></div>
    <div className="h-6 w-48 bg-white rounded"></div>
    <div className="h-4 w-32 bg-white rounded"></div>
  </div>
  )
}

export default ShimmerRequest