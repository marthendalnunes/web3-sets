import { mutateSetToHydratedSet } from '../mutations/mutate-set-to-hydrated-set'
import { SmartContractSet } from '../types/input'
import { hydrateArguments } from './hydrate-arguments'
import { hydrateReferenceObjects } from './hydrate-reference-objects'
import { Client } from 'viem'

export async function hydrateSet(
  set: SmartContractSet,
  clients: Client[],
  args?: any,
) {
  const setParsed = SmartContractSet.parse(set)
  // Fetch external state objects (e.g. ABI files from IPFS)
  const hydrateExternalState = await hydrateReferenceObjects(setParsed)
  // Inject runtime arguments into set operation arguments
  const hydratedSet = hydrateArguments(hydrateExternalState, args)
  return mutateSetToHydratedSet(hydratedSet, set.conditions, clients)
}
