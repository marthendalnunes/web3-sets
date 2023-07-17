import { conditionOperationTransactionAfterTimestamp } from './condition-operation-transaction-after-timestamp'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionAfterTimestamp', () => {
  it('Should throw if the operation method is not "afterTimestamp"', () => {
    expect(() =>
      conditionOperationTransactionAfterTimestamp(mockTransaction, {
        method: 'beforeTimestamp',
        args: ['33969344'],
      }),
    ).toThrow('Only afterTimestamp operations are supported')
  })

  it('Should throw if the transaction has no timeStamp', () => {
    expect(() =>
      conditionOperationTransactionAfterTimestamp(
        { ...mockTransaction, timeStamp: null },
        {
          method: 'afterTimestamp',
          args: ['33969344'],
        },
      ),
    ).toThrow('Transaction has no timeStamp')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionAfterTimestamp(mockTransaction, {
        method: 'afterTimestamp',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionAfterTimestamp(mockTransaction, {
        method: 'afterTimestamp',
        args: ['33969343', '33969344'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionAfterTimestamp(mockTransaction, {
        method: 'afterTimestamp',
        args: [undefined],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction timestamp is greater than the condition timestamp', () => {
    expect(
      conditionOperationTransactionAfterTimestamp(
        {
          ...mockTransaction,
          timeStamp: '33969345',
        },
        {
          method: 'afterTimestamp',
          args: ['33969344'],
        },
      ),
    ).toBe(true)
  })

  it('Should return false if the transaction timestamp is less than the condition timestamp', () => {
    expect(
      conditionOperationTransactionAfterTimestamp(
        {
          ...mockTransaction,
          timeStamp: '33969343',
        },
        {
          method: 'afterTimestamp',
          args: ['33969344'],
        },
      ),
    ).toBe(false)
  })

  it('Should return false if the transaction timestamp is equal to the condition timestamp', () => {
    expect(
      conditionOperationTransactionAfterTimestamp(
        {
          ...mockTransaction,
          timeStamp: '33969344',
        },
        {
          method: 'afterTimestamp',
          args: ['33969344'],
        },
      ),
    ).toBe(false)
  })
})
