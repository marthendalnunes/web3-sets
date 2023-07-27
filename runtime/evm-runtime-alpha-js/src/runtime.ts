import { EVMState } from './types/evm'
import { SmartContractSet } from './types/input'

import { Client } from 'viem'

import { applyConditionOperations } from './conditions-apply'
import { hydrateSet } from './hydrate/hydrate-set'
import { injectState } from './inject-state'
import { applyRuleOperations } from './run-rules'

interface RuntimeInput {
  set: SmartContractSet
  state: EVMState
  clients: Client[]
  args: {
    [key: string]: string | number
  }
}

interface RuntimeOutput {
  set: any
  analysis: any
}

/**
 * @name Runtime
 * @description Runtime is the main entrypoint for the EVM runtime engine.
 */
export async function runtime({
  set,
  state,
  clients,
  args,
}: RuntimeInput): Promise<RuntimeOutput | void> {
  try {
    // 1. Fetch externally referenced data objects (e.g. ABI files from IPFS)
    // 2. Inject the arguments into the condition and rule operation inputs
    const setHydrated = await hydrateSet(set, clients, args)
    // 3. Inject EVM state into linked Entity smart contract objects
    const injected = injectState({
      set: setHydrated,
      state,
    })
    // 4. Apply conditions to Entity smart contract objects EVM state
    const conditioned = applyConditionOperations(injected)
    // 5. Apply rules to Entity smart contract objects EVM state and conditions
    const analysis = applyRuleOperations(conditioned)
    // @ts-ignore
    return analysis
  } catch (error: any) {
    console.error(error)
    return
  }
}
