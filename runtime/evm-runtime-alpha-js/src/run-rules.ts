import { isConditionMet } from './is-condition-met'
import { Analysis, SmartContractSetHydrated } from './types'
import {
  checkIfAllRuleOpereationsAreSuccess,
  findConditionMatches,
} from './utils'

export function applyRuleOperations(set: SmartContractSetHydrated): Analysis {
  const newSet = { ...set }

  const matches: any = []
  const results: any = []

  for (let index = 0; index < set.rules.length; index++) {
    const rule = newSet.rules[index]

    const ruleAnalysis = {
      id: rule.id,
      isSuccess: false,
      matches: [],
    }
    // Iterate over the operations in the rule.
    // TODO: Add support for multiple operations.
    const status = rule.operations.map((operation: string, index: number) => {
      switch (operation) {
        case 'all': {
          const transactionsMatching: any = []
          for (let i = 0; i < rule.args[index].length; i++) {
            const conditions = rule.args[index]?.map((cid: string) =>
              isConditionMet(cid, set),
            )
            const transactions = rule.args[index]?.map((cid: string) =>
              findConditionMatches(cid, set),
            )
            transactions.flat().forEach((transaction: any) => {
              if (transaction !== null) {
                transactionsMatching.push({
                  reference: findTransactionReference(
                    transaction.hash,
                    set.entities[set.cidToEntityIndex[transaction.cid]],
                  ),
                  rid: rule.id,
                  ...transaction,
                })
              }
            })

            // @ts-ignore
            ruleAnalysis.matches.push(transactions)
            return conditions.every((condition: any) => condition === true)
          }
        }
        break
        case 'beforeTimestamp':
          break
        case 'afterTimestamp':
          break
        case 'beforeBlock':
          break
        case 'afterBlock':
          break
        default:
          break
      }
    })
    matches.push({
      id: rule.id,
      isSuccess: isComplete(status),
      data: ruleAnalysis,
    })
  }

  return {
    isSuccess: checkIfAllRuleOpereationsAreSuccess(results),
    data: matches,
  }
}

function isComplete(rule: any): boolean {
  return rule.every((match: any) => match === true)
}

function findTransactionReference(hash: string, entity: any): any {
  const match = entity?.state?.raw?.transactions?.filter(
    (transaction: any) => transaction.hash === hash,
  )
  if (match.length === 0) {
    return null
  }
  return match[0]
}
