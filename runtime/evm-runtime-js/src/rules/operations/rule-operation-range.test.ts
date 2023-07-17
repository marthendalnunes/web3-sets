import { ruleOperationRange } from './rule-operation-range'
import { mockEntityResults } from 'test/rule-operations/mock/entity-results'
import { describe, expect, it } from 'vitest'

describe('ruleOperationRange', () => {
  it('Should throw if the operation method is not "range"', () => {
    expect(() =>
      ruleOperationRange(
        {
          method: 'all',
          args: [
            ['condition:depositTo:gte:100000000'],
            ['condition:depositToAndDelegate:gte:100000000'],
          ],
        },
        {
          rules: [],
          entityResults: mockEntityResults,
        },
      ),
    ).toThrow('Invalid operation method')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      ruleOperationRange(
        {
          method: 'range',
          args: [
            'condition:depositTo:gte:100000000',
            'condition:depositTo:gte:100000000',
          ],
        },
        {
          rules: [],
          entityResults: mockEntityResults,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationRange(
        {
          method: 'range',
          args: [['condition:depositTo:gte:100000000', undefined]],
        },
        {
          rules: [],
          entityResults: mockEntityResults,
        },
      ),
    ).toThrow('Invalid operation arguments')
  })

  it('Should throw if the reference is not found', () => {
    expect(() =>
      ruleOperationRange(
        {
          method: 'range',
          args: [
            ['condition:depositTo:gte:100000000', 'condition:wrong:reference'],
          ],
        },
        {
          rules: [],
          entityResults: mockEntityResults,
        },
      ),
    ).toThrow('Could not find condition with cid condition:wrong:reference')
  })

  it('Should throw if the reference is invalid', () => {
    expect(() =>
      ruleOperationRange(
        {
          method: 'range',
          args: [
            [
              'wrong-reference:depositTo:gte:100000000',
              'condition:wrong:reference',
            ],
          ],
        },
        {
          rules: [],
          entityResults: mockEntityResults,
        },
      ),
    ).toThrow(
      'wrong-reference:depositTo:gte:100000000 is not a valid reference',
    )
  })

  it('Should return true if one of the conditions is true', () => {
    expect(
      ruleOperationRange(
        {
          method: 'range',
          args: [
            ['condition:depositTo:gte:100000000'],
            [
              'condition:depositTo:gte:100000000',
              'condition:depositToAndDelegate:gte:100000000',
            ],
          ],
        },
        {
          rules: [],
          entityResults: mockEntityResults,
        },
      ),
    ).toEqual({
      method: 'range',
      status: true,
      references: [
        [
          {
            id: 'condition:depositTo:gte:100000000',
            status: true,
            reference: 'condition',
          },
        ],
        [
          {
            id: 'condition:depositTo:gte:100000000',
            status: true,
            reference: 'condition',
          },
          {
            id: 'condition:depositToAndDelegate:gte:100000000',
            status: true,
            reference: 'condition',
          },
        ],
      ],
    })
  })

  it('Should return false if none of the conditions is true', () => {
    expect(
      ruleOperationRange(
        {
          method: 'range',
          args: [
            ['condition:depositTo:gte:100000000'],
            [
              'condition:depositTo:gte:100000000',
              'condition:depositToAndDelegate:gte:100000000',
            ],
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
                  operations: [],
                },
                {
                  cid: 'condition:depositToAndDelegate:gte:100000000',
                  status: true,
                  operations: [
                    {
                      status: true,
                      artifacts: [
                        {
                          id: '0x323b2d6865a97f0cd8f76e302f13a7e49e9d32a1efea69cee2f47b81ab0a12b5',
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
      method: 'range',
      status: false,
      references: [
        [
          {
            id: 'condition:depositTo:gte:100000000',
            status: false,
            reference: 'condition',
          },
        ],
        [
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
      ],
    })
  })
})
