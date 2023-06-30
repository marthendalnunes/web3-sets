import { EVMSet, EntityHydrated, SetHydrated } from '../types'
import { Condition } from '../types/set/condition'
import { Client } from 'viem'

/**
 * @name mutateSetToHydratedSet
 */
export function mutateSetToHydratedSet(
  set: EVMSet,
  clients?: Client[],
): SetHydrated {
  // Create a hydrated set object.
  const set_hydrated: SetHydrated = {
    rules: set.rules,
    entities: [],
    clients,
  }

  // Co-locating the conditions with the entities.
  // And creating fields for the artifacts and operation matches.
  for (let index = 0; index < set.entities.length; index++) {
    set_hydrated.entities.push({
      id: set.entities[index].id,
      address: set.entities[index].address,
      chainId: set.entities[index].chainId,
      abi: set.entities[index].abi,
      conditions: set.conditions?.filter(
        (condition: Condition) => condition.eid === set.entities[index].id,
      ),
      artifacts: {
        state: 'raw',
        transactions: [],
        receipts: [],
        logs: [],
      },
      matches: {
        transactions: [],
        receipts: [],
        logs: [],
      },
    } as EntityHydrated)
  }

  return set_hydrated
}
