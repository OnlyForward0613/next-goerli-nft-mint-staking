import Head from 'next/head'
import HomePage from '../components/HomePage/HomePage'

export default function Home() {
  return (
    <>
      <Head>
        <title>Game of Risk | Home</title>
        <meta name="description" content="Game of Risk Dapp Created by Oura Kano" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  )
}
