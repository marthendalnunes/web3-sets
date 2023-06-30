import { z } from 'zod'

export const Log = z.object({
  blockNumber: z.number(),
  blockHash: z.string(),
  transactionIndex: z.number(),
  removed: z.boolean().optional(),
  address: z.string(),
  data: z.string(),
  topics: z.array(z.string()),
  transactionHash: z.string(),
  logIndex: z.number(),
  decoded: z
    .object({
      name: z.string(),
      signature: z.string(),
      topic: z.string(),
      args: z.unknown(),
    })
    .optional(),
})

export type Log = z.infer<typeof Log>

export const LogParsed = Log.extend({
  name: z.string(),
  signature: z.string(),
  topic: z.string(),
  args: z.unknown(),
})

export type LogParsed = z.infer<typeof LogParsed>

export const LogMatch = z.object({
  id: z.string(),
})

export type LogMatch = z.infer<typeof LogMatch>
