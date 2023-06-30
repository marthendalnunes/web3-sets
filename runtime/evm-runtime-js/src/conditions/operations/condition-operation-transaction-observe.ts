import { compareBigNumber } from 'src/comparators/compare-big-number'
import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'

export function conditionOperationTransactionObserve(
  transaction: Transaction,
  operation: ConditionOperation,
): Boolean {
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
