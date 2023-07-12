import { ruleOperationBeforeBlock } from './rule-operation-before-block'
import {
  mockArtifacts,
  mockEntityResults,
} from 'test/rule-operations/mock/entity-results'
import { describe, expect, it } from 'vitest'

describe('ruleOperationBeforeBlock', () => {
  it('Should throw if the operation method is not "beforeBlock"', () => {
    expect(() =>
      ruleOperationBeforeBlock(
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
      ruleOperationBeforeBlock(
        {
          method: 'beforeBlock',
          args: ['17999409'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationBeforeBlock(
        {
          method: 'beforeBlock',
          args: ['17999409', 'condition:depositTo:gte:100000000'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationBeforeBlock(
        {
          method: 'beforeBlock',
          args: [undefined, ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the block number is less than the reference block number', () => {
    expect(
      ruleOperationBeforeBlock(
        {
          method: 'beforeBlock',
          args: [
            '34435499',
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
      method: 'beforeBlock',
      status: true,
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          status: true,
          reference: 'condition',
        },
        {
          id: 'condition:depositToAndDelegate:gte:100000000',
          reference: 'condition',
          status: true,
        },
      ],
    })
  })

  it('Should return false if the block number is greater than the reference block number', () => {
    expect(
      ruleOperationBeforeBlock(
        {
          method: 'beforeBlock',
          args: [
            '14435499',
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
      method: 'beforeBlock',
      status: false,
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          status: false,
          reference: 'condition',
        },
        {
          id: 'condition:depositToAndDelegate:gte:100000000',
          reference: 'condition',
          status: false,
        },
      ],
    })
  })
})
