import { ruleOperationAfterTimestamp } from './rule-operation-after-timestamp'
import {
  mockArtifacts,
  mockEntityResults,
} from 'test/rule-operations/mock/entity-results'
import { describe, expect, it } from 'vitest'

describe('ruleOperationAfterTimestamp', () => {
  it('Should throw if the operation method is not "afterTimestamp"', () => {
    expect(() =>
      ruleOperationAfterTimestamp(
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
      ruleOperationAfterTimestamp(
        {
          method: 'afterTimestamp',
          args: ['17999409'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationAfterTimestamp(
        {
          method: 'afterTimestamp',
          args: ['17999409', 'condition:depositTo:gte:100000000'],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      ruleOperationAfterTimestamp(
        {
          method: 'afterTimestamp',
          args: [undefined, ['condition:depositTo:gte:100000000']],
        },
        {
          entityResults: mockEntityResults,
          artifacts: mockArtifacts,
        },
      ),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction timestamp is greater than the rule timestamp', () => {
    expect(
      ruleOperationAfterTimestamp(
        {
          method: 'afterTimestamp',
          args: [
            '1659754991',
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
      method: 'afterTimestamp',
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

  it('Should return false if the transaction timestamp is less than the rule timestamp', () => {
    expect(
      ruleOperationAfterTimestamp(
        {
          method: 'afterTimestamp',
          args: [
            '1685018709',
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
      status: false,
      method: 'afterTimestamp',
      references: [
        {
          id: 'condition:depositTo:gte:100000000',
          reference: 'condition',
          status: false,
        },
        {
          id: 'condition:depositToAndDelegate:gte:100000000',
          reference: 'condition',
          status: true,
        },
      ],
    })
  })
})
