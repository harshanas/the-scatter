import { createContext } from 'react'

export const AccountContext = createContext({
    walletAddr : null,
    setWalletAddr : (walletAddr) => {}
})