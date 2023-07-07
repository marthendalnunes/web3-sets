import { conditionOperationTransactionBetweenBlocks } from './condition-operation-transaction-between-blocks'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionBetweenBlocks', () => {
  it('Should throw if the operation method is not "betweenBlocks"', () => {
    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'afterBlock',
        args: ['33969344', '33969346'],
      }),
    ).toThrow('Only betweenBlocks operations are supported')
  })

  it('Should throw if the transaction has no blockNumber', () => {
    expect(() =>
      conditionOperationTransactionBetweenBlocks(
        { ...mockTransaction, blockNumber: null },
        {
          method: 'betweenBlocks',
          args: ['33969344', '33969346'],
        },
      ),
    ).toThrow('Transaction has no blockNumber')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'betweenBlocks',
        args: ['33969344'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'betweenBlocks',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'betweenBlocks',
        args: ['33969344', '33969346', '33969347'],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'betweenBlocks',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'betweenBlocks',
        args: ['33969343'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'betweenBlocks',
        args: ['33969343', '33969344', '33969345'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'betweenBlocks',
        args: [undefined, ['33969343']],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should throw if the condition block numbers is an invalid range', () => {
    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'betweenBlocks',
        args: ['33969346', '33969344'],
      }),
    ).toThrow('Invalid block range')

    expect(() =>
      conditionOperationTransactionBetweenBlocks(mockTransaction, {
        method: 'betweenBlocks',
        args: ['33969344', '33969344'],
      }),
    ).toThrow('Invalid block range')
  })

  it('Should return true if the transaction block number is between the condition block numbers', () => {
    expect(
      conditionOperationTransactionBetweenBlocks(
        {
          ...mockTransaction,
          blockNumber: '33969345',
        },
        {
          method: 'betweenBlocks',
          args: ['33969344', '33969346'],
        },
      ),
    ).toBe(true)
  })

  it('Should return false if the transaction block number is lower than the condition block numbers', () => {
    expect(
      conditionOperationTransactionBetweenBlocks(
        {
          ...mockTransaction,
          blockNumber: '33969344',
        },
        {
          method: 'betweenBlocks',
          args: ['33969345', '33969346'],
        },
      ),
    ).toBe(false)
  })
})
