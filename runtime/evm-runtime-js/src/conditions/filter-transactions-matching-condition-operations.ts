import {
  TransactionParsed,
  TransactionReceiptMatch,
  TransactionReceiptParsed,
} from '../types'
import { compareConditionOperationToDecodedTransactionData } from 'src/conditions/compare-condition-operation-to-decoded-transaction-data'

export function filterTransactionsMatchingConditions({
  condition,
  transactions,
}: {
  condition: any
  transactions: TransactionReceiptParsed[] | null
}): TransactionReceiptMatch[] {
  if (!transactions) {
    return []
  }
  // Web3 Sets use a function with a signature like:
  // `set(uint256, bool)`
  // We want to compare the function name, not the signature
  // so we split the signature on the first `(` and take the first
  // part of the string.
  // When we use viem.decodeFunctionData to parse the transaction
  // data, we get a `functionName` property that is just the function name.
  const conditionFunctionName = condition?.signature.split('(')[0]
  const filtered = transactions
    .map((tx: TransactionParsed) => {
      if (tx?.args && tx.functionName === conditionFunctionName) {
        const _comparator = compareConditionOperationToDecodedTransactionData(
          // @ts-ignore
          tx,
          condition.operations,
        )
        return true
      } else {
        return null
      }
    })
    .filter((tx) => tx !== null)

  // @ts-ignore
  return filtered
}
