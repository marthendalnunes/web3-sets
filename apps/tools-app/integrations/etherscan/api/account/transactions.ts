import { getIronSession } from 'iron-session'
import { NextApiRequest } from 'next'
import { NextRequest } from 'next/server'

import { etherscanAccountTransactions } from '@/integrations/etherscan/actions/etherscan-account-transactions'
import { SERVER_SESSION_SETTINGS } from '@/lib/session'

export async function GET(req: NextRequest) {
  try {
    const res = new Response()

    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address')
    const chainId = searchParams.get('chainId')
    console.log(chainId)
    if (!address) {
      return new Response('Missing address', { status: 400 })
    }
    if (!chainId) {
      return new Response('Missing chainId', { status: 400 })
    }
    const startblock = searchParams.get('startblock')
    const endblock = searchParams.get('endblock')
    const page = searchParams.get('page')
    const offset = searchParams.get('offset')
    const config = {
      startblock: startblock ? Number(startblock) : 0,
      endblock: endblock ? Number(endblock) : 99999999,
      page: page ? Number(page) : 1,
      offset: offset ? Number(offset) : 0,
    }
    const transactions = await etherscanAccountTransactions(chainId, address, config)
    return new Response(JSON.stringify({ address: address, transactions }), {
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : String(e)
    console.log(errorMessage)
    return new Response(errorMessage, { status: 500 })
  }
}
