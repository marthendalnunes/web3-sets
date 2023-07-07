import { z } from 'zod'

export const Comparator = z.enum([
  'eq',
  '!eq',
  'gt',
  'gte',
  'lt',
  'lte',
  'regex',
])

export type Comparator = z.infer<typeof Comparator>
