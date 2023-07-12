import { Transaction } from 'src/types'
import {
  ConditionOperation,
  ConditionOperationBetweenTimestampsArgs,
} from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionBetweenTimestamps
 * @description Check if a transaction has occurred between two timestamps
 * @param transaction The transaction to check
 * @param operation The operation containing the set condition timestamps
 * @returns Returns true if the transaction timestamp is between the set condition timestamps
 * @throws If the operation method is not 'betweenTimestamps' or the transaction has no timestamp
 */
export function conditionOperationTransactionBetweenTimestamps(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'betweenTimestamps')
    throw new Error('Only betweenTimestamps operations are supported')

  if (!transaction.timeStamp) throw new Error('Transaction has no timeStamp')

  const safeArgs = ConditionOperationBetweenTimestampsArgs.safeParse(
    operation.args,
  )
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [lowerTimestampLimit, upperTimestampLimit] = safeArgs.data

  const bigIntTimeStamp = BigInt(transaction.timeStamp)
  const bigIntLowerTimestampLimit = BigInt(lowerTimestampLimit)
  const bigIntUpperTimestampLimit = BigInt(upperTimestampLimit)

  if (lowerTimestampLimit >= upperTimestampLimit)
    throw new Error('Invalid timestamp range')

  return (
    bigIntTimeStamp > bigIntLowerTimestampLimit &&
    bigIntTimeStamp < bigIntUpperTimestampLimit
  )
}
