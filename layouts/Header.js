import Head from 'next/head'
import react from 'react'

export default function Header() {
  return (
    <react.Fragment>
      <Head>
        <title>Newsblocks by Scatter</title>
        <meta name="description" content="Newsbloks created by Scatter - the Decentralized CMS" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Text&family=Roboto&display=swap" rel="stylesheet"/>
      </Head>
    {/* begin::Navbar */}
    <nav className="navbar">
        <div className="container">
          <span className="navbar-brand mx-auto">Newsblocks</span>
          <form className="d-flex">
            <button type="button" className="btn btn-primary">
                <i className="fa-solid fa-wallet"></i>
                Connect Wallet
            </button>
          </form>
        </div>
    </nav>
    {/* end::Navbar */}

    {/* begin::Categories */}
    <div className='container'>
        <ul className="nav">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Active</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
        </ul>
    </div>
    
    {/* end::Categories */}
      
    </react.Fragment>
  )
}
