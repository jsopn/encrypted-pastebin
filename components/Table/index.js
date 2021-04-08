import React from 'react'

export function HeaderCell ({ children, ...props }) {
  return (
    <th className="text-center bg-gray-800" {...props}>
      {children}
    </th>
  )
}

export function DataCell ({ children, ...props }) {
  return (
    <td className="py-2 px-4" {...props}>
      {children}
    </td>
  )
}

export default function Table ({ children, ...props }) {
  return (
    <table className="p-5" {...props}>
      {children}
    </table>
  )
}
