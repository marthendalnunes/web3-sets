import { compareBigNumber } from 'src/comparators/compare-big-number'
import { Transaction } from 'src/types'
import {
  ConditionOperation,
  ConditionOperationNonceArgs,
} from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionNonce
 * @description Check if a transaction nonce is compliant with a condition operation
 * @param transaction The transaction to check
 * @param operation The operation containing the nonce set condition and comparator
 * @returns Returns true if the transaction has a nonce compliant with the set condition
 * @throws If the operation method is not 'nonce' or the transaction has no nonce
 */
export function conditionOperationTransactionNonce(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'nonce')
    throw new Error('Only nonce operations are supported')

  const safeArgs = ConditionOperationNonceArgs.safeParse(operation.args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [comparator, nonce] = safeArgs.data

  return compareBigNumber(comparator, BigInt(nonce), BigInt(transaction.nonce))
}
