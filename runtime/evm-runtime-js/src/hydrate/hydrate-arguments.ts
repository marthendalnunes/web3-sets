import { EVMSet } from '../types'

/**
 * @name searchReplaceArgument
 * @description Recursively search and replace arguments starting with '$' in a generic object, array or string
 * @param obj Generic object, array or string
 * @param args Replacement arguments
 * @returns Set operation with replaced arguments
 */
export function searchReplaceArgument(
  obj: Record<string, any> | any[] | string,
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

/**
 * @name hydrateArguments
 * @description Hydrate set operation arguments with runtime arguments
 * @param set EVMSet
 * @param args Runtime arguments
 * @returns EVMSet with hydrated arguments
 * @throws If the hydrated arguments set is not of type EVMSet
 */
export function hydrateArguments(
  set: EVMSet,
  _args?: {
    [key: string]: string | number
  },
) {
  // Return the original set if no arguments are provided
  if (!_args) return set

  const safeSet = EVMSet.safeParse(searchReplaceArgument(set, _args))

  if (!safeSet.success) throw new Error('Error hydrating arguments')

  return safeSet.data
}
