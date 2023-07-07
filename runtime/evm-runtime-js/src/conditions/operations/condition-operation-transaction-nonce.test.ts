import { conditionOperationTransactionNonce } from './condition-operation-transaction-nonce'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

describe('conditionOperationTransactionNonce', () => {
  it('Should throw if the operation method is not "nonce"', () => {
    expect(() =>
      conditionOperationTransactionNonce(mockTransaction, {
        method: 'to',
        args: ['0x761d584f1c2d43cbc3f42ecd739701a36dffaa31'],
      }),
    ).toThrow('Only nonce operations are supported')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionNonce(mockTransaction, {
        method: 'nonce',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionNonce(mockTransaction, {
        method: 'nonce',
        args: ['eq'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionNonce(mockTransaction, {
        method: 'nonce',
        args: ['eq', '30', '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionNonce(mockTransaction, {
        method: 'nonce',
        args: ['==', '30'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionNonce(mockTransaction, {
        method: 'nonce',
        args: ['eq', undefined],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction nonce is equal to the condition nonce', () => {
    expect(
      conditionOperationTransactionNonce(
        {
          ...mockTransaction,
          nonce: '30',
        },
        {
          method: 'nonce',
          args: ['eq', '30'],
        },
      ),
    ).toBe(true)
  })

  it('Should return true if the transaction nonce is greater than the condition nonce', () => {
    expect(
      conditionOperationTransactionNonce(
        {
          ...mockTransaction,
          nonce: '31',
        },
        {
          method: 'nonce',
          args: ['gt', '30'],
        },
      ),
    ).toBe(true)
  })

  it('Should return true if the transaction nonce is not equal to the condition nonce', () => {
    expect(
      conditionOperationTransactionNonce(
        {
          ...mockTransaction,
          nonce: '31',
        },
        {
          method: 'nonce',
          args: ['!eq', '30'],
        },
      ),
    ).toBe(true)
  })
})
