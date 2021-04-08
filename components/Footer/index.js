import { useEffect, useState } from 'react'
import APIHelper from '../../helpers/APIHelper'

export default function Footer () {
  const [count, setCount] = useState()

  useEffect(async () => {
    try {
      const entries = await APIHelper.getTotalEntries()

      setCount(entries)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <footer className="p-5 container mx-auto text-center">
      <p className="text-gray-600 text-xs">
        legal issues: jsopn@pm.me :: pastes created: {count || '(loading)'} :: build id: <code className="p-1 bg-gray-800 rounded">{process.env.BUILD_ID.slice(0, 7)}</code>
      </p>
    </footer>
  )
}
