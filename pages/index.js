import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ReCaptcha from 'react-google-recaptcha'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Input from '../components/Input'
import Spinner from '../components/Spinner'
import Layout from '../components/Layout'
import TextArea from '../components/TextArea'
import CryptoHelper from '../helpers/CryptoHelper'
import APIHelper from '../helpers/APIHelper'

export default function Home () {
  const router = useRouter()
  const [alertColor, setAlertColor] = useState('red')
  const [alert, setAlertMessage] = useState('')
  const [message, setMessage] = useState('')
  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)
  const recaptchaRef = useRef()

  const showAlert = (color, text) => {
    setLoading(false)
    setAlertColor(color)
    setAlertMessage(text)
  }

  const generateKey = () => {
    const arr = new Uint8Array(32 / 2)
    crypto.getRandomValues(arr)

    return Array.from(arr, (dec) => dec.toString(16).padStart(2, '0')).join('')
  }

  const createPaste = async () => {
    const encryptionKey = key || generateKey()

    try {
      setAlertMessage('')

      if (!message) return showAlert('red', 'Message can\'t be empty')
      if (message.length < 3) return showAlert('red', 'Message cannot be less than 3 characters')
      if (encryptionKey.length < 10) return showAlert('red', 'Key cannot be less than 10 characters')

      setLoading(true)

      const token = await recaptchaRef.current.executeAsync()
      if (!token) return showAlert('red', 'Failed to pass the robot test, try reloading the page.')

      const encrypted = CryptoHelper.encryptMessage(message, encryptionKey)
      const paste = await APIHelper.createPaste(encrypted, token)

      await router.push(`/${paste.uuid}#${encryptionKey}`)
    } catch (e) {
      showAlert('red', e.message)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Create paste :: Encrypted pastebin</title>
      </Head>

      <div className="flex flex-col space-y-1">
        {alert && (
          <Alert color={alertColor}>
            {alert}
          </Alert>
        )}

        <TextArea
          placeholder='Message to encrypt...'
          rows={8}
          value={message}
          onChange={e => {
            setMessage(e.target.value)
            setAlertMessage('')
          }}
        />

        <Input
          type="password"
          label="Encryption Key"
          placeholder="(key will be generated if empty)"
          value={key}
          onChange={e => setKey(e.target.value)}
        />

        <Button onClick={createPaste}>
          {loading ? <Spinner /> : 'Create paste'}
        </Button>
      </div>

      <ReCaptcha
        ref={recaptchaRef}
        size="invisible"
        theme="dark"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
      />
    </Layout>
  )
}
