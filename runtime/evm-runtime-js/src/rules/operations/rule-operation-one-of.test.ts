import { ruleOperationOneOf } from './rule-operation-one-of'
import { mockEntityResults } from 'test/rule-operations/mock/entity-results'
import { describe, expect, it } from 'vitest'

describe('ruleOperationOneOf', () => {
  it('Should throw if the operation method is not "oneOf"', () => {
    expect(() =>
      ruleOperationOneOf(
        {
          method: 'all',
          args: ['condition:depositTo:gte:100000000'],
        },
        {
          entityResults: mockEntityResults,
          rules: [],
        },
      ),
    ).toThrow('Invalid operation method')
  })

  it('Should throw if the reference is not found', () => {
    expect(() =>
      ruleOperationOneOf(
        {
          method: 'oneOf',
          args: [
            'condition:depositTo:gte:100000000',
            'condition:wrong:reference',
          ],
        },
        {
          entityResults: mockEntityResults,
          rules: [],
        },
      ),
    ).toThrow('Could not find condition with cid condition:wrong:reference')
  })

  it('Should return true if one of the conditions is true', () => {
    expect(
      ruleOperationOneOf(
        {
          method: 'oneOf',
          args: [
            'condition:depositTo:gte:100000000',
            'condition:depositToAndDelegate:gte:100000000',
          ],
        },
        {
          rules: [],
          entityResults: [
            {
              id: 'entity:pooltogether:v4:prizepool',
              status: true,
              conditions: [
                {
                  cid: 'condition:depositTo:gte:100000000',
                  status: false,
                  operations: [
                    {
                      status: true,
                      artifacts: [
                        {
                          id: '0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891',
                          reference: 'transaction',
                        },
                      ],
                    },
                  ],
                },
                {
                  cid: 'condition:depositToAndDelegate:gte:100000000',
                  status: true,
                  operations: [
                    {
                      status: true,
                      artifacts: [
                        {
                          id: '0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891',
                          reference: 'transaction',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ),
    ).toEqual({
      method: 'oneOf',
      status: true,
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          status: false,
          reference: 'condition',
        },
        {
          id: 'condition:depositToAndDelegate:gte:100000000',
          status: true,
          reference: 'condition',
        },
      ],
    })
  })

  it('Should return false if none of the conditions are true', () => {
    expect(
      ruleOperationOneOf(
        {
          method: 'oneOf',
          args: [
            'condition:depositTo:gte:100000000',
            'condition:depositToAndDelegate:gte:100000000',
          ],
        },
        {
          rules: [],
          entityResults: [
            {
              id: 'entity:pooltogether:v4:prizepool',
              status: true,
              conditions: [
                {
                  cid: 'condition:depositTo:gte:100000000',
                  status: false,
                  operations: [
                    {
                      status: true,
                      artifacts: [
                        {
                          id: '0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891',
                          reference: 'transaction',
                        },
                      ],
                    },
                  ],
                },
                {
                  cid: 'condition:depositToAndDelegate:gte:100000000',
                  status: false,
                  operations: [
                    {
                      status: true,
                      artifacts: [
                        {
                          id: '0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891',
                          reference: 'transaction',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ),
    ).toEqual({
      method: 'oneOf',
      status: false,
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          status: false,
          reference: 'condition',
        },
        {
          id: 'condition:depositToAndDelegate:gte:100000000',
          status: false,
          reference: 'condition',
        },
      ],
    })
  })
})
