import { useState } from 'react'
import Head from 'next/head'
import APIHelper from '../helpers/APIHelper'
import Button from '../components/Button'
import Input from '../components/Input'
import Layout from '../components/Layout'
import Alert from '../components/Alert'
import Spinner from '../components/Spinner'
import CryptoHelper from '../helpers/CryptoHelper'
import DecryptedView from '../components/DecryptedView'

export default function ViewPaste () {
  const [uuid, setUUID] = useState('')
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [decrypted, setDecrypted] = useState('')

  const decryptPaste = async () => {
    setError('')

    if (!uuid) return setError('UUID can\'t be empty')
    if (!key) return setError('Key can\'t be empty')

    try {
      setLoading(true)

      const pasteRaw = await APIHelper.getPaste(uuid)
      const decrypted = CryptoHelper.decryptMessage(pasteRaw.data, key)

      if (!decrypted) {
        setLoading(false)
        return setError('Invalid key!')
      }

      setDecrypted(decrypted)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      return setError(e.response.data.errorMessage || e.message)
    }
  }

  if (!decrypted) {
    return (
      <Layout>
        <Head>
          <title>View paste :: Encrypted pastebin</title>
        </Head>

        <div className="flex flex-col space-y-1 w-96">
          {error && <Alert color="red">{error}</Alert>}

          <Input
            type="text"
            label="UUID"
            value={uuid}
            onChange={e => {
              setError('')
              setUUID(e.target.value)
            }}
          />

          <Input
            type="password"
            label="Decryption key"
            value={key}
            onChange={e => {
              setError('')
              setKey(e.target.value)
            }}
          />

          <Button disabled={loading} onClick={() => decryptPaste()}>
            {loading ? <Spinner /> : 'Decrypt paste'}
          </Button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>Viewing paste :: Encrypted pastebin</title>
      </Head>

      <DecryptedView decrypted={decrypted} uuid={uuid} decryptKey={key} />
    </Layout>
  )
}
