import Head from 'next/head'
import react from 'react'
import Link from 'next/link'

export default function Header() {
  
  
  return (
    <react.Fragment>
      <Head>
        <title>The Scatter - The on-chain blog</title>
        <meta name="description" content="The on-chain blog" />
      </Head>
    {/* begin::Navbar */}
    <nav className="navbar">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">The Scatter</a>
          </Link>
          
          <button type="button" className="btn btn-secondary">
            Connect Wallet
        </button>
        </div>
    </nav>
    {/* end::Navbar */}
      
    </react.Fragment>
  )
}