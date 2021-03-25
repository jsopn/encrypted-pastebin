import Link from 'next/link'

export default function NavButton ({ children, ...props }) {
  return (
    <Link passHref {...props}>
      <a className="text-gray-500 hover:text-gray-300 transition-colors">
        {children}
      </a>
    </Link>
  )
}
