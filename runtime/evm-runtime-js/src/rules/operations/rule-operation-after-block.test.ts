import { ruleOperationAfterBlock } from './rule-operation-after-block'
import {
  mockArtifacts,
  mockEntityResults,
} from 'test/rule-operations/mock/entity-results'
import { describe, expect, it } from 'vitest'

describe('ruleOperationAfterBlock', () => {
  it('Should throw if the operation method is not "afterBlock"', () => {
    expect(() =>
      ruleOperationAfterBlock(
        {
          method: 'all',
          args: ['17999409', 'condition:depositTo:gte:100000000'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation method')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      ruleOperationAfterBlock(
        {
          method: 'afterBlock',
          args: ['17999409'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationAfterBlock(
        {
          method: 'afterBlock',
          args: ['17999409', 'condition:depositTo:gte:100000000'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationAfterBlock(
        {
          method: 'afterBlock',
          args: [undefined, ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the block number is after the specified block', () => {
    expect(
      ruleOperationAfterBlock(
        {
          method: 'afterBlock',
          args: [
            '17999409',
            [
              'condition:depositTo:gte:100000000',
              'condition:depositToAndDelegate:gte:100000000',
            ],
          ],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toEqual({
      method: 'afterBlock',
      status: true,
      references: [
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
    })
  })

  it('Should return false if the block number is before the specified block', () => {
    expect(
      ruleOperationAfterBlock(
        {
          method: 'afterBlock',
          args: [
            '101404047',
            [
              'condition:depositTo:gte:100000000',
              'condition:depositToAndDelegate:gte:100000000',
            ],
          ],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toEqual({
      method: 'afterBlock',
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
