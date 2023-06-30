import { z } from 'zod'

export enum ConditionStateMatchObject {
  Transaction = 'transaction',
  Log = 'log',
  Read = 'read',
}

export const Entity = z.object({
  address: z.string(),
  chainId: z.number(),
  name: z.string(),
  abi: z.any(), // TODO: Use https://abitype.dev/
})

export type Entity = z.infer<typeof Entity>

export const ConditionArgument = z.object({
  index: z.number(),
  type: z.string(),
  condition: z.string(),
  value: z.string(),
})

export type ConditionArgument = z.infer<typeof ConditionArgument>

export const Condition = z.object({
  id: z.string(),
  name: z.string(),
  eid: z.string(),
  type: z.string(),
  signature: z.string(),
  operations: z
    .array(
      z.enum([
        'beforeTimestamp',
        'afterTimestamp',
        'beforeBlock',
        'afterBlock',
        'value',
      ]),
    )
    .optional(),
  args: z.array(z.array(z.any())).optional(),
  values: z.array(ConditionArgument),
})

export type Condition = z.infer<typeof Condition>

export const Rule = z.object({
  id: z.string(),
  operations: z.array(
    z.enum([
      'all',
      'oneOf',
      'range',
      'beforeTimestamp',
      'afterTimestamp',
      'beforeBlock',
      'afterBlock',
    ]),
  ),
  args: z.array(z.array(z.any())),
})

export type Rule = z.infer<typeof Rule>

export const SmartContractSet = z.object({
  name: z.string(),
  description: z.string(),
  entities: z.array(Entity),
  conditions: z.array(Condition),
  rules: z.array(Rule),
})

export type SmartContractSet = z.infer<typeof SmartContractSet>
