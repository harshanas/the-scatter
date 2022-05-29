import react, { useContext } from 'react';
import Link from 'next/link'
import Head from 'next/head';

import AccountConnection from '../components/AccountConnection'
import MainLayout from '../layouts/mainLayout'
import { AccountContext }  from "../lib/context";

import styles from '../assets/styles/Home.module.css'

export default function Home() {
  const { walletAddr, setWalletAddr } = useContext(AccountContext);

  return (
    <react.Fragment>
      <Head>
        <title>The Scatter - The on-chain blog</title>
        <meta name="description" content="The on-chain blog" />
      </Head>
    
      <main className="d-flex h-100 text-center text-dark bg-white">
        <div className={`${styles['container']} d-flex  p-3 mx-auto flex-column`}>
          <header className="mb-auto">
            {/* <div>
              <h3 className="float-md-start mb-0">The Scatter</h3>
              <nav className={`nav ${styles['nav-masthead']} justify-content-center float-md-end`}>
                
              </nav>
            </div> */}
          </header>

          <main className="px-1">
            <h1>The Scatter</h1>
            <h5 className='text-muted'>The on-chain Blog</h5>
            <p className="lead mb-4">
              The Scatter is a blogging platform created inside the Polygon network.<br/>You can connect your wallet and publish posts.<br/>Happy Writing :) 
            </p>
            <p className="lead">
              {
                walletAddr ? (
                  <Link href={`/${walletAddr}/stories/`}>
                    <button type="button" className="btn btn-secondary">
                        Go to Dashboard
                    </button>
                  </Link>
                ) : (
                  <AccountConnection redirPath="home" />
                )
              }
              
            </p>
          </main>

          <footer className="mt-auto text-white-50">
            
          </footer>
        </div>
      </main>

    </react.Fragment>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  )
}