import { conditionOperationTransactionBetweenTimestamps } from './condition-operation-transaction-between-timestamps'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionBetweenTimestamps', () => {
  it('Should throw if the operation method is not "betweenTimestamps"', () => {
    expect(() =>
      conditionOperationTransactionBetweenTimestamps(mockTransaction, {
        method: 'afterTimestamp',
        args: ['33969344', '33969345'],
      }),
    ).toThrow('Only betweenTimestamps operations are supported')
  })

  it('Should throw if the transaction has no timeStamp', () => {
    expect(() =>
      conditionOperationTransactionBetweenTimestamps(
        { ...mockTransaction, timeStamp: null },
        {
          method: 'betweenTimestamps',
          args: ['33969344', '33969345'],
        },
      ),
    ).toThrow('Transaction has no timeStamp')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionBetweenTimestamps(mockTransaction, {
        method: 'betweenTimestamps',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBetweenTimestamps(mockTransaction, {
        method: 'betweenTimestamps',
        args: ['33969343', '33969344', '33969345'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBetweenTimestamps(mockTransaction, {
        method: 'betweenTimestamps',
        args: [undefined],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should throw if the condition timestamps are in a invalid range', () => {
    expect(() =>
      conditionOperationTransactionBetweenTimestamps(mockTransaction, {
        method: 'betweenTimestamps',
        args: ['33969344', '33969343'],
      }),
    ).toThrow('Invalid timestamp range')
  })

  it('Should return true if the transaction timestamp is between the condition timestamps', () => {
    expect(
      conditionOperationTransactionBetweenTimestamps(
        {
          ...mockTransaction,
          timeStamp: '33969344',
        },
        {
          method: 'betweenTimestamps',
          args: ['33969343', '33969345'],
        },
      ),
    ).toBe(true)
  })

  it('Should return false if the transaction timestamp is not between the condition timestamps', () => {
    expect(
      conditionOperationTransactionBetweenTimestamps(
        {
          ...mockTransaction,
          timeStamp: '33969344',
        },
        {
          method: 'betweenTimestamps',
          args: ['33969345', '33969347'],
        },
      ),
    ).toBe(false)
  })
})
