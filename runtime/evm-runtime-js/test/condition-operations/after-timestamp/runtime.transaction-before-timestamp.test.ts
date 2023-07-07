import { runtime } from 'src/runtime'
import { expect, test } from 'vitest'

import set_fail from './data/set-fail.json'
import set_success from './data/set-success.json'
import transactions from './data/transactions.json'
import { EVMSet, EVMStateArtifacts } from 'src/types'

test('expect set to success on beforeTimestamp condition operation', async () => {
  const _analysis = await runtime({
    set: EVMSet.parse(set_success),
    artifacts: EVMStateArtifacts.parse({
      transactions,
    }),
  })

  expect(_analysis?.status).toBe(true)
})

test('expect set to fail on beforeTimestamp condition operation', async () => {
  const _analysis = await runtime({
    set: EVMSet.parse(set_fail),
    artifacts: EVMStateArtifacts.parse({
      transactions,
    }),
  })

  expect(_analysis?.status).toBe(false)
})
