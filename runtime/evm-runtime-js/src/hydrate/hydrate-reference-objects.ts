import { EVMSet } from '../types'
import { fetchAbiFromUri } from './fetch-abi-from-uri'

/**
 * @name hydrateReferenceObjects
 * @description Hydrate reference objects in a EVMSet
 *
 * @param set
 * @returns EVMSet
 *
 */
export async function hydrateReferenceObjects(set: EVMSet): Promise<EVMSet> {
  const set_new = { ...set }
  const length = set_new.entities.length
  for (let index = 0; index < length; index++) {
    const entity = set_new.entities[index]
    // The ABI can be a string or an ABI array.
    // If it's a string, it's a URI to an ABI file.
    // If it's an ABI array, it's already hydrated.
    // TODO: Support all URI schemes, not just IPFS.
    // TODO: Use abitype to validate the ABI.
    if (typeof entity.abi === 'string' && entity.abi.startsWith('ipfs://')) {
      const abi = await fetchAbiFromUri(entity.abi)
      if (abi) {
        set_new.entities[index].abi = abi
      }
    }
  }
  return set_new
}
