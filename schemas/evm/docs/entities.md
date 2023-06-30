# Entities

The Web3Set::EVM schema includes `Entities` core to Ethereum Virtual Machines:

- Smart Contracts (contracts)
- State Artifacts
    - Transactions (transactions)
    - Logs (logs)
    - Storage Proofs (storage_proofs)

### Type::Contract

A contract entity is a reference to a smart contract instance.

Example of defining a `contract` object in the `Entities` list.

```json
"entities": [
    {
      "chainId": 10,
      "address": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      "abi": "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
      "name": "PoolTogether USDC Prize Pool"
    }
],
```

### Type::Transaction

The `Transaction` type represents a transaction executed on an EVM chain.

```json
"conditions": [
    {
      "id": "condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
      "eid": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      "name": "PoolTogether Optimism Deposit over 1 USDC",
      "type": "transaction",
      "signature": "depositTo(address,uint256)",
      "args": [
        {
          "index": 1,
          "type": "bignumber",
          "condition": "gte",
          "value": "10000000"
        }
      ]
    }
],
```

### Type::Log

The `Log` type represents an event log emitted during an EVM transaction.

```json
"conditions": [
    {
      "id": "condition:erc20:log:Transfer",
      "eid": "0x000000000000000000000000000000000000dEaD",
      "name": "ERC20 Transfer event sending 1 ETH minimum to Vitalik",
      "type": "log",
      "signature": "Transfer(address indexed from, address indexed to, uint tokens)",
      "args": [
        {
          "index": 1,
          "type": "address",
          "operator": "eq",
          "value": "vitalik.eth"
        }
        {
          "index": 2,
          "type": "bignumber",
          "operator": "gte",
          "value": "1e18"
        }
      ]
    }
],
```