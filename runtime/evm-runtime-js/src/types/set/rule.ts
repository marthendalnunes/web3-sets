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

const StringOrNumber = z.union([z.string(), z.number()])
const StringArray = z.string().array()

export const RuleOperationAllArgs = StringArray

export const RuleOperationOneOfArgs = StringArray

export const RuleOperationRangeArgs = z.array(StringArray)

export const RuleOperationBeforeBlockArgs = z.tuple([
  StringOrNumber,
  StringArray,
])

export const RuleOperationAfterBlockArgs = z.tuple([
  StringOrNumber,
  StringArray,
])

export const RuleOperationBetweenBlocksArgs = z.tuple([
  StringOrNumber,
  StringOrNumber,
  StringArray,
])

export const RuleOperationBeforeTimestampArgs = z.tuple([
  StringOrNumber,
  StringArray,
])

export const RuleOperationAfterTimestampArgs = z.tuple([
  StringOrNumber,
  StringArray,
])

export const RuleOperationBetweenTimestampsArgs = z.tuple([
  StringOrNumber,
  StringOrNumber,
  StringArray,
])
