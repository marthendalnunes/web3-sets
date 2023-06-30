// import { Abi } from 'abitype/zod'
import { z } from 'zod'

export const Entity = z.object({
  id: z.string(),
  address: z.string(),
  chainId: z.number(),
  name: z.string().optional(),
  abi: z.union([z.string(), z.record(z.unknown())]),
  // abi: z.union([z.string(), Abi]),
})

export type Entity = z.infer<typeof Entity>
