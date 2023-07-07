import { conditionOperationTransactionValue } from './condition-operation-transaction-value'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionValue', () => {
  it('Should throw if the operation method is not "value"', () => {
    expect(() =>
      conditionOperationTransactionValue(mockTransaction, {
        method: 'to',
        args: ['100000000000000000'],
      }),
    ).toThrow('Only value operations are supported')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionValue(mockTransaction, {
        method: 'value',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionValue(mockTransaction, {
        method: 'value',
        args: ['gte'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionValue(mockTransaction, {
        method: 'value',
        args: [
          'gte',
          '100000000000000000',
          '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
        ],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionValue(mockTransaction, {
        method: 'value',
        args: ['>==', '100000000000000000'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionValue(mockTransaction, {
        method: 'value',
        args: ['eq', undefined],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction value is equal to the condition value', () => {
    expect(
      conditionOperationTransactionValue(
        {
          ...mockTransaction,
          value: '100000000000000000',
        },
        {
          method: 'value',
          args: ['eq', '100000000000000000'],
        },
      ),
    ).toBe(true)
  })

  it('Should return true if the transaction value is greater than or equal to the condition value', () => {
    expect(
      conditionOperationTransactionValue(
        {
          ...mockTransaction,
          value: '100000000000000000',
        },
        {
          method: 'value',
          args: ['gte', '100000000000000000'],
        },
      ),
    ).toBe(true)

    expect(
      conditionOperationTransactionValue(
        {
          ...mockTransaction,
          value: '100000000000000001',
        },
        {
          method: 'value',
          args: ['gte', '100000000000000000'],
        },
      ),
    ).toBe(true)
  })
})
