import { compareBigNumber } from 'src/comparators/compare-big-number'
import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'

/**
 * @name conditionOperationTransactionObserve
 * @description Check if a transaction argument is compliant with a condition operation
 * @param transaction The transaction to check
 * @param operation The operation containing the transaction argument set condition and comparator
 * @returns Returns true if the transaction has an argument value compliant with the set condition
 * @throws If the operation method is not 'observe' or the transaction has no value
 */
export function conditionOperationTransactionObserve(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'observe')
    throw new Error('Only observe operations are supported')

  switch (operation.type) {
    case 'uint256': {
      return compareBigNumber(
        operation.args[1],
        BigInt(operation.args[2]),
        // @ts-ignore
        BigInt(transaction.decoded.args[operation.args[0]]),
      )
    }
    default: {
      return false
    }
  }
}
