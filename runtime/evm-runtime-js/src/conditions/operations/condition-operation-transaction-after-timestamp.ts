import { Transaction } from 'src/types'
import {
  ConditionOperation,
  ConditionOperationAfterTimestampArgs,
} from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionAfterTimestamp
 * @description Check if a transaction has occurred after a certain timestamp
 * @param transaction The transaction to check
 * @param operation The operation containing the set condition timestamp
 * @returns Returns true if the transaction timestamp is less than the set condition timestamp
 * @throws If the operation method is not 'afterTimestamp' or the transaction has no timestamp
 */
export function conditionOperationTransactionAfterTimestamp(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'afterTimestamp')
    throw new Error('Only afterTimestamp operations are supported')

  if (!transaction.timeStamp) throw new Error('Transaction has no timeStamp')

  const safeArgs = ConditionOperationAfterTimestampArgs.safeParse(
    operation.args,
  )
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [timeStamp] = safeArgs.data

  return BigInt(transaction.timeStamp) > BigInt(timeStamp)
}
