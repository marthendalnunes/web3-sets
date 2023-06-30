export function compareBigNumber(
  condition: string,
  operation_argument: BigInt,
  artifact_value: BigInt,
) {
  switch (condition) {
    case 'gt':
      return artifact_value > operation_argument
    case 'gte':
      return artifact_value >= operation_argument
    case 'lt':
      return artifact_value < operation_argument
    case 'lte':
      return artifact_value <= operation_argument
    case 'eq':
      return artifact_value === operation_argument
    case 'neq':
      return artifact_value !== operation_argument
    default:
      return false
  }
}
