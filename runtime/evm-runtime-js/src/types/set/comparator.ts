import { z } from 'zod'

export const Comparator = z.enum([
  'eq',
  'neq',
  'gt',
  'gte',
  'lt',
  'lte',
  'regex',
])

export type Comparator = z.infer<typeof Comparator>
