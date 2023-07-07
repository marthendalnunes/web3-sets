import { Transaction } from 'src/types'
import { ConditionOperation } from 'src/types/set/condition'
import { isAddress } from 'viem'

/**
 * @name conditionOperationTransactionFrom
 * @description Check if a transaction has been sent from a specific address
 * @param transaction The transaction to check
 * @param operation The operation containing the from address
 * @returns Returns true if the transaction has been sent from the set condition from address
 * @throws If the operation method is not 'from'
 */
export function conditionOperationTransactionFrom(
  transaction: Transaction,
  operation: ConditionOperation,
): boolean {
  if (operation.method !== 'from')
    throw new Error('Only from operations are supported')

  if (operation.args.length !== 1 || !isAddress(operation.args[0]))
    throw new Error('Invalid operation arguments')

  return transaction.from.toLowerCase() === operation.args[0].toLowerCase()
}
