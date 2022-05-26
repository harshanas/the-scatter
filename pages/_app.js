import react from 'react'
import { useState } from 'react'
import Header from "../layouts/Header";
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { AccountContext } from '../context.js'
import { contractAddress } from '../config';
import Scatter from '../artifacts/contracts/Scatter.sol/Scatter.json';

import '../styles/globals.css'
import "../styles/bootstrap.min.css"
import 'easymde/dist/easymde.min.css'

function MyApp({ Component, pageProps }) {
  
  const [account, setAccount] = useState(null);
  const [roles, setRoles] = useState(null);
  
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

      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, Scatter.abi, signer)
        try {
          const roles = await contract.getRoles()
          setRoles(roles);
        } catch (err) {
          console.log('Error: ', err)
        }
      }    

    } catch (err) {
      console.log('error:', err)
    }
  }

  return (
    <react.Fragment>
      
      <AccountContext.Provider value={{account:account, roles:roles}}>
        <Header connect={connect}/>
        <Component {...pageProps} connect={connect} />
      </AccountContext.Provider>
    </react.Fragment>
  )
}

export default MyApp
