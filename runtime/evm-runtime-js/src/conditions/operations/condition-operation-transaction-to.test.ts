import { conditionOperationTransactionTo } from './condition-operation-transaction-to'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionTo', () => {
  it('Should throw if the operation method is not "to"', () => {
    expect(() =>
      conditionOperationTransactionTo(mockTransaction, {
        method: 'from',
        args: ['0x761d584f1c2d43cbc3f42ecd739701a36dffaa31'],
      }),
    ).toThrow('Only to operations are supported')
  })

  it('Should throw if the transaction has no to address', () => {
    expect(() =>
      conditionOperationTransactionTo(
        {
          ...mockTransaction,
          to: null,
        },
        {
          method: 'to',
          args: ['0x761d584f1c2d43cbc3f42ecd739701a36dffaa31'],
        },
      ),
    ).toThrow('Transaction has no to address')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionTo(mockTransaction, {
        method: 'to',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionTo(mockTransaction, {
        method: 'to',
        args: [
          '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
          '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
        ],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionTo(mockTransaction, {
        method: 'to',
        args: ['0x761d584f1c2d43c'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionTo(mockTransaction, {
        method: 'to',
        args: [undefined],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction to address is equal to the condition to address', () => {
    expect(
      conditionOperationTransactionTo(
        {
          ...mockTransaction,
          to: '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
        },
        {
          method: 'to',
          args: ['0x761d584f1c2d43cbc3f42ecd739701a36dffaa31'],
        },
      ),
    ).toBe(true)
  })

  it('Should return false if the transaction to address is not equal to the condition to address', () => {
    expect(
      conditionOperationTransactionTo(
        {
          ...mockTransaction,
          to: '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
        },
        {
          method: 'to',
          args: ['0x761d584f1c2d43cbc3f42ecd739701a36dffaa32'],
        },
      ),
    ).toBe(false)
  })
})
