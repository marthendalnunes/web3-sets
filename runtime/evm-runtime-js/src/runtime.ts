import { applyEntityConditionOperations } from './conditions/apply-entity-condition-operations'
import { hydrateSet } from './hydrate'
import { injectArtifacts } from './hydrate/inject-artifacts'
import { applyRuleOperations } from './rules/apply-rule-operations'
import { EntityResults, RuntimeInput, RuntimeOutput } from './types'
import { debugRuntime } from './utils/debug'

/**
 * @name Runtime
 * @description Runtime is the main entrypoint for the EVM runtime engine.
 */
export async function runtime({
  set,
  artifacts,
  clients,
  args,
}: RuntimeInput): Promise<RuntimeOutput | void> {
  // 1. Fetch externally referenced data objects (e.g. ABI files from URI location like IPFS)
  // 2. Inject the arguments into the condition and rule operation inputs
  // 3. Co-locate the conditions with the entities and create fields for the artifacts and operation matches.
  const set_hydrated = await hydrateSet({ set, clients, args })

  // 4. Inject EVM artifacts into hydrated Entities.
  const set_hydrated_with_artifacts = injectArtifacts({
    set: set_hydrated,
    artifacts,
  })

  // 5. Apply the condition operations to the EVM Entity artifacts.
  const entity_condition_operations_applied: EntityResults[] =
    applyEntityConditionOperations(set_hydrated_with_artifacts)

  // 6. Apply the rule operations using the results from the Entity condition operations.
  const rule_condition_operations_applied = applyRuleOperations(
    entity_condition_operations_applied,
    set_hydrated_with_artifacts.rules,
  )

  // 7. Return the results
  const results = {
    status: rule_condition_operations_applied.every(
      (item) => item.status === true && item.root === true,
    ),
    results: {
      entities: entity_condition_operations_applied,
      rules: rule_condition_operations_applied,
    },
  }

  console.log(results)
  debugRuntime(results)

  return results
}
