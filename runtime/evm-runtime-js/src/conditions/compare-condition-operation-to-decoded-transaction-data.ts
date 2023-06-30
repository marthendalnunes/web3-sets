import { Transaction } from '../types'
import { ConditionOperation } from '../types/set/condition'
import { conditionOperationTransactionObserve } from './operations/condition-operation-transaction-observe'

export function compareConditionOperationToDecodedTransactionData(
  transaction: Transaction,
  operation: ConditionOperation,
): Boolean {
  switch (operation.method) {
    case 'observe': {
      return conditionOperationTransactionObserve(transaction, operation)
    }
    case 'beforeBlock': {
      return false
    }
    case 'afterBlock': {
      return false
    }
    case 'betweenBlocks': {
      return false
    }
    case 'beforeTimestamp': {
      return false
    }
    case 'afterTimestamp': {
      return false
    }
    case 'betweenTimestamps': {
      return false
    }
    case 'to': {
      return false
    }
    case 'from': {
      return false
    }
    case 'value': {
      return false
    }
    case 'nonce': {
      return false
    }
    default: {
      throw new Error(`Unsupported operation method: ${operation.method}`)
    }
  }
}
