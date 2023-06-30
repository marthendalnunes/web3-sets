import { z } from 'zod'

export const AnalysisArtifactReference = z.object({
  type: z.enum(['transaction', 'log', 'read', 'archive_read']),
  id: z.string(),
})

export type AnalysisArtifactReference = z.infer<
  typeof AnalysisArtifactReference
>

export const ConditionWithMatches = z.object({
  id: z.string(),
  passing: z.boolean(),
  operations: z.array(
    z.tuple([
      z.array(z.boolean()),
      z.array(z.boolean()),
      z.array(AnalysisArtifactReference),
    ]),
  ),
})

export type ConditionWithMatches = z.infer<typeof ConditionWithMatches>

export const Analysis = z.object({
  passing: z.boolean(),
  analysis: z.array(ConditionWithMatches),
})

export type Analysis = z.infer<typeof Analysis>
