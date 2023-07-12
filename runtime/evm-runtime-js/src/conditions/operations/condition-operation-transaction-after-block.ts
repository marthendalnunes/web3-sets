import { Transaction } from 'src/types'
import {
  ConditionOperation,
  ConditionOperationAfterBlockArgs,
} from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionAfterBlock
 * @description Check if a transaction has occurred after a certain block
 * @param transaction The transaction to check
 * @param operation The operation containing the block number
 * @returns Returns true if the transaction block number is less than the condition block number
 * @throws If the operation method is not 'afterBlock' or the transaction has no block number
 */
export function conditionOperationTransactionAfterBlock(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'afterBlock')
    throw new Error('Only afterBlock operations are supported')

  if (!transaction.blockNumber)
    throw new Error('Transaction has no blockNumber')

  const safeArgs = ConditionOperationAfterBlockArgs.safeParse(operation.args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [blockNumber] = safeArgs.data

  return BigInt(transaction.blockNumber) > BigInt(blockNumber)
}
