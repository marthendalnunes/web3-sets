import { ruleOperationBeforeTimestamp } from './rule-operation-before-timestamp'
import {
  mockArtifacts,
  mockEntityResults,
} from 'test/rule-operations/mock/entity-results'
import { describe, expect, it } from 'vitest'

describe('ruleOperationBeforeTimestamp', () => {
  it('Should throw if the operation method is not "beforeTimestamp"', () => {
    expect(() =>
      ruleOperationBeforeTimestamp(
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
      ruleOperationBeforeTimestamp(
        {
          method: 'beforeTimestamp',
          args: ['17999409'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationBeforeTimestamp(
        {
          method: 'beforeTimestamp',
          args: ['17999409', 'condition:depositTo:gte:100000000'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationBeforeTimestamp(
        {
          method: 'beforeTimestamp',
          args: [undefined, ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationBeforeTimestamp(
        {
          method: 'beforeTimestamp',
          args: ['17999409', [undefined]],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction timestamp less than the rule timestamp', () => {
    expect(
      ruleOperationBeforeTimestamp(
        {
          method: 'beforeTimestamp',
          args: ['1667475999', ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toEqual({
      method: 'beforeTimestamp',
      status: true,
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          status: true,
          reference: 'condition',
        },
      ],
    })
  })

  it('Should return false if the transaction timestamp greater than the rule timestamp', () => {
    expect(
      ruleOperationBeforeTimestamp(
        {
          method: 'beforeTimestamp',
          args: ['1667475997', ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toEqual({
      method: 'beforeTimestamp',
      status: false,
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          status: false,
          reference: 'condition',
        },
      ],
    })
  })

  it('Should return false if the transaction timestamp equal than the rule timestamp', () => {
    expect(
      ruleOperationBeforeTimestamp(
        {
          method: 'beforeTimestamp',
          args: ['1667475998', ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toEqual({
      method: 'beforeTimestamp',
      status: false,
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          status: false,
          reference: 'condition',
        },
      ],
    })
  })
})
