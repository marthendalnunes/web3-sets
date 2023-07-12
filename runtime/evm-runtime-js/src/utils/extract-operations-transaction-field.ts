import {
  ConditionOperationResults,
  EVMStateArtifacts,
  Transaction,
} from 'src/types'

/**
 * @name extractOperationsTransactionField
 * @description Extract fields from the transaction of operations
 * @param operations The operations to extract the transaction fields from
 * @param artifacts The artifacts containing the transactions
 * @param transactionField The transaction field to extract
 * @returns Returns the transaction fields
 */
export function extractOperationsTransactionField({
  operations,
  artifacts,
  transactionField,
}: {
  operations: ConditionOperationResults[]
  artifacts: EVMStateArtifacts
  transactionField: Exclude<keyof Transaction, 'logs' | 'decoded'>
}) {
  return operations.map(({ artifacts: matchArtifacts }) =>
    matchArtifacts.map(
      ({ id }) =>
        artifacts.transactions?.find((item) => item.hash === id)?.[
          transactionField
        ],
    ),
  )
}
