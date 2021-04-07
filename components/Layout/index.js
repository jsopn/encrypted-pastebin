import Head from 'next/head'
import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

export default function Layout ({ children }) {
  return (
    <div className="flex flex-col text-gray-200 bg-gray-900 font-mono h-screen">
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <link rel="manifest" href="/manifest.json" />
        <link href='/favicon.png' rel='icon' type='image/png' />

        <meta name='description' content='Pastebin with client-sided encryption using AES' />
        <meta name='keywords' content='encryption, pastebin, paste, clientsided, jsopn' />
        <meta name="theme-color" content="#313131" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon.png" />

        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon={JSON.stringify({
          token: process.env.NEXT_PUBLIC_CFBEACON
        })} />
      </Head>

      <Header />

      <main className="flex justify-center items-center flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  )
}
