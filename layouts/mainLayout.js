import { useState, useMemo } from "react";
import { useRouter } from 'next/router'

import { AccountContext }  from "../lib/context"

import Navbar from './navbar'
import Footer from './footer'

export default function MainLayout({ children }) {
  const router = useRouter();
  
  const disAllowedPaths = ["/"];

  const [walletAddr, setWalletAddr] = useState(null);

  const value = useMemo(
    () => ({ walletAddr, setWalletAddr }), 
    [walletAddr]
  );

  return (
    <>
      <AccountContext.Provider value={value}>
        
        {
          !(disAllowedPaths.includes(router.asPath)) ? <Navbar/> : ''
        }
        <main className='container'>{children}</main>
        {
          !(disAllowedPaths.includes(router.asPath)) ?  <Footer /> : ''
        }
       
      </AccountContext.Provider>
    </>
  )
}