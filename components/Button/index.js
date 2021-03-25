import React from 'react'

export default function Button ({ children, ...props }) {
  return (
    <button className="flex items-center justify-center px-1 py-2 focus:outline-none bg-gray-800 rounded-lg text-xs text-gray-300 hover:bg-gray-700 transition-colors" {...props}>
      {children}
    </button>
  )
}
