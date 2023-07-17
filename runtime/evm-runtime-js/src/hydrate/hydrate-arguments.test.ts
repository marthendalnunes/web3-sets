import { hydrateArguments, searchReplaceArgument } from './hydrate-arguments'
import { EVMSet } from 'src/types'
import { describe, expect, it } from 'vitest'

describe('hydrateArguments', () => {
  it('should throw if hydrated arguments set is not of type EVMSet', () => {
    expect(() =>
      hydrateArguments({} as EVMSet, {
        ADDRESS_BURN: '0x0000000000000000000000000000000000000000',
        MAX_VALUE: '10000000',
      }),
    ).toThrow('Error hydrating arguments')
  })

  it('should hydrate arguments', () => {
    const hydrated = hydrateArguments(
      EVMSet.parse({
        id: 'set:pooltogether:v4:prizepool:10:usdc:prizepool:deposit',
        object: 'set:evm',
        name: 'PoolTogether $10 USDC Deposit on Optimism',
        description:
          'Deposit $10 USDC into the PoolTogether V4 PrizePool on the Optimism network',
        keywords: ['pooltogether', 'optimism', 'usdc'],
        version: {
          major: 0,
          minor: 0,
          patch: 0,
        },
        entities: [
          {
            id: 'entity:pooltogether:v4:prizepool',
            chainId: 10,
            address: '$ADDRESS_BURN',
            abi: 'ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H',
          },
        ],
        conditions: [
          {
            id: 'condition:depositTo:gte:max',
            eid: 'entity:pooltogether:v4:prizepool',
            type: 'transaction',
            signature: 'depositTo(address,uint256)',
            operations: [
              {
                method: 'observe',
                args: [1, 'gte', '$MAX_VALUE'],
              },
            ],
          },
          {
            id: 'condition:depositToAndDelegate:gte:max',
            eid: 'entity:pooltogether:v4:prizepool',
            type: 'transaction',
            signature: 'depositToAndDelegate(address,uint256,address)',
            operations: [
              {
                method: 'observe',
                args: [1, 'gte', '$MAX_VALUE'],
              },
            ],
          },
        ],
        rules: [
          {
            id: 'rule:all',
            root: true,
            operations: [
              {
                method: 'oneOf',
                args: [
                  'condition:depositTo:gte:max',
                  'condition:depositToAndDelegate:gte:max',
                ],
              },
            ],
          },
        ],
      }),
      {
        ADDRESS_BURN: '0x0000000000000000000000000000000000000000',
        MAX_VALUE: '10000000',
      },
    )

    expect(hydrated).toStrictEqual(
      EVMSet.parse({
        id: 'set:pooltogether:v4:prizepool:10:usdc:prizepool:deposit',
        object: 'set:evm',
        name: 'PoolTogether $10 USDC Deposit on Optimism',
        description:
          'Deposit $10 USDC into the PoolTogether V4 PrizePool on the Optimism network',
        keywords: ['pooltogether', 'optimism', 'usdc'],
        version: {
          major: 0,
          minor: 0,
          patch: 0,
        },
        entities: [
          {
            id: 'entity:pooltogether:v4:prizepool',
            chainId: 10,
            address: '0x0000000000000000000000000000000000000000',
            abi: 'ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H',
          },
        ],
        conditions: [
          {
            id: 'condition:depositTo:gte:max',
            eid: 'entity:pooltogether:v4:prizepool',
            type: 'transaction',
            signature: 'depositTo(address,uint256)',
            operations: [
              {
                method: 'observe',
                args: [1, 'gte', '10000000'],
              },
            ],
          },
          {
            id: 'condition:depositToAndDelegate:gte:max',
            eid: 'entity:pooltogether:v4:prizepool',
            type: 'transaction',
            signature: 'depositToAndDelegate(address,uint256,address)',
            operations: [
              {
                method: 'observe',
                args: [1, 'gte', '10000000'],
              },
            ],
          },
        ],
        rules: [
          {
            id: 'rule:all',
            root: true,
            operations: [
              {
                method: 'oneOf',
                args: [
                  'condition:depositTo:gte:max',
                  'condition:depositToAndDelegate:gte:max',
                ],
              },
            ],
          },
        ],
      }),
    )
  })
})

describe('searchReplaceArgument', () => {
  it('should replace a string correctly', () => {
    expect(
      searchReplaceArgument('$ADDRESS_BURN', {
        ADDRESS_BURN: '0x0000000000000000000000000000000000000000',
      }),
    ).toBe('0x0000000000000000000000000000000000000000')
  })

  it('should replace an array correctly', () => {
    expect(
      searchReplaceArgument(['$ADDRESS_BURN', 'ADDRESS_BURN'], {
        ADDRESS_BURN: '0x0000000000000000000000000000000000000000',
      }),
    ).toStrictEqual([
      '0x0000000000000000000000000000000000000000',
      'ADDRESS_BURN',
    ])
  })

  it('should replace an object correctly', () => {
    expect(
      searchReplaceArgument(
        {
          address: '$ADDRESS_BURN',
          name: 'Burn',
        },
        {
          ADDRESS_BURN: '0x0000000000000000000000000000000000000000',
        },
      ),
    ).toStrictEqual({
      address: '0x0000000000000000000000000000000000000000',
      name: 'Burn',
    })
  })
})
