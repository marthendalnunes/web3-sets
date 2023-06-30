import { accessObjectValue } from 'src/utils/access-object-value'

export function conditionTuple(
  condition: string,
  value: any,
  input: any,
  selector: string,
) {
  const inputSelector = accessObjectValue(input, selector)
  switch (condition) {
    case 'eq':
      return inputSelector === value
    case '!eq':
      return input !== value
    default:
      return false
  }
}
