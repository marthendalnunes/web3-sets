import {
  EVMStateArtifacts,
  EntityResults,
  RuleOperationResults,
  RuleOperationResultsRef,
} from 'src/types'
import { RuleOperation, RuleOperationAfterBlockArgs } from 'src/types/set/rule'
import {
  extractOperationsTransactionField,
  flattenConditionOperationResults,
} from 'src/utils'

/**
 * @name ruleOperationAfterBlock
 * @description Check if a condition has occurred after a certain block
 * @param operation The operation containing the method and arguments
 * @param state The state containing the entity results, rules and artifacts
 * @returns Returns the result of the logic operation
 * @throws If the operation method is not 'afterBlock'
 * @throws If the operation arguments are invalid
 * @throws If the reference is invalid
 */
export function ruleOperationAfterBlock(
  { method, args }: RuleOperation,
  {
    entityResults,
    artifacts,
  }: {
    entityResults: EntityResults[]
    artifacts: EVMStateArtifacts
  },
): RuleOperationResults {
  if (method !== 'afterBlock') throw new Error('Invalid operation method')

  const safeArgs = RuleOperationAfterBlockArgs.safeParse(args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [blockNumber, refs] = safeArgs.data

  const conditions = flattenConditionOperationResults(entityResults)
  const references: Array<RuleOperationResultsRef | undefined> = refs.map(
    (ref) => {
      if (ref.startsWith('condition:')) {
        const match = conditions.find((item) => item.cid === ref)
        if (!match) throw new Error(`Could not find condition with cid ${ref}`)

        // Loop through all the operations and return the blockNumber of their artifacts
        const operationsBlockNumber = extractOperationsTransactionField({
          operations: match.operations,
          artifacts,
          transactionField: 'blockNumber',
        })

        // Check if all the operations have a blockNumber greater than the blockNumber passed in
        const result = operationsBlockNumber.every((operation) =>
          operation.some(
            (operationBlockNumber) =>
              operationBlockNumber &&
              BigInt(operationBlockNumber) > BigInt(blockNumber),
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
    status: references.every((ref) => ref?.status),
    references: references.filter(
      (item): item is RuleOperationResultsRef => item !== undefined,
    ),
  }
}
