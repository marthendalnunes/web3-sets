import { Transaction } from 'src/types'
import {
  ConditionOperation,
  ConditionOperationBetweenBlocksArgs,
} from 'src/types/set/condition'

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

  const safeArgs = ConditionOperationBetweenBlocksArgs.safeParse(operation.args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [lowerBlockLimit, upperBlockLimit] = safeArgs.data

  const bigIntBlockNumber = BigInt(transaction.blockNumber)
  const bigIntLowerBlockLimit = BigInt(lowerBlockLimit)
  const bigIntUpperBlockLimit = BigInt(upperBlockLimit)

  if (lowerBlockLimit >= upperBlockLimit) throw new Error('Invalid block range')

  return (
    bigIntBlockNumber > bigIntLowerBlockLimit &&
    bigIntBlockNumber < bigIntUpperBlockLimit
  )
}
