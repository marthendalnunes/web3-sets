import { compareBigNumber } from 'src/comparators/compare-big-number'
import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'
import { isStringOrNumber } from 'src/utils/is-string-or-number'
import { isValidComparator } from 'src/utils/is-valid-comparator'

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

  if (
    operation.args.length !== 2 ||
    !isValidComparator(operation.args[0]) ||
    !isStringOrNumber(operation.args[1])
  )
    throw new Error('Invalid operation arguments')

  return compareBigNumber(
    operation.args[0],
    BigInt(operation.args[1]),
    BigInt(transaction.value),
  )
}
