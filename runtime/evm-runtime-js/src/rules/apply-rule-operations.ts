import {
  EVMStateArtifacts,
  EntityResults,
  RuleOperationResults,
  RuleResults,
} from '../types'
import { Rule } from '../types/set/rule'
import {
  ruleOperationAfterBlock,
  ruleOperationAfterTimestamp,
  ruleOperationAll,
  ruleOperationBeforeBlock,
  ruleOperationBeforeTimestamp,
  ruleOperationBetweenBlocks,
  ruleOperationBetweenTimestamps,
  ruleOperationOneOf,
  ruleOperationRange,
} from './operations'

export function applyRuleOperations(
  entityResults: EntityResults[],
  rules: Rule[],
  artifacts: EVMStateArtifacts,
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
    for (const operation of rule.operations) {
      switch (operation.method) {
        case 'all': {
          const _result: RuleOperationResults = ruleOperationAll(operation, {
            entityResults,
            rules,
          })
          RESULT.operations.push(_result)
          break
        }
        case 'oneOf': {
          const _result: RuleOperationResults = ruleOperationOneOf(operation, {
            entityResults,
            rules,
          })
          RESULT.operations.push(_result)
          break
        }
        case 'range': {
          const _result: RuleOperationResults = ruleOperationRange(operation, {
            entityResults,
            rules,
          })
          RESULT.operations.push(_result)
          break
        }
        case 'beforeBlock': {
          const _result: RuleOperationResults = ruleOperationBeforeBlock(
            operation,
            {
              entityResults,
              artifacts,
            },
          )
          RESULT.operations.push(_result)
          break
        }
        case 'afterBlock': {
          const _result: RuleOperationResults = ruleOperationAfterBlock(
            operation,
            {
              entityResults,
              artifacts,
            },
          )
          RESULT.operations.push(_result)
          break
        }
        case 'betweenBlocks': {
          const _result: RuleOperationResults = ruleOperationBetweenBlocks(
            operation,
            {
              entityResults,
              artifacts,
            },
          )
          RESULT.operations.push(_result)
          break
        }
        case 'beforeTimestamp': {
          const _result: RuleOperationResults = ruleOperationBeforeTimestamp(
            operation,
            {
              entityResults,
              artifacts,
            },
          )
          RESULT.operations.push(_result)
          break
        }
        case 'afterTimestamp': {
          const _result: RuleOperationResults = ruleOperationAfterTimestamp(
            operation,
            {
              entityResults,
              artifacts,
            },
          )
          RESULT.operations.push(_result)
          break
        }
        case 'betweenTimestamps': {
          const _result: RuleOperationResults = ruleOperationBetweenTimestamps(
            operation,
            {
              entityResults,
              artifacts,
            },
          )
          RESULT.operations.push(_result)
          break
        }
      }
    }

    // Set the status of the rule based on the status of the operations
    RESULT.status = RESULT.operations.every((item) => item.status === true)

    // Add the rule result to the rule results array
    RULE_RESULTS.push(RESULT)
  }

  return RULE_RESULTS
}
