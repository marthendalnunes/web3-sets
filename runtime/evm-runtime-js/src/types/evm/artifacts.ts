import { Log } from './log'
import { Transaction } from './transaction'
import { TransactionReceipt } from './transaction-receipt'
import { z } from 'zod'

export const EVMStateArtifacts = z.object({
  transactions: z.array(Transaction).optional(),
  receipts: z.array(TransactionReceipt).optional(),
  logs: z.array(Log).optional(),
})

export type EVMStateArtifacts = z.infer<typeof EVMStateArtifacts>
