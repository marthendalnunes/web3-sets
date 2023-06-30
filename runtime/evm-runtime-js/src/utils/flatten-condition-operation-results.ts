import {
  ConditionOperationResults,
  ConditionResult,
  EntityResults,
} from 'src/types'

export function flattenConditionOperationResults(
  entities: EntityResults[],
): ConditionResult[] {
  return entities.flatMap((entity) =>
    entity.conditions.flatMap((condition) => condition),
  )
}
