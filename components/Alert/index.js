import React from 'react'

export default function Alert ({ color, children }) {
  const alertColor = 'bg-red-800' || `bg-${color}-800` // TODO: rewrite

  return (
    <span className={`p-2 text-xs ${alertColor}`}>
      {children}
    </span>
  )
}
