import { EVMSet } from '../types/set'
import { hydrateArguments } from './hydrate-arguments'
import { hydrateConditionOperationTypes } from './hydrate-condition-operation-types'
import { hydrateReferenceObjects } from './hydrate-reference-objects'
import { mutateSetToHydratedSet } from './mutate-set-to-hydrated-set'
import { Client } from 'viem'

export async function hydrateSet({
  set,
  clients,
  args,
}: { set: EVMSet; clients?: Client[]; args?: any }) {
  const setParsed = EVMSet.parse(set)
  // Fetch external state objects (e.g. ABI files from IPFS)
  const hydrateExternalState = await hydrateReferenceObjects(setParsed)

  // Infer the types of the condition operation arguments
  const set_hydrated_with_condition_operation_types =
    hydrateConditionOperationTypes(hydrateExternalState)

  // Inject runtime arguments into set operation arguments
  const hydratedSet = hydrateArguments(
    set_hydrated_with_condition_operation_types,
    args,
  )
  return mutateSetToHydratedSet(hydratedSet, clients)
}
