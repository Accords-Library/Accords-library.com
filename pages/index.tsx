import type { NextPage } from 'next'
import Head from 'next/head'
import Menu from '../components/menu'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Accord&rsquo;s Library - Discover • Analyse • Translate • Archive</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Menu></Menu>
      
    </>
  )
}

export default Home
