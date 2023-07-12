import { ruleOperationBetweenBlocks } from './rule-operation-between-blocks'
import {
  mockArtifacts,
  mockEntityResults,
} from 'test/rule-operations/mock/entity-results'
import { describe, expect, it } from 'vitest'

describe('ruleOperationBetweenBlocks', () => {
  it('Should throw if the operation method is not "betweenBlocks"', () => {
    expect(() =>
      ruleOperationBetweenBlocks(
        {
          method: 'all',
          args: ['17999409', '17999408', ['condition:depositTo:gte:100000000']],
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
      ruleOperationBetweenBlocks(
        {
          method: 'betweenBlocks',
          args: ['17999409', ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationBetweenBlocks(
        {
          method: 'betweenBlocks',
          args: ['17999409', 'condition:depositTo:gte:100000000'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationBetweenBlocks(
        {
          method: 'betweenBlocks',
          args: [undefined, '100000', ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')
  })

  it('Should throw if the block range is invalid', () => {
    expect(() =>
      ruleOperationBetweenBlocks(
        {
          method: 'betweenBlocks',
          args: ['17999409', '17999408', ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid block range')
  })

  it('Should return true if the block number is in between reference block range', () => {
    expect(
      ruleOperationBetweenBlocks(
        {
          method: 'betweenBlocks',
          args: [
            '17999872',
            '33969345',
            [
              'condition:depositTo:gte:100000000',
              'condition:depositToAndDelegate:gte:100000000',
            ],
          ],
        },
        {
          artifacts: mockArtifacts,
          entityResults: mockEntityResults,
        },
      ),
    ).toEqual({
      method: 'betweenBlocks',
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

  it('Should return false if the block number out of the reference block range', () => {
    expect(
      ruleOperationBetweenBlocks(
        {
          method: 'betweenBlocks',
          args: [
            '17999875',
            '33969345',
            [
              'condition:depositTo:gte:100000000',
              'condition:depositToAndDelegate:gte:100000000',
            ],
          ],
        },
        {
          artifacts: mockArtifacts,
          entityResults: mockEntityResults,
        },
      ),
    ).toEqual({
      method: 'betweenBlocks',
      status: false,
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          status: true,
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
