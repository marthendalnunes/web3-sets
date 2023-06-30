import { EVMSet } from '../types'
import type { Abi } from 'abitype'
import { Entity } from 'src/types/set/entity'

export function hydrateConditionOperationTypes(set: EVMSet): EVMSet {
  const set_new = { ...set }

  // Loop through each entity in the set
  for (let index = 0; index < set.conditions.length; index++) {
    const _condition = set_new.conditions[index]
    const conditionFunctionName = _condition?.signature.split('(')[0]

    const entity = findEntity(_condition.eid, set_new.entities)
    if (!entity) {
      throw new Error(`Entity not found for condition ${_condition.id}`)
    }

    const _new_condition_operation = _condition.operations.map((operation) => {
      return {
        ...operation,
        // @ts-ignore
        type: inferType(conditionFunctionName, entity?.abi, operation.args[0]),
      }
    })

    set_new.conditions[index] = {
      ..._condition,
      operations: _new_condition_operation,
    }
  }

  return set_new
}

function inferType(functionSignature: string, abi: Abi, argumentIndex: number) {
  const abiFunction = abi.find(
    // @ts-ignore
    (abiFunction) => abiFunction.name === functionSignature,
  )
  if (!abiFunction) {
    throw new Error(`Function not found in ABI: ${functionSignature}`)
  }
  // @ts-ignore
  return abiFunction?.inputs[argumentIndex]?.type
}

function findEntity(eid: string, entities: Entity[]) {
  return entities.find((entity) => entity.id === eid)
}
