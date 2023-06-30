import { SmartContractSet } from '../types/input'

/**
 * @name hydrateArguments
 * @description Hydrate set operation arguments with runtime arguments
 * @param set
 * @param args
 * @returns SmartContractSet
 */
export function hydrateArguments(
  set: SmartContractSet,
  _args: {
    [key: string]: string | number
  },
): SmartContractSet {
  // TODO: Implement hydrateArguments by injecting runtime arguments into
  // the set operation arguments.
  return set
}
