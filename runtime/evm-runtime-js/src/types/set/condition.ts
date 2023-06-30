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
