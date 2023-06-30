import { Condition } from '../types/set/condition'

export function getConditionsByType(conditions: Condition[], type: String) {
  return conditions?.filter((condition: Condition) => condition.type === type)
}
