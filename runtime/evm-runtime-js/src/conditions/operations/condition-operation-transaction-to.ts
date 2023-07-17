import { Transaction } from 'src/types'
import {
  ConditionOperation,
  ConditionOperationToArgs,
} from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionTo
 * @description Check if a transaction has been sent to a specific address
 * @param transaction The transaction to check
 * @param operation The operation containing the to address
 * @returns Returns true if the transaction has been sent to the set condition to address
 * @throws If the operation method is not 'to' or the transaction has no to address
 */
export function conditionOperationTransactionTo(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'to')
    throw new Error('Only to operations are supported')

  if (!transaction.to) throw new Error('Transaction has no to address')

  const safeArgs = ConditionOperationToArgs.safeParse(operation.args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [to] = safeArgs.data

  return transaction.to.toLowerCase() === to.toLowerCase()
}
