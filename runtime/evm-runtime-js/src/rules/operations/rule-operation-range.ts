import {
  EntityResults,
  RuleOperationResults,
  RuleOperationResultsRef,
} from 'src/types'
import { Rule, RuleOperation, RuleOperationRangeArgs } from 'src/types/set/rule'
import { flattenConditionOperationResults } from 'src/utils/flatten-condition-operation-results'

/**
 * @name ruleOperationRange
 * @description Check if one of the list of conditions and rules are satisfied
 * @param operation The operation containing the method and arguments
 * @param state The state containing the entity results, rules and artifacts
 * @returns Returns the result of the logic operation
 * @throws If the operation method is not 'oneOf'
 * @throws If the operation arguments are invalid
 * @throws If the reference is invalid
 */
export function ruleOperationRange(
  { method, args }: RuleOperation,
  {
    entityResults,
  }: {
    entityResults: EntityResults[]
    rules: Rule[]
  },
): RuleOperationResults {
  if (method !== 'range') throw new Error('Invalid operation method')

  const safeArgs = RuleOperationRangeArgs.safeParse(args)
  if (!safeArgs.success) throw new Error('Invalid operation arguments')

  const refConditions = safeArgs.data

  const conditions = flattenConditionOperationResults(entityResults)
  const references: Array<Array<RuleOperationResultsRef | undefined>> =
    refConditions.map((refs) =>
      refs.map((ref) => {
        if (ref.startsWith('condition:')) {
          const match = conditions.find((item) => item.cid === ref)
          if (!match)
            throw new Error(`Could not find condition with cid ${ref}`)

          return {
            id: match.cid,
            status: match.status,
            reference: 'condition',
          }
        }
        if (ref.startsWith('rule:')) {
          return undefined
          // TODO: Add rule support using recursion here
        }

        throw new Error(`${ref} is not a valid reference`)
      }),
    )

  return {
    method,
    status: references.some((ref) =>
      ref.every((item) => item?.status === true),
    ),
    references: references.map((reference) =>
      reference.filter(
        (item): item is RuleOperationResultsRef => item !== undefined,
      ),
    ),
  }
}
