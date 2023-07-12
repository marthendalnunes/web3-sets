import { compareBigNumber } from 'src/comparators/compare-big-number'
import { conditionAddress } from 'src/comparators/condition-address'
import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'
import { ConditionOperationObserveArgs } from 'src/types/set/condition'

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

  const safeArgs = ConditionOperationObserveArgs.safeParse(operation.args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [key, operator, value] = safeArgs.data

  // TODO: Add validation of comparators to each operation type
  // Certain operation types should only support certain comparators
  switch (operation.type) {
    case 'uint256': {
      return compareBigNumber(
        operator,
        BigInt(value),
        // @ts-ignore
        BigInt(transaction.decoded.args[key]),
      )
    }

    case 'address': {
      // @ts-ignore
      const transactionArgument = transaction.decoded?.args[key] as string

      return conditionAddress(operator, value as string, transactionArgument)
    }

    default: {
      return false
    }
  }
}
