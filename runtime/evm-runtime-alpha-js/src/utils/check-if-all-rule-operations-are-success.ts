export function checkIfAllRuleOpereationsAreSuccess(
  array: Array<Array<boolean>>,
) {
  for (let i = 0; i < array.length; i++) {
    if (!Array.isArray(array[i])) {
      return false // If any element is not an array, return false
    }

    if (!array[i].every((value) => value === true)) {
      return false // If any inner array contains a value other than true, return false
    }
  }

  return true // If all arrays and values are true, return true
}
