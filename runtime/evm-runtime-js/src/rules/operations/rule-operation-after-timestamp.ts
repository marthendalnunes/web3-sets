import {
  EVMStateArtifacts,
  EntityResults,
  RuleOperationResults,
  RuleOperationResultsRef,
} from 'src/types'
import {
  RuleOperation,
  RuleOperationAfterTimestampArgs,
} from 'src/types/set/rule'
import {
  extractOperationsTransactionField,
  flattenConditionOperationResults,
} from 'src/utils'

/**
 * @name ruleOperationAfterTimestamp
 * @description Check if a condition has occurred after a certain timestamp
 * @param operation The operation containing the method and arguments
 * @param state The state containing the entity results, rules and artifacts
 * @returns Returns the result of the logic operation
 * @throws If the operation method is not 'afterTimestamp'
 * @throws If the operation arguments are invalid
 * @throws If the reference is invalid
 */
export function ruleOperationAfterTimestamp(
  { method, args }: RuleOperation,
  {
    entityResults,
    artifacts,
  }: {
    entityResults: EntityResults[]
    artifacts: EVMStateArtifacts
  },
): RuleOperationResults {
  if (method !== 'afterTimestamp') throw new Error('Invalid operation method')

  const safeArgs = RuleOperationAfterTimestampArgs.safeParse(args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [timeStamp, refs] = safeArgs.data

  const conditions = flattenConditionOperationResults(entityResults)
  const references: Array<RuleOperationResultsRef | undefined> = refs.map(
    (ref) => {
      if (ref.startsWith('condition:')) {
        const match = conditions.find((item) => item.cid === ref)
        if (!match) throw new Error(`Could not find condition with cid ${ref}`)

        // Loop through all the operations and return the timestamp of their artifacts
        const operationsTimestamp = extractOperationsTransactionField({
          operations: match.operations,
          artifacts,
          transactionField: 'timeStamp',
        })

        // Check if all the operations have a timestamp greater than the timestamp passed in
        const result = operationsTimestamp.every((operation) =>
          operation.some(
            (operationTimestamp) =>
              operationTimestamp &&
              BigInt(operationTimestamp) > BigInt(timeStamp),
          ),
        )

        return {
          id: match.cid,
          status: result,
          reference: 'condition',
        }
      }

      throw new Error(`${ref} is not a valid reference`)
    },
  )

  return {
    method,
    status: references.every((ref) => ref?.status === true),
    references: references.filter(
      (item): item is RuleOperationResultsRef => item !== undefined,
    ),
  }
}
