import { compareBigNumber } from 'src/comparators/compare-big-number'
import { conditionAddress } from 'src/comparators/condition-address'
import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'
import { isStringOrNumber } from 'src/utils/is-string-or-number'
import { isValidComparator } from 'src/utils/is-valid-comparator'

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

  if (!transaction.decoded?.args)
    throw new Error('Transaction has no decoded arguments')

  if (
    operation.args.length !== 3 ||
    typeof operation.args[0] !== 'number' ||
    !isValidComparator(operation.args[1]) ||
    !isStringOrNumber(operation.args[2])
  )
    throw new Error('Invalid operation arguments')

  // TODO: Add validation of comparators to each operation type
  // Certain operation types should only support certain comparators
  switch (operation.type) {
    case 'uint256': {
      return compareBigNumber(
        operation.args[1],
        BigInt(operation.args[2]),
        // @ts-ignore
        BigInt(transaction.decoded.args[operation.args[0]]),
      )
    }

    case 'address': {
      // @ts-ignore
      const transactionArgument = transaction.decoded?.args[
        operation.args[0]
      ] as string

      return conditionAddress(
        operation.args[1],
        operation.args[2],
        transactionArgument,
      )
    }

    default: {
      return false
    }
  }
}
