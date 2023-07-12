import { ruleOperationBetweenTimestamps } from './rule-operation-between-timestamps'
import {
  mockArtifacts,
  mockEntityResults,
} from 'test/rule-operations/mock/entity-results'
import { describe, expect, it } from 'vitest'

describe('ruleOperationBetweenTimestamps', () => {
  it('Should throw if the operation method is not "betweenTimestamps"', () => {
    expect(() =>
      ruleOperationBetweenTimestamps(
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
      ruleOperationBetweenTimestamps(
        {
          method: 'betweenTimestamps',
          args: ['17999409', ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationBetweenTimestamps(
        {
          method: 'betweenTimestamps',
          args: ['17999409', 'condition:depositTo:gte:100000000'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationBetweenTimestamps(
        {
          method: 'betweenTimestamps',
          args: [undefined, '100000', ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')
  })

  it('Should throw if the timestamp range is invalid', () => {
    expect(() =>
      ruleOperationBetweenTimestamps(
        {
          method: 'betweenTimestamps',
          args: ['17999409', '100000', ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid timestamp range')
  })

  it('Should throw if the reference is invalid', () => {
    expect(() =>
      ruleOperationBetweenTimestamps(
        {
          method: 'betweenTimestamps',
          args: [
            '1659754991',
            '1667475999',
            [
              'wrong-reference:depositTo:gte:100000000',
              'condition:depositToAndDelegate:gte:100000000',
            ],
          ],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow(
      'wrong-reference:depositTo:gte:100000000 is not a valid reference',
    )
  })

  it('Should return true if the timestamp is between the reference timestamp range', () => {
    expect(
      ruleOperationBetweenTimestamps(
        {
          method: 'betweenTimestamps',
          args: [
            '1659754991',
            '1667475999',
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
      status: true,
      method: 'betweenTimestamps',
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          reference: 'condition',
          status: true,
        },
        {
          id: 'condition:depositToAndDelegate:gte:100000000',
          reference: 'condition',
          status: true,
        },
      ],
    })
  })

  it('Should return false if the timestamp is not between the reference timestamp range', () => {
    expect(
      ruleOperationBetweenTimestamps(
        {
          method: 'betweenTimestamps',
          args: [
            '1659754993',
            '1667475997',
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
      status: false,
      method: 'betweenTimestamps',
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          reference: 'condition',
          status: false,
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
