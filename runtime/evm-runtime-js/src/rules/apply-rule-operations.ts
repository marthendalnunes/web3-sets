import { EntityResults, RuleOperationResults, RuleResults } from '../types'
import { Rule, RuleOperation } from '../types/set/rule'
import { ruleOperationAll } from './operations/rule-operation-all'
import { ruleOperationOneOf } from './operations/rule-operation-oneOf'

export function applyRuleOperations(
  entityResults: EntityResults[],
  rules: Rule[],
): RuleResults[] {
  const RULE_RESULTS: RuleResults[] = []
  const rule_roots = rules.filter((rule: Rule) => rule.root === true)

  // Loop through each rule
  for (let index = 0; index < rule_roots.length; index++) {
    const rule = rule_roots[index]

    const RESULT = {
      id: rule.id,
      status: false,
      root: rule.root,
      operations: [] as RuleOperationResults[],
    } as RuleResults

    // Loop through each rule operation
    for (let index = 0; index < rule.operations.length; index++) {
      const operation: RuleOperation = rule.operations[index]

      switch (operation.method) {
        case 'all': {
          const _result: RuleOperationResults = ruleOperationAll(operation, {
            entityResults: entityResults,
            rules: rules,
          })
          RESULT.operations.push(_result)
          break
        }
        case 'oneOf': {
          const _result: RuleOperationResults = ruleOperationOneOf(operation, {
            entityResults: entityResults,
            rules: rules,
          })
          RESULT.operations.push(_result)
          break
        }
        case 'range':
          break
        case 'beforeBlock':
          break
        case 'afterBlock':
          break
        case 'betweenBlocks':
          break
        case 'beforeTimestamp':
          break
        case 'afterTimestamp':
          break
        case 'betweenTimestamps':
      }
    }

    // Set the status of the rule based on the status of the operations
    RESULT.status = RESULT.operations.every((item) => item.status === true)

    // Add the rule result to the rule results array
    RULE_RESULTS.push(RESULT)
  }

  return RULE_RESULTS
}
