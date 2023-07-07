import { conditionOperationTransactionBeforeBlock } from './condition-operation-transaction-before-block'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionBeforeBlock', () => {
  it('Should throw if the operation method is not "beforeBlock"', () => {
    expect(() =>
      conditionOperationTransactionBeforeBlock(mockTransaction, {
        method: 'afterBlock',
        args: ['33969344'],
      }),
    ).toThrow('Only beforeBlock operations are supported')
  })

  it('Should throw if the transaction has no blockNumber', () => {
    expect(() =>
      conditionOperationTransactionBeforeBlock(
        { ...mockTransaction, blockNumber: null },
        {
          method: 'beforeBlock',
          args: ['33969344'],
        },
      ),
    ).toThrow('Transaction has no blockNumber')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionBeforeBlock(mockTransaction, {
        method: 'beforeBlock',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBeforeBlock(mockTransaction, {
        method: 'beforeBlock',
        args: ['33969343', '33969344'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBeforeBlock(mockTransaction, {
        method: 'beforeBlock',
        args: [undefined],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction block number is lower than the condition block number', () => {
    expect(
      conditionOperationTransactionBeforeBlock(
        {
          ...mockTransaction,
          blockNumber: '33969344',
        },
        {
          method: 'beforeBlock',
          args: ['33969345'],
        },
      ),
    ).toBe(true)
  })

  it('Should return false if the transaction block number is greater than the condition block number', () => {
    expect(
      conditionOperationTransactionBeforeBlock(
        {
          ...mockTransaction,
          blockNumber: '33969345',
        },
        {
          method: 'beforeBlock',
          args: ['33969344'],
        },
      ),
    ).toBe(false)
  })

  it('Should return false if the transaction block number is equal to the condition block number', () => {
    expect(
      conditionOperationTransactionBeforeBlock(
        {
          ...mockTransaction,
          blockNumber: '33969344',
        },
        {
          method: 'beforeBlock',
          args: ['33969344'],
        },
      ),
    ).toBe(false)
  })
})
