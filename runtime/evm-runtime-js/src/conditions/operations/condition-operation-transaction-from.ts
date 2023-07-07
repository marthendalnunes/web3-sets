import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionFrom
 * @description Check if a transaction has been sent from a specific address
 * @param transaction The transaction to check
 * @param operation The operation containing the from address
 * @returns Returns true if the transaction has been sent from the set condition from address
 * @throws If the operation method is not 'from' or the transaction has no from address
 */
export function conditionOperationTransactionFrom(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'from')
    throw new Error('Only from operations are supported')

  if (!transaction.from) throw new Error('Transaction has no from address')

  return transaction.from.toLowerCase() === operation.args[0].toLowerCase()
}
