import { Comparator } from '../set/comparator'
import { isAddress } from 'viem'
import { z } from 'zod'

export const ConditionOperation = z.object({
  method: z.enum([
    'beforeBlock',
    'afterBlock',
    'betweenBlocks',
    'beforeTimestamp',
    'afterTimestamp',
    'betweenTimestamps',
    'observe',
    'observeOneOf',
    'to',
    'from',
    'nonce',
    'value',
  ]),
  args: z.array(z.any()),
  type: z.string().optional(), // address, bytes32, uint256, etc...
})

export type ConditionOperation = z.infer<typeof ConditionOperation>

export const Condition = z.object({
  id: z.string(),
  eid: z.string(),
  type: z.string(),
  // type: z.enum(['transaction', 'receipt', 'log', 'read', 'archive_read']),
  signature: z.string(),
  operations: z.array(ConditionOperation),
})

export type Condition = z.infer<typeof Condition>

const StringOrNumber = z.union([z.string(), z.number()])
const Address = z.string().refine(isAddress)

export const ConditionOperationObserveArgs = z.tuple([
  z.number(),
  Comparator,
  StringOrNumber,
])

export const ConditionOperationBeforeBlockArgs = z.tuple([StringOrNumber])

export const ConditionOperationAfterBlockArgs = z.tuple([StringOrNumber])

export const ConditionOperationBetweenBlocksArgs = z.tuple([
  StringOrNumber,
  StringOrNumber,
])

export const ConditionOperationBeforeTimestampArgs = z.tuple([StringOrNumber])

export const ConditionOperationAfterTimestampArgs = z.tuple([StringOrNumber])

export const ConditionOperationBetweenTimestampsArgs = z.tuple([
  StringOrNumber,
  StringOrNumber,
])

export const ConditionOperationToArgs = z.tuple([Address])

export const ConditionOperationFromArgs = z.tuple([Address])

export const ConditionOperationValueArgs = z.tuple([Comparator, StringOrNumber])

export const ConditionOperationNonceArgs = z.tuple([Comparator, StringOrNumber])
