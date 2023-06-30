import { getAddress } from 'viem'

export function conditionString(
  condition: string,
  operation_argument: string,
  artifact_value: string,
) {
  switch (condition) {
    case 'eq':
      return getAddress(operation_argument) === getAddress(artifact_value)
    case '!eq':
      return getAddress(operation_argument) !== getAddress(artifact_value)
    default:
      return false
  }
}
