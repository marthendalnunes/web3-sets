import { ConditionOperationResults, ConditionResult, Transaction } from '..'
import { Condition } from '../types/set/condition'
import { compareConditionOperationToDecodedTransactionData } from './compare-condition-operation-to-decoded-transaction-data'

export function filterTransactionReceiptsMatchingConditionOperations({
  condition,
  transactions,
}: {
  condition: Condition
  transactions?: Transaction[]
}): ConditionResult {
  if (!transactions) {
    throw new Error(
      'filterTransactionReceiptsMatchingConditionOperations requires transactions',
    )
  }
  // Web3 Sets use a function with a signature like:
  // `set(uint256, bool)`
  // We want to compare the function name, not the signature
  // so we split the signature on the first `(` and take the first
  // part of the string.
  // When we use viem.decodeFunctionData to parse the transaction
  // data, we get a `functionName` property that is just the function name.
  const conditionOperationResults = {
    cid: condition.id,
    status: false,
    operations: [] as ConditionOperationResults[],
  } as ConditionResult

  const conditionFunctionName = condition?.signature.split('(')[0]

  for (let index = 0; index < condition.operations.length; index++) {
    const _condition_operation = condition.operations[index]

    const _filtered = transactions
      .map((tx: Transaction) => {
        if (
          tx?.decoded?.args &&
          tx?.decoded?.functionName === conditionFunctionName
        ) {
          const _comparator = compareConditionOperationToDecodedTransactionData(
            tx,
            _condition_operation,
          )
          if (_comparator) {
            return {
              id: tx.hash,
              reference: 'transaction',
            }
          } else {
            return null
          }
        } else {
          return null
        }
      })
      .filter((tx) => tx !== null)
    // console.log(_filtered, '_filtered')

    conditionOperationResults.operations.push({
      status: _filtered.length > 0,
      // @ts-ignore
      artifacts: _filtered || [],
    })
  }

  // @ts-ignore
  return {
    cid: condition.id,
    status: conditionOperationResults.operations.every(
      (operation) => operation.status === true,
    ),
    operations: conditionOperationResults.operations,
  }
}
