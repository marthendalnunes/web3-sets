import { conditionOperationTransactionBeforeTimestamp } from './condition-operation-transaction-before-timestamp'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionBeforeTimestamp', () => {
  it('Should throw if the operation method is not "beforeTimestamp"', () => {
    expect(() =>
      conditionOperationTransactionBeforeTimestamp(mockTransaction, {
        method: 'afterTimestamp',
        args: ['33969344'],
      }),
    ).toThrow('Only beforeTimestamp operations are supported')
  })

  it('Should throw if the transaction has no timeStamp', () => {
    expect(() =>
      conditionOperationTransactionBeforeTimestamp(
        { ...mockTransaction, timeStamp: null },
        {
          method: 'beforeTimestamp',
          args: ['33969344'],
        },
      ),
    ).toThrow('Transaction has no timeStamp')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionBeforeTimestamp(mockTransaction, {
        method: 'beforeTimestamp',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBeforeTimestamp(mockTransaction, {
        method: 'beforeTimestamp',
        args: ['33969343', '33969344'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBeforeTimestamp(mockTransaction, {
        method: 'beforeTimestamp',
        args: [undefined],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction timestamp is less than the condition timestamp', () => {
    expect(
      conditionOperationTransactionBeforeTimestamp(
        {
          ...mockTransaction,
          timeStamp: '33969344',
        },
        {
          method: 'beforeTimestamp',
          args: ['33969345'],
        },
      ),
    ).toBe(true)
  })

  it('Should return false if the transaction timestamp is greater than the condition timestamp', () => {
    expect(
      conditionOperationTransactionBeforeTimestamp(
        {
          ...mockTransaction,
          timeStamp: '33969345',
        },
        {
          method: 'beforeTimestamp',
          args: ['33969344'],
        },
      ),
    ).toBe(false)
  })

  it('Should return false if the transaction timestamp is equal to the condition timestamp', () => {
    expect(
      conditionOperationTransactionBeforeTimestamp(
        {
          ...mockTransaction,
          timeStamp: '33969344',
        },
        {
          method: 'beforeTimestamp',
          args: ['33969344'],
        },
      ),
    ).toBe(false)
  })
})
