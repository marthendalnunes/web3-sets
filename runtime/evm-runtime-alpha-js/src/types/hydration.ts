import { Condition, Rule } from './input'
import { z } from 'zod'

// --------------------------------
// Transaction
// --------------------------------
export const Transaction = z.object({
  hash: z.string(),
  functionName: z.string(),
  args: z.array(z.any()),
})

export type Transaction = z.infer<typeof Transaction>

export const TransactionMatched = z.object({
  isSuccess: z.boolean(),
  cid: z.string(),
  object: z.string(),
  hash: z.string(),
  data: z.object({
    matched: z.number(),
    total: z.number(),
    conditions: z.array(z.boolean()),
  }),
})

export type TransactionMatched = z.infer<typeof TransactionMatched>

// --------------------------------
// Log
// --------------------------------
export const LogParsed = z.object({
  hash: z.string(),
  functionName: z.string(),
  args: z.array(z.any()),
})

export type LogParsed = z.infer<typeof LogParsed>

export const LogMatched = z.object({
  isSuccess: z.boolean(),
  cid: z.string(),
  object: z.string(),
  hash: z.string(),
  data: z.object({
    matched: z.number(),
    total: z.number(),
    conditions: z.array(z.boolean()),
  }),
})

export type LogMatched = z.infer<typeof LogMatched>

// --------------------------------
// Entity
// --------------------------------
export const EntityHydrated = z.object({
  name: z.string(),
  address: z.string(),
  chainId: z.number(),
  abi: z.any(), // TODO: Use https://abitype.dev/
  conditions: z.array(Condition),
  state: z.object({
    raw: z.object({
      transactions: z.array(z.any()),
      logs: z.array(z.any()),
    }),
    parsed: z.object({
      transactions: z.array(Transaction).nullable(),
      logs: z.array(z.any()),
    }),
  }),
  matches: z.object({
    transactions: z.array(TransactionMatched).nullable(),
    logs: z.array(LogMatched).nullable(),
  }),
})

export type EntityHydrated = z.infer<typeof EntityHydrated>

export const SmartContractSetHydrated = z.object({
  clients: z.array(z.any()), // Client[]
  entities: z.array(EntityHydrated),
  rules: z.array(Rule),
})

export type SmartContractSetHydrated = z.infer<typeof SmartContractSetHydrated>
