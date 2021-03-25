import React from 'react'

export default function TextArea ({ children, ...props }) {
  return (
    <textarea className="p-3 text-gray-300 bg-gray-800 rounded text-xs w-96 outline-none focus:ring-2 focus:ring-gray-700" {...props}>
      {children}
    </textarea>
  )
}
