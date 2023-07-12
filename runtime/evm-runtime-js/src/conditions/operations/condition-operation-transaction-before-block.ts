import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'
import { ConditionOperationBeforeBlockArgs } from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionBeforeBlock
 * @description Check if a transaction has occurred before a certain block
 * @param transaction The transaction to check
 * @param operation The operation containing the block number
 * @returns Returns true if the transaction block number is less than the condition block number
 * @throws If the operation method is not 'beforeBlock' or the transaction has no block number
 */
export function conditionOperationTransactionBeforeBlock(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'beforeBlock')
    throw new Error('Only beforeBlock operations are supported')

  if (!transaction.blockNumber)
    throw new Error('Transaction has no blockNumber')

  const safeArgs = ConditionOperationBeforeBlockArgs.safeParse(operation.args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [blockNumber] = safeArgs.data

  return BigInt(transaction.blockNumber) < BigInt(blockNumber)
}
