import {
  EntityResults,
  RuleOperationResults,
  RuleOperationResultsRef,
} from 'src/types'
import { Rule, RuleOperation } from 'src/types/set/rule'
import { debugRuntime } from 'src/utils/debug'
import { flattenConditionOperationResults } from 'src/utils/flatten-condition-operation-results'

export function ruleOperationAll(
  rule: RuleOperation,
  state: {
    entityResults: EntityResults[]
    rules: Rule[]
  },
): RuleOperationResults {
  const { entityResults, rules } = state
  const refs: string[] = rule.args
  const conditions = flattenConditionOperationResults(entityResults)
  const references: Array<RuleOperationResultsRef | undefined> = refs.map(
    (ref) => {
      if (ref.startsWith('condition:')) {
        const match = conditions.find((item) => item.cid === ref)
        if (match) {
          return {
            id: match.cid,
            status: match.status,
            reference: 'condition',
          }
        }
      }
      if (ref.startsWith('rule:')) {
        return undefined
        // TODO: Add rule support using recursion here
      }

      // TODO: We should throw an error here if we can't find the reference
      return undefined
    },
  )

  return {
    status: references.every((ref) => ref?.status === true),
    method: 'all',
    references: references.filter((item) => item !== undefined),
  }
}
