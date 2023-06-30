import axios from 'axios'

import { TransactionsResponse } from '../../utils/types'

export async function appEtherscanAccountTransactions(params?: { chainId: number; address: string }) {
  try {
    const res = await fetch(`/api/etherscan/account/transactions${params ? `?chainId=${params.chainId}&address=${params.address}` : ''}`)
    return res.json()
  } catch (error) {
    throw new Error(`Unexpected Error`)
  }
}
