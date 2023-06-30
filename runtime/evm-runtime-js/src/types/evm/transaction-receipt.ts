import { z } from 'zod'

export const TransactionReceipt = z.object({
  blockHash: z.string().nullable(),
  blockNumber: z.string().nullable(),
  hash: z.string(),
  transactionIndex: z.string().nullable(),
  from: z.string(),
  to: z.string().nullable(),
  cumulativeGasUsed: z.string(),
  gasUsed: z.string(),
  contractAddress: z.string().nullable(),
  logs: z
    .array(
      z.object({
        address: z.string(),
        topics: z.array(z.string()),
        data: z.string(),
      }),
    )
    .optional(),
  status: z.string(),
  gas: z.string(),
  input: z.string(),
  nonce: z.string(),
  r: z.string().optional(),
  s: z.string().optional(),
  v: z.string().optional(),
  typeHex: z.string().optional(),
  value: z.string(),
})

export type TransactionReceipt = z.infer<typeof TransactionReceipt>

export const TransactionReceiptParsed = z.object({
  hash: z.string(),
  functionName: z.string(),
  args: z.unknown(),
})

export type TransactionReceiptParsed = z.infer<typeof TransactionReceiptParsed>

export const TransactionReceiptMatch = z.object({
  id: z.string(),
})

export type TransactionReceiptMatch = z.infer<typeof TransactionReceiptMatch>
