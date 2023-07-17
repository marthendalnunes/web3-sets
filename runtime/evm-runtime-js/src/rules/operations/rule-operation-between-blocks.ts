import {
  EVMStateArtifacts,
  EntityResults,
  RuleOperationResults,
  RuleOperationResultsRef,
} from 'src/types'
import {
  RuleOperation,
  RuleOperationBetweenBlocksArgs,
} from 'src/types/set/rule'
import {
  extractOperationsTransactionField,
  flattenConditionOperationResults,
} from 'src/utils'

/**
 * @name ruleOperationBetweenBlocks
 * @description Check if a condition has occurred between a certain block range
 * @param operation The operation containing the method and arguments
 * @param state The state containing the entity results, rules and artifacts
 * @returns Returns the result of the logic operation
 * @throws If the operation method is not 'betweenBlocks'
 * @throws If the operation arguments are invalid
 * @throws If the reference is invalid
 * @throws If the block range is invalid
 */
export function ruleOperationBetweenBlocks(
  { method, args }: RuleOperation,
  {
    entityResults,
    artifacts,
  }: {
    entityResults: EntityResults[]
    artifacts: EVMStateArtifacts
  },
): RuleOperationResults {
  if (method !== 'betweenBlocks') throw new Error('Invalid operation method')

  const safeArgs = RuleOperationBetweenBlocksArgs.safeParse(args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const [lowerBlockLimit, upperBlockLimit, refs] = safeArgs.data

  const bigIntLowerBlockLimit = BigInt(lowerBlockLimit)
  const bigIntUpperBlockLimit = BigInt(upperBlockLimit)
  if (lowerBlockLimit >= upperBlockLimit) throw new Error('Invalid block range')

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

        // Check if all the operations have a blockNumber in the block range passed in
        const result = operationsBlockNumber.every((operation) =>
          operation.some(
            (operationBlockNumber) =>
              operationBlockNumber &&
              BigInt(operationBlockNumber) > bigIntLowerBlockLimit &&
              BigInt(operationBlockNumber) < bigIntUpperBlockLimit,
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
