import { z } from 'zod'

export const RuleOperation = z.object({
  method: z.enum([
    'beforeBlock',
    'afterBlock',
    'betweenBlocks',
    'beforeTimestamp',
    'afterTimestamp',
    'betweenTimestamps',
    'all',
    'oneOf',
    'range',
  ]),
  args: z.array(z.any()),
})
export type RuleOperation = z.infer<typeof RuleOperation>

export const Rule = z.object({
  id: z.string(),
  root: z.boolean().optional(),
  operations: z.array(RuleOperation),
})

export type Rule = z.infer<typeof Rule>
