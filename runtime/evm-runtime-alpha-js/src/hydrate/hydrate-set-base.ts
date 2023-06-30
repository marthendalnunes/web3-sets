import { EntityHydrated, SmartContractSetHydrated } from '../types'
import { Condition, SmartContractSet } from '../types/input'
import { findObjectIndex } from '../utils'
import { Client } from 'viem'

/**
 * @name hydrateSetBase
 */
export function hydrateSetBase(
  set: SmartContractSet,
  conditions: Condition[],
  clients: Client[],
): SmartContractSetHydrated {
  const newSet: SmartContractSetHydrated = {
    rules: set.rules,
    entities: [] as EntityHydrated[],
    clients,
    cidToEntityIndex: {},
  }

  for (let index = 0; index < set.conditions.length; index++) {
    // @ts-ignore
    newSet.cidToEntityIndex[set.conditions[index].id] = findObjectIndex(
      set.entities,
      'address',
      set.conditions[index].eid,
    )
  }

  for (let index = 0; index < set.entities.length; index++) {
    newSet.entities.push({
      name: set.entities[index].name,
      address: set.entities[index].address,
      chainId: set.entities[index].chainId,
      abi: set.entities[index].abi,
      conditions: conditions?.filter(
        (condition: Condition) => condition.eid === set.entities[index].address,
      ),
      state: {
        raw: {
          transactions: [],
          logs: [],
        },
        parsed: {
          transactions: [],
          logs: [],
        },
      },
      matches: {
        transactions: [],
        logs: [],
      },
    } as EntityHydrated)
  }

  return newSet
}
