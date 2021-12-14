import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HomePage from '../components/HomePage/HomePage'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game of Risk | Home</title>
        <meta name="description" content="Game of Risk Dapp Created by Oura Kano" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </div>
  )
}
