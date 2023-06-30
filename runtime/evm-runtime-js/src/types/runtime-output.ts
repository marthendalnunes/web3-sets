import { z } from 'zod'

export const ConditionOperationArtifactRef = z.object({
  id: z.string(),
  object: z.string(),
})
export type ConditionOperationArtifactRef = z.infer<
  typeof ConditionOperationArtifactRef
>

export const ConditionOperationResults = z.object({
  status: z.boolean(),
  artifacts: z.array(ConditionOperationArtifactRef),
  metadata: z.array(z.any()).optional(),
})
export type ConditionOperationResults = z.infer<
  typeof ConditionOperationResults
>

export const ConditionResult = z.object({
  cid: z.string(),
  status: z.boolean(),
  operations: z.array(ConditionOperationResults),
})
export type ConditionResult = z.infer<typeof ConditionResult>

export const EntityResults = z.object({
  id: z.string(),
  status: z.boolean(),
  conditions: z.array(ConditionResult),
})

export type EntityResults = z.infer<typeof EntityResults>

// ----------------------------
// Rules
// ----------------------------
export const RuleOperationResultsRef = z.object({
  id: z.string(),
  reference: z.string(),
  status: z.boolean(),
})
export type RuleOperationResultsRef = z.infer<typeof RuleOperationResultsRef>

export const RuleOperationResults = z.object({
  status: z.boolean(),
  method: z.string(),
  references: z.array(RuleOperationResultsRef),
})
export type RuleOperationResults = z.infer<typeof RuleOperationResults>

export const RuleResults = z.object({
  id: z.string(),
  status: z.boolean(),
  root: z.boolean().optional(),
  operations: z.array(RuleOperationResults),
})
export type RuleResults = z.infer<typeof RuleResults>

// ----------------------------
// Runtime Output
// ----------------------------
export const RuntimeOutput = z.object({
  status: z.boolean(),
  results: z.object({
    entities: z.array(EntityResults),
    rules: z.array(RuleResults).optional(),
  }),
})
export type RuntimeOutput = z.infer<typeof RuntimeOutput>
