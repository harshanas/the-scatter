import react from 'react';
import Head from 'next/head';

import styles from '../assets/styles/Home.module.css'

export default function Home() {

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
              <button type="button" className="btn btn-secondary">Connect your Wallet</button>
            </p>
          </main>

          <footer className="mt-auto text-white-50">
            
          </footer>
        </div>
      </main>

    </react.Fragment>
  )
}
