import React from 'react'

export default function Alert ({ color, children }) {
  return (
    <span className={`p-2 text-xs bg-${color || 'red'}-800`}>
      {children}
    </span>
  )
}
