# Conditions

An condition operator is a specific logical action or process that can be applied to an `Entity` object.

## Type (type)
Since it's possible to verify multiple state artifacts for accounts and smart contracts, an entity condition `type` must be defined.

- transaction
- log
- read
- archive_read
- storage_proof

## Operations (operations)

- beforeBlock
- afterBlock
- beforeTimestamp
- afterTimestamp

## Argument (args)

## Values

### Transaction

The `transaction` condition type validates transaction input data.

#### Unique Operators

```
value(Operator, BigNumber)
```

Example of defining a basic transaction condition on a PoolTogether V4 deposit.
```json
"conditions": [
    {
      "id": "condition:pt:v4:deposit:usdc",
      "eid": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      "name": "PoolTogether Prize Pool minimum deposit of 10 USDC",
      "type": "transaction",
      "signature": "depositTo(address,uint256)",
      "args": [
        {
          "index": 1,
          "type": "bignumber",
          "operator": "gte",
          "value": "10000000"
        }
      ]
    }
],
```

Example of defining an advanced transaction condition with operations on a PoolTogether V4 deposit.
```json
"conditions": [
    {
      "id": "condition:pt:v4:deposit:usdc",
      "eid": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      "name": "PoolTogether Prize Pool minimum deposit of 10 USDC",
      "type": "transaction",
      "signature": "depositTo(address,uint256)",
      "operations": ["afterBlock", "beforeBlock", "value",],
      "args": [[420], [999999999999], ["gte", 0]],
      "values": [
        {
          "index": 0,
          "type": "address",
          "operator": "eq",
          "value": "$ADDRESS"
        },
        {
          "index": 1,
          "type": "bignumber",
          "operator": "gte",
          "value": "10000000"
        }
      ]
    }
],
```

### Log
The `log` condition type validates logs emitted duing a transaction with a smart contract

Example of defining a log read operator on a ERC20 Transfer event emitted during a standard token transfer.
```json
"conditions": [
    {
      "id": "condition:erc20:log:Transfer",
      "eid": "0x000000000000000000000000000000000000dEaD",
      "name": "ERC20 Transfer event sending 1 ETH minimum to Vitalik",
      "type": "log",
      "signature": "Transfer(address indexed from, address indexed to, uint tokens)",
      "values": [
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

### Read
The `read` condition type read blockchain state at the current block.

```json
"conditions": [
    {
      "id": "condition:erc20:balanceOf:Transfer",
      "eid": "0x000000000000000000000000000000000000dEaD",
      "name": "ERC20 minimum balance of 1 at current block.",
      "type": "balanceOf",
      "signature": "balanceOf(address)",
      "inputs": ["ACCOUNT_ADDRESS"],
      "values": [
        {
          "index": 0,
          "type": "uint256",
          "operator": "gte",
          "value": "1e18"
        }
      ]
    }
],
```

### Archive Read
The `archive_read` condition type validates state of blockchain at a specific block.

```json
"conditions": [
    {
      "id": "condition:erc20:balanceOf:Transfer",
      "eid": "0x000000000000000000000000000000000000dEaD",
      "name": "ERC20 minimum balance of 1 at block 4206982103.",
      "type": "balanceOf",
      "signature": "balanceOf(address)",
      "input": [["ACCOUNT_ADDRESS"], 4206982103],
      "values": [
        {
          "index": 0,
          "type": "uint256",
          "operator": "gte",
          "value": "1e18"
        }
      ]
    }
],
```

### Storage Proof

The `storage_proof` condition type will cryptographically verify EVM state artifacts.

## Arguments

The transaction, log, read and archive_read condition types all share an `args` interface.

- index
- type
- operator
- value

Notice: The `type` field will likely be deprecated since it can be inferred using an Entity ABI.

**Index**
Position of an argument in a signature input.

**Type**
- address
- bignumber (uint, uint8, uin32, ... , uint256)
- bytes
- bytes32
- string

**Operators**
- gt
- gte
- lt
- lte
- eq
- !eq
- contains
- match

**Value**
The reference used to validate the desired state inputs and outputs.