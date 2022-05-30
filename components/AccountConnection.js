import react, { useContext } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

import { AccountContext }  from "../lib/context";

export default function AccountConnection({ redirPath }) {
  const router = useRouter()
  const { walletAddr, setWalletAddr } = useContext(AccountContext);

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
        const accounts = await provider.listAccounts();
        setWalletAddr(accounts[0])  
  
        subscribeProvider(connection);

        if (redirPath == 'home'){
          router.push(`/${accounts[0]}/stories`);
        }

      } catch (err) {
        console.log('error:', err)
      }
  }
    
  async function subscribeProvider(provider){
    if (!provider.on) {
      return;
    }
  
    // Subscribe to accounts change
    provider.on("accountsChanged", (accounts) => {
      if (accounts.length > 0){
        setWalletAddr(accounts[0]) 
      }else{
        setWalletAddr(null)
      }
    });
  
    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
      console.log(chainId);
    });
  
    // Subscribe to provider connection
    provider.on("connect", (info) => {
      console.log(info);
    });
  
    // Subscribe to provider disconnection
    provider.on("disconnect", (error) => {
      console.log(error);
    });
  
  }

  return (
    <react.Fragment>
        {
            !walletAddr && (
                <button type="button" className="btn btn-secondary" onClick={connect}>
                    Connect Wallet
                </button>
            )
        }
        {
            walletAddr && (
              <>
                <span className="mr-2">{walletAddr} | </span>
                <Link href={`/${walletAddr}/stories/new`}>
                  <button type="button" className="btn btn-outline-secondary"><i className="fas fa-edit"></i></button>
                </Link>
              </>
            )
        }
    </react.Fragment>
  )
}