import { Comparator } from '../types/set/comparator'

/**
 * @name isValidComparator
 * @description Check if a string is a valid comparator
 * @param comparator The comparator to check
 * @returns Returns true if the comparator is valid
 */
export const isValidComparator = (comparator: string) => {
  return Comparator.safeParse(comparator).success
}
