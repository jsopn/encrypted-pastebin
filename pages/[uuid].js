import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import Layout from '../components/Layout'
import Alert from '../components/Alert'
import Input from '../components/Input'
import Button from '../components/Button'
import CryptoHelper from '../helpers/CryptoHelper'
import DecryptedView from '../components/DecryptedView'

export async function getServerSideProps (ctx) {
  try {
    const resp = await axios.get(`${process.env.NEXT_PUBLIC_BASEURL}/api/v1/paste/${ctx.params.uuid}`, {
      headers: {
        'User-Agent': 'PersonalSite/v1' // TODO: Rewrite this!! This is a temporary solution.
      }
    })

    return {
      props: {
        uuid: ctx.params.uuid,
        data: resp.data.data
      }
    }
  } catch (e) {
    return { notFound: true }
  }
}

export default function DecryptPaste ({ uuid, data }) {
  const router = useRouter()
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [decrypted, setDecrypted] = useState('')

  const decryptPaste = (key) => {
    try {
      const decrypted = CryptoHelper.decryptMessage(data, key)
      if (!decrypted) return setError('Invalid key!')

      setDecrypted(decrypted)
    } catch (e) {
      return setError('Invalid key!')
    }
  }

  useEffect(() => {
    const password = router.asPath.split('#')[1]
    if (!password) return setDecrypted('')

    window.location.hash = ''
    setKey(password)
    decryptPaste(password)
  }, [])

  if (!decrypted) {
    return (
      <Layout>
        <Head>
          <title>Decrypting paste :: Encrypted pastebin</title>
        </Head>

        <div className="flex flex-col space-y-1 w-96">
          {error && <Alert color="red">{error}</Alert>}

          <Input
            type="text"
            label="Decryption key"
            value={key}
            onChange={e => {
              e.target.type = 'password'

              setError('')
              setKey(e.target.value)
            }}
          />

          <Button onClick={() => decryptPaste(key)}>
            Decrypt
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
