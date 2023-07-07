import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionBetweenBlocks
 * @description Check if a transaction has occurred between two blocks
 * @param transaction The transaction to check
 * @param operation The operation containing the set condition block numbers
 * @returns Returns true if the transaction block number is between the condition block numbers
 * @throws If the operation method is not 'betweenBlocks', the transaction has no block number or the block range is invalid
 */
export function conditionOperationTransactionBetweenBlocks(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'betweenBlocks')
    throw new Error('Only betweenBlocks operations are supported')

  if (!transaction.blockNumber)
    throw new Error('Transaction has no blockNumber')

  const blockNumber = BigInt(transaction.blockNumber)
  const lowerBlockLimit = BigInt(operation.args[0])
  const upperBlockLimit = BigInt(operation.args[1])

  if (lowerBlockLimit >= upperBlockLimit) throw new Error('Invalid block range')

  return blockNumber > lowerBlockLimit && blockNumber < upperBlockLimit
}
