import { EVMSet } from '../types'

/**
 * @name hydrateArguments
 * @description Hydrate set operation arguments with runtime arguments
 * @param set EVMSet
 * @param args Runtime arguments
 * @returns EVMSet with hydrated arguments
 */
export function hydrateArguments(
  set: EVMSet,
  _args: {
    [key: string]: string | number
  },
): EVMSet {
  function searchReplaceArgument(
    obj: any,
    _args: { [key: string]: string | number },
  ): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => searchReplaceArgument(item, _args))
    }

    if (typeof obj === 'object' && obj !== null) {
      return Object.fromEntries(
        Object.entries(obj).map(([key, val]) => [
          key,
          searchReplaceArgument(val, _args),
        ]),
      )
    }

    if (typeof obj === 'string' && obj.startsWith('$')) {
      return _args[obj.slice(1)] ?? obj
    }

    return obj
  }

  return searchReplaceArgument(set, _args) as EVMSet
}
