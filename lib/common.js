import { ethers } from 'ethers'

const PROVIDERS = {
    'testnet': "https://rpc-mumbai.matic.today",
    'mainnet': "https://polygon-rpc.com/"
}
export function getRpcProvider(){    
    return process.env.ENVIRONMENT === 'local' ? new ethers.providers.JsonRpcProvider() : new ethers.providers.JsonRpcProvider(PROVIDERS[process.env.ENVIRONMENT]);
}