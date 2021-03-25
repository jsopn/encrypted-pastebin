import React from 'react'

export default function Input ({ label, children, ...props }) {
  return (
    <div className="flex items-center">
      <div className="bg-gray-700 rounded-l p-2 text-xs">
        {label}
      </div>

      <input className="p-2 outline-none text-gray-300 bg-gray-800 rounded-r text-xs flex-grow" {...props}>
        {children}
      </input>
    </div>
  )
}
