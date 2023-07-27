import { ConditionResult, EntityResults, SetHydrated } from '../types'
import { Condition } from '../types/set/condition'
import { debugRuntime } from '../utils/debug'
import { filterTransactionReceiptsMatchingConditionOperations } from './filter-transaction-receipts-matching-condition-operations'

export function applyEntityConditionOperations(
  set: SetHydrated,
): EntityResults[] {
  const ENTITIES: EntityResults[] = []

  // Loop through each entity in the set
  for (let index = 0; index < set.entities.length; index++) {
    const entity = set.entities[index]

    // Create a reference to an entity that list the conditions operations that were satisfied for that entity.
    const entity_reference = {
      id: entity.id,
      status: false,
      conditions: [] as ConditionResult[],
    } as EntityResults

    const _totalMatches = entity.conditions.map((condition: Condition) => {
      // ----------------------------------------------
      // Transactions
      // ----------------------------------------------
      if (condition.type === 'transaction') {
        // Pass in the condition and all of the transactions that could potentially satisfy the condition.
        const artifacts = filterTransactionReceiptsMatchingConditionOperations({
          condition,
          transactions: entity.artifacts.transactions,
        })
        return artifacts
      }
      // ----------------------------------------------
      // Logs
      // ----------------------------------------------
      if (condition.type === 'log') {
      }
      // ----------------------------------------------
      // Storage Proofs
      // TODO: Write the specifications for storage proofs.
      // ----------------------------------------------
      if (condition.type === 'proof') {
      }
    })

    debugRuntime(_totalMatches)

    // If there are any matches, set the status to true.
    // We know a single match is enough to satisfy the condition.
    // If there are no matches, the status will remain false.
    entity_reference.status = _totalMatches.length > 0
    // @ts-ignore
    entity_reference.conditions = _totalMatches
    ENTITIES.push(entity_reference)
  }

  return ENTITIES
}
