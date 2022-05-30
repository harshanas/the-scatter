import { useContext } from "react"
import Head from 'next/head'
import react from 'react'
import Link from 'next/link'
import Image from "next/image"

import AccountConnection from '../components/AccountConnection';
import { AccountContext }  from "../lib/context";

import scatterLogo from "../public/images/logo.png";

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
                <a className="navbar-brand img-responsive"><Image src={scatterLogo}/></a>
              </Link>
            ) : (
              <Link href="/">
                <a className="navbar-brand img-responsive"><Image src={scatterLogo}/></a>
              </Link>
            )
          }
          
          <div>
            <AccountConnection redirPath={null} />
          </div>
          
          
        </div>
    </nav>
    {/* end::Navbar */}
      
    </react.Fragment>
  )
}