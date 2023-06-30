export function conditionString(
  condition: string,
  operation_argument: string,
  artifact_value: string,
) {
  switch (condition) {
    case 'eq':
      return operation_argument === artifact_value
    case '!eq':
      return operation_argument !== artifact_value
    default:
      return false
  }
}
