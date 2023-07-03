import { Client, createPublicClient, http } from 'viem'
import { arbitrum, mainnet, optimism, polygon } from 'viem/chains'

export const mainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export const optimismClient = createPublicClient({
  chain: optimism,
  transport: http(),
})

export const arbitrumClient = createPublicClient({
  chain: arbitrum,
  transport: http(),
})

export const polygonClient = createPublicClient({
  chain: polygon,
  transport: http(),
})

export const chainClients = {
  1: mainnetClient,
  10: optimismClient,
  42161: arbitrumClient,
  137: polygonClient,
}

export function getClient(chainId: number): Client {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const client = chainClients[chainId]

  if (!client) {
    return mainnetClient
  }
  return client
}
