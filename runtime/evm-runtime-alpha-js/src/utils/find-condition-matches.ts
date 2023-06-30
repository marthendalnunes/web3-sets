import { SmartContractSetHydrated } from '../types'

export function findConditionMatches(
  cid: string,
  setHydrated: SmartContractSetHydrated,
) {
  const entity = setHydrated.entities[setHydrated.cidToEntityIndex[cid]]
  const condition = entity.conditions.find((condition) => condition.id === cid)

  if (condition === undefined) {
    throw new Error(`Condition ${cid} not found`)
  }

  if (condition.type == 'transaction') {
    return entity?.matches?.transactions?.filter((match) => match.cid === cid)
  }
  if (condition.type == 'log') {
    return entity?.matches?.logs?.find((match) => match.cid === cid)?.isSuccess
  }
  if (condition.type == 'read') {
    throw new Error(`Read conditions not supported yet`)
  }
  if (condition.type == 'archive_read') {
    throw new Error(`Archive read conditions not supported yet`)
  }
  if (condition.type == 'storage_proofs') {
    throw new Error(`Storage proofs conditions not supported yet`)
  }

  throw new Error(`Condition type ${condition.type} not supported`)
}
