import { conditionOperationTransactionObserve } from './condition-operation-transaction-observe'
import { mockTransaction } from 'test/condition-operations/mock/transaction'
import { describe, expect, it } from 'vitest'

const mockTransactionDecoded = {
  ...mockTransaction,
  decoded: {
    functionName: 'depositTo',
    args: [
      '0x761d584f1C2d43cBc3F42ECd739701a36dFFAa31',
      1005000000n,
      '0x761d584f1C2d43cBc3F42ECd739701a36dFFAa31',
    ],
  },
}

describe('conditionOperationTransactionObserve', () => {
  it('Should throw if the operation method is not "observe"', () => {
    expect(() =>
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'to',
        type: 'uint256',
        args: [1, 'gte', '10000000000'],
      }),
    ).toThrow('Only observe operations are supported')
  })

  it('Should throw if the operation arguments are invalid', () => {
    expect(() =>
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'uint256',
        args: [],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'uint256',
        args: ['gte'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'uint256',
        args: [
          1,
          'gte',
          '10000000000',
          '0x761d584f1c2d43cbc3f42ecd739701a36dffaa31',
        ],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'uint256',
        args: [1, 'gte'],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'uint256',
        args: [1, 'gte', undefined],
      }),
    ).toThrow('Invalid operation arguments')

    expect(() =>
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'uint256',
        args: [1, '>==', '10000000000'],
      }),
    ).toThrow('Invalid operation arguments')
  })

  it('Should return true if the transaction value is equal to the condition value with uint256', () => {
    expect(
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'uint256',
        args: [1, 'eq', '1005000000'],
      }),
    ).toBe(true)
  })

  it('Should return false if the transaction value is not equal to the condition value with uint256', () => {
    expect(
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'uint256',
        args: [1, 'eq', '1005000001'],
      }),
    ).toBe(false)
  })

  it('Should return true if the transaction value is equal to the condition value with address', () => {
    expect(
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'address',
        args: [0, 'eq', '0x761d584f1C2d43cBc3F42ECd739701a36dFFAa31'],
      }),
    ).toBe(true)
  })

  it('Should return false if the transaction value is not equal to the condition value with address', () => {
    expect(
      conditionOperationTransactionObserve(mockTransactionDecoded, {
        method: 'observe',
        type: 'address',
        args: [0, 'eq', '0x761d584f1C2d43cBc3F42ECd739701a36dFFAa32'],
      }),
    ).toBe(false)
  })
})
