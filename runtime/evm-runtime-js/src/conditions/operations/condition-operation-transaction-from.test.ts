import { conditionOperationTransactionFrom } from './condition-operation-transaction-from'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionFrom', () => {
  it('Should throw if the operation method is not "from"', () => {
    expect(() =>
      conditionOperationTransactionFrom(mockTransaction, {
        method: 'to',
        args: ['0x761d584f1c2d43cbc3f42ecd739701a36dffaa31'],
      }),
    ).toThrow('Only from operations are supported')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionFrom(mockTransaction, {
        method: 'from',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionFrom(mockTransaction, {
        method: 'from',
        args: [
          '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
          '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
        ],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionFrom(mockTransaction, {
        method: 'from',
        args: ['0x761d584f1c2d43c'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionFrom(mockTransaction, {
        method: 'from',
        args: [undefined],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction from address is equal to the condition from address', () => {
    expect(
      conditionOperationTransactionFrom(
        {
          ...mockTransaction,
          from: '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
        },
        {
          method: 'from',
          args: ['0x761d584f1c2d43cbc3f42ecd739701a36dffaa31'],
        },
      ),
    ).toBe(true)
  })

  it('Should return false if the transaction from address is not equal to the condition from address', () => {
    expect(
      conditionOperationTransactionFrom(
        {
          ...mockTransaction,
          from: '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
        },
        {
          method: 'from',
          args: ['0x79bc8bd53244bc8a9c8c27509a2d573650a83373'],
        },
      ),
    ).toBe(false)
  })
})
