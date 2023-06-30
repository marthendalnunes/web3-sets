import { EVMSet } from '../types'

/**
 * @name hydrateArguments
 * @description Hydrate set operation arguments with runtime arguments
 * @param set
 * @param args
 * @returns EVMSet
 */
export function hydrateArguments(
  set: EVMSet,
  _args: {
    [key: string]: string | number
  },
): EVMSet {
  // TODO: Implement hydrateArguments by injecting runtime arguments into
  // the set operation arguments.
  return set
}
