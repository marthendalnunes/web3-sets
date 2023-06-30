import axios from 'axios'

import { TransactionsResponse } from '../../utils/types'

export async function appEtherscanAccountTransactions(params?: { chainId: number; address: string }): Promise<{
  transactions: TransactionsResponse
  address: string
}> {
  try {
    const res = await fetch(`/api/etherscan/account/transactions${params ? `?chainId=${params.chainId}&address=${params.address}` : ''}`)
    const data = res.json()
    return {
      transactions: data.transactions,
      address: params.address,
    }
  } catch (error) {
    throw new Error(`Unexpected Error`)
  }
}
