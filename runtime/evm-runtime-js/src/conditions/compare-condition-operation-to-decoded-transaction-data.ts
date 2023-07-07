import { Transaction } from '../types'
import { ConditionOperation } from '../types/set/condition'
import {
  conditionOperationTransactionAfterBlock,
  conditionOperationTransactionAfterTimestamp,
  conditionOperationTransactionBeforeBlock,
  conditionOperationTransactionBeforeTimestamp,
  conditionOperationTransactionBetweenBlocks,
  conditionOperationTransactionBetweenTimestamps,
  conditionOperationTransactionFrom,
  conditionOperationTransactionNonce,
  conditionOperationTransactionObserve,
  conditionOperationTransactionTo,
  conditionOperationTransactionValue,
} from './operations'

export function compareConditionOperationToDecodedTransactionData(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  switch (operation.method) {
    case 'observe': {
      return conditionOperationTransactionObserve(transaction, operation)
    }
    case 'beforeBlock': {
      return conditionOperationTransactionBeforeBlock(transaction, operation)
    }
    case 'afterBlock': {
      return conditionOperationTransactionAfterBlock(transaction, operation)
    }
    case 'betweenBlocks': {
      return conditionOperationTransactionBetweenBlocks(transaction, operation)
    }
    case 'beforeTimestamp': {
      return conditionOperationTransactionBeforeTimestamp(
        transaction,
        operation,
      )
    }
    case 'afterTimestamp': {
      return conditionOperationTransactionAfterTimestamp(transaction, operation)
    }
    case 'betweenTimestamps': {
      return conditionOperationTransactionBetweenTimestamps(
        transaction,
        operation,
      )
    }
    case 'to': {
      return conditionOperationTransactionTo(transaction, operation)
    }
    case 'from': {
      return conditionOperationTransactionFrom(transaction, operation)
    }
    case 'value': {
      return conditionOperationTransactionValue(transaction, operation)
    }
    case 'nonce': {
      return conditionOperationTransactionNonce(transaction, operation)
    }
    default: {
      throw new Error(`Unsupported operation method: ${operation.method}`)
    }
  }
}
