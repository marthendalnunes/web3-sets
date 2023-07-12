import { compareBigNumber } from 'src/comparators/compare-big-number'
import { Transaction } from 'src/types'
import {
  ConditionOperation,
  ConditionOperationValueArgs,
} from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionValue
 * @description Check if a transaction value is compliant with a condition operation
 * @param transaction The transaction to check
 * @param operation The operation containing the value set condition and comparator
 * @returns Returns true if the transaction has a value compliant with the set condition
 * @throws If the operation method is not 'value' or the transaction has no value
 */
export function conditionOperationTransactionValue(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'value')
    throw new Error('Only value operations are supported')

  const safeArgs = ConditionOperationValueArgs.safeParse(operation.args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [comparator, value] = safeArgs.data

  return compareBigNumber(comparator, BigInt(value), BigInt(transaction.value))
}
