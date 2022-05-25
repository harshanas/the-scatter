import Head from 'next/head'
import react from 'react'

export default function Header() {
  return (
    <react.Fragment>
      <Head>
        <title>Newsblocks by Scatter</title>
        <meta name="description" content="Newsblocks created by Scatter - the Decentralized CMS" />
      </Head>
    {/* begin::Navbar */}
    <nav className="navbar">
        <div className="container">
          <span className="navbar-brand">Newsblocks</span>
          <form className="d-flex">
            <button type="button" className="btn btn-primary">
                <i className="fa-solid fa-wallet"></i>
                Connect Wallet
            </button>
          </form>
        </div>
    </nav>
    {/* end::Navbar */}

    
      
    </react.Fragment>
  )
}
