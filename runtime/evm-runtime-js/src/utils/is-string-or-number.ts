/**
 * @name isStringOrNumber
 * @description Check if a value is a string or number
 * @param value The value to check, it can be an array or a single value
 * @returns Returns true if the value is a string or number or an array of strings or numbers
 */
export const isStringOrNumber = (value: any | any[]) => {
  const check = (value: any) => {
    return ['string', 'number'].includes(typeof value)
  }

  if (Array.isArray(value)) {
    return value.every((v) => check(v))
  }
  return check(value)
}
