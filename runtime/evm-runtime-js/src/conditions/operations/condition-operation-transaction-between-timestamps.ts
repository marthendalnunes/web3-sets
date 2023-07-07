import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'
import { isStringOrNumber } from 'src/utils/is-string-or-number'

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

  if (operation.args.length !== 2 || !isStringOrNumber(operation.args))
    throw new Error('Invalid operation arguments')

  const timeStamp = BigInt(transaction.timeStamp)
  const lowerTimestampLimit = BigInt(operation.args[0])
  const upperTimestampLimit = BigInt(operation.args[1])

  if (lowerTimestampLimit >= upperTimestampLimit)
    throw new Error('Invalid timestamp range')

  return timeStamp > lowerTimestampLimit && timeStamp < upperTimestampLimit
}
