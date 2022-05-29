import { useContext } from "react"
import Head from 'next/head'
import react from 'react'
import Link from 'next/link'

import AccountConnection from '../components/AccountConnection';
import { AccountContext }  from "../lib/context";

export default function Navbar() {
  const { walletAddr, setWalletAddr } = useContext(AccountContext);

  return (
    <react.Fragment>
      <Head>
        <title>The Scatter - The on-chain blog</title>
        <meta name="description" content="The on-chain blog" />
      </Head>

    {/* begin::Navbar */}
    <nav className="navbar">
        <div className="container">
          {
            walletAddr ? (
              <Link href={`/${walletAddr}/stories`}>
                <a className="navbar-brand">The Scatter</a>
              </Link>
            ) : (
              <Link href="/">
                <a className="navbar-brand">The Scatter</a>
              </Link>
            )
          }
          
          
          <AccountConnection redirPath={null} />
          
        </div>
    </nav>
    {/* end::Navbar */}
      
    </react.Fragment>
  )
}