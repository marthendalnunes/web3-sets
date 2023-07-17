import { conditionOperationTransactionAfterBlock } from './condition-operation-transaction-after-block'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionAfterBlock', () => {
  it('Should throw if the operation method is not "afterBlock"', () => {
    expect(() =>
      conditionOperationTransactionAfterBlock(mockTransaction, {
        method: 'beforeBlock',
        args: ['33969344'],
      }),
    ).toThrow('Only afterBlock operations are supported')
  })

  it('Should throw if the transaction has no blockNumber', () => {
    expect(() =>
      conditionOperationTransactionAfterBlock(
        { ...mockTransaction, blockNumber: null },
        {
          method: 'afterBlock',
          args: ['33969344'],
        },
      ),
    ).toThrow('Transaction has no blockNumber')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionAfterBlock(mockTransaction, {
        method: 'afterBlock',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionAfterBlock(mockTransaction, {
        method: 'afterBlock',
        args: ['33969343', '33969344'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionAfterBlock(mockTransaction, {
        method: 'afterBlock',
        args: [undefined],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction block number is greater than the condition block number', () => {
    expect(
      conditionOperationTransactionAfterBlock(
        {
          ...mockTransaction,
          blockNumber: '33969345',
        },
        {
          method: 'afterBlock',
          args: ['33969344'],
        },
      ),
    ).toBe(true)
  })

  it('Should return false if the transaction block number is less than the condition block number', () => {
    expect(
      conditionOperationTransactionAfterBlock(
        {
          ...mockTransaction,
          blockNumber: '33969343',
        },
        {
          method: 'afterBlock',
          args: ['33969344'],
        },
      ),
    ).toBe(false)
  })

  it('Should return false if the transaction block number is equal to the condition block number', () => {
    expect(
      conditionOperationTransactionAfterBlock(
        {
          ...mockTransaction,
          blockNumber: '33969344',
        },
        {
          method: 'afterBlock',
          args: ['33969344'],
        },
      ),
    ).toBe(false)
  })
})
