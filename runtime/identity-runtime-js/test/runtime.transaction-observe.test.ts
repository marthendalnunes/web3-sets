import { runtime } from '../src/runtime'
import { expect, test } from 'vitest'

import { EVMSet, EVMStateArtifacts } from '../src/types'
import set from './data/transaction-observe/set.json'
import transactions from './data/transaction-observe/transactions.json'

test('expect runtime to execute', async () => {
  const _analysis = await runtime({
    set: EVMSet.parse(set),
    artifacts: EVMStateArtifacts.parse({
      transactions,
    }),
  })

  expect(_analysis?.status).toBe(true)
})
