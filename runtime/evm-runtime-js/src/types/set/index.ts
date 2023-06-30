import { Condition } from './condition'
import { Entity } from './entity'
import { Rule } from './rule'
import { z } from 'zod'

export const EVMSet = z.object({
  entities: z.array(Entity),
  conditions: z.array(Condition),
  rules: z.array(Rule),
})

export type EVMSet = z.infer<typeof EVMSet>
