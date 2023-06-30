import { Log, LogMatch } from './evm/log'
import { Transaction, TransactionMatch } from './evm/transaction'
import {
  TransactionReceipt,
  TransactionReceiptMatch,
} from './evm/transaction-receipt'
import { Condition } from './set/condition'
import { Rule } from './set/rule'
import { Abi } from 'abitype'
import { Address, Client } from 'viem'

type EVMArtifacts = {
  state: 'raw' | 'decoded'
  transactions?: Transaction[]
  receipts?: TransactionReceipt[]
  logs?: Log[]
}

type EVMArtifactMatches = {
  receipts?: TransactionReceiptMatch[]
  transactions?: TransactionMatch[]
  logs?: LogMatch[]
}

export type EntityHydrated = {
  id: String
  address: Address
  chainId: Number
  abi: string | Abi
  conditions: Condition[]
  artifacts: EVMArtifacts
  matches: EVMArtifactMatches
}

export type SetHydrated = {
  entities: EntityHydrated[]
  rules: Rule[]
  clients?: Client[]
}
