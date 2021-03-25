import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Footer () {
  const [count, setCount] = useState()

  useEffect(async () => {
    try {
      const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/paste`)

      setCount(resp.data.entries)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <footer className="p-5 container mx-auto text-center">
      <p className="text-gray-600 text-xs">
        legal issues: jsopn@pm.me :: pastes created: {count || '(loading)'}
      </p>
    </footer>
  )
}
