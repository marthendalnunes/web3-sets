import { EVMStateArtifacts } from './evm/artifacts'

import { EVMSet } from './set'
import { Client } from 'viem'
import { z } from 'zod'

export const RuntimeArguments = z.record(z.unknown())
export type RuntimeArguments = z.infer<typeof RuntimeArguments>

export type RuntimeInput = {
  set: EVMSet
  artifacts: EVMStateArtifacts
  clients?: Client[]
  args?: RuntimeArguments
}
