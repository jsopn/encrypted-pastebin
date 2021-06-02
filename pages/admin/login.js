import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import cookieCutter from 'cookie-cutter'
import ReCaptcha from 'react-google-recaptcha'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Layout from '../../components/Layout'
import Alert from '../../components/Alert'
import APIHelper from '../../helpers/APIHelper'

export default function AdminLogin () {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const recaptchaRef = useRef()

  const handle2FAInput = (e) => {
    const code = e.target.value.replace(/\s/g, '')

    if (code.length > 6) return
    setCode(code)
  }

  const handleLogin = async () => {
    const parsedCode = parseInt(code.replace(/\s/g, ''))

    if (username.length === 0 || password.length === 0) return setError('Username or Password cannot be empty')
    if (parsedCode.toString().length !== 6) return setError('Please enter 2FA-Code correctly!')

    setError('')

    try {
      const token = await recaptchaRef.current.executeAsync()
      if (!token) return setError('Failed to pass the robot test, try reloading the page.')

      const resp = await APIHelper.login(username, password, parsedCode, token)
      cookieCutter.set('jwt', resp.token)

      return window.location.replace('/admin')
    } catch (e) {
      setError(e.response.data.errorMessage || e.message)
    }
  }

  return (
    <Layout>
      <Head>
        <title>Admin Login :: Encrypted pastebin</title>
      </Head>

      <div className="flex flex-col space-y-1 w-96">
        <h1 className="text-center mb-5">Administrator login page</h1>

        {error && <Alert color="red">{error}</Alert>}

        <Input
          id="username"
          type="text"
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Input
          id="2fa"
          type="text"
          label="2FA Code"
          value={code ? code.match(/.{1,3}/g).join(' ') : ''}
          onChange={handle2FAInput}
        />

        <Button onClick={handleLogin}>
          Login
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
