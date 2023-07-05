# EVM Runtime Inputs

The EVM runtime accepts three arguments: set, artifacts and JSON-RPC provider connections.

- Set: A set marked as `set:evm` containg EVM entity references, conditions and rules.
- Artifacts: EVM state artifacts like transactions, logs and storage proofs.
- Clients: JSON-RPC provider client connections with `read` and `archive_read` support.

### Set
```json
{
  "id": "set:pooltogether:10:usdc:prize-pool:deposit",
  "object": "set:evm",
  "name": "PoolTogether $10 USDC Deposit",
  "description": "Deposit $10 USDC into the PoolTogether V4 PrizePool on the Optimism network",
  "keywords": ["pooltogether", "optimism", "usdc"],
  "version": {
    "major": 0,
    "minor": 0,
    "patch": 0
  },
  "entities": [
    {
      "chainId": 10,
      "address": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      "abi": "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
      "name": "PoolTogether USDC Prize Pool"
    }
  ],
  "conditions": [
    {
      "id": "condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
      "eid": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      "name": "PoolTogether Optimism Deposit over 1 USDC",
      "type": "transaction",
      "signature": "depositTo(address,uint256)",
      "values": [
        {
          "index": 1,
          "type": "bignumber",
          "condition": "gte",
          "value": "10000000"
        }
      ]
    }
  ],
  "rules": [
    {
      "id": "rule.complete",
      "operations": ["all"],
      "args": [["condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000"]]
    }
  ]
}
```

### Artifacts

```json
{
    "logs": ["LOG"],
    "proofs": ["PROOF"],
    "receipts": ["RECEIPTS"],
    "transactions": ["TRANSACTION"]
}
```

### Artifacts

```json
{
    "logs": ["LOG"],
    "proofs": ["PROOF"],
    "receipts": ["RECEIPTS"],
    "transactions": ["TRANSACTION"]
}
```
