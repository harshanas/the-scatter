import react from 'react'
import { useState } from 'react'
import Header from "../layouts/Header";
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import { ownerAddress } from '../config'

import '../styles/globals.css'
import "../styles/bootstrap.min.css"
import 'easymde/dist/easymde.min.css'

function MyApp({ Component, pageProps }) {
  
  const [account, setAccount] = useState(null)
  
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: { 
            infuraId: ""
          },
        },
      },
    })
    return web3Modal
  }

  async function connect() {
    try {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setAccount(accounts[0])
    } catch (err) {
      console.log('error:', err)
    }
  }

  return (
    <react.Fragment>
      <Header account={account} connect={connect}/>
      <AccountContext.Provider value={account}>
        <Component {...pageProps} connect={connect} />
      </AccountContext.Provider>
    </react.Fragment>
  )
}

export default MyApp
