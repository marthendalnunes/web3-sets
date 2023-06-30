# Artifacts

The EVM set entities generate state artifacts.

State artifacts tell us how an Entity has **behaved in the past** or is expected to **behave in the future**.

**Types**
- Log (log)
- StorageProof (storage_proof)
- TransactionReceipt (transaction_receipt)

```ts
type Log = {
  blockNumber: number
  blockHash: string
  transactionIndex: number
  removed?: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number
}

type TransactionReceipt = {
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  from: string;
  to: string;
  cumulativeGasUsed: number;
  gasUsed: number;
  status: boolean;
  contractAddress?: string;
  logs: Log[];
  data: string;
};
```

The `StorageProof` type hasn't been fully researched but will be supported in future versions.

## How It Works

State artifacts are how condition operations are used to measure Entity behaviors.

Below is an example of a transaction state artifact generated via an `Account` interacting with the PoolTogether V4 PrizePool on the Optimism `SmartContract` entity.

```json
{
    "blockNumber": "15204742",
    "timeStamp": "1658658027",
    "hash": "0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891",
    "nonce": "2681446",
    "blockHash": "0x8a1092d67153c98609ce112ed25fc441bd85827672cfb24700e7362a54ecd2d2",
    "transactionIndex": "50",
    "from": "0x761d584f1c2d43cbc3f42ecd739701a36dffaa31",
    "to": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
    "value": "771500000000000000",
    "gas": "21000",
    "gasPrice": "7555699848",
    "isError": "0",
    "txreceipt_status": "1",
    "data": "0xffaad6a5000000000000000000000000761d584f1c2d43cbc3f42ecd739701a36dffaa31000000000000000000000000000000000000000000000000000000000280de80",
    "contractAddress": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
    "cumulativeGasUsed": "3987451",
    "gasUsed": "21000",
    "confirmations": "1757651",
    "methodId": "0x",
    "functionName": ""
}
```

And here is an example of a condition that will correctly identify the state artifact.

```json
"conditions": [
    {
        "id": "condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
        "eid": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
        "name": "PoolTogether Optimism Deposit over 1 USDC",
        "type": "transaction",
        "signature": "depositTo(address,uint256)",
        "operations": [
            {
                "method": "observe",
                "args": [1, "gte", "100000000"]
            }
        ]
    }
],
```

During runtime, the data field will be decoded and compared with the operation.

**Raw inputs**
```rust
Function: depositTo(address _to, uint256 _amount)

MethodID: 0xffaad6a5
[0]:  000000000000000000000000761d584f1c2d43cbc3f42ecd739701a36dffaa31
[1]:  000000000000000000000000000000000000000000000000000000000280de80
```

**Decoded inputs**
```rust
Function: depositTo(address _to, uint256 _amount)

MethodID: depositTo
[0]:  0x761d584f1c2d43cbc3f42ecd739701a36dffaa31
[1]:  42000000
```

As we can see the observe operation condition has been met.

```json
// condition operation
{
    "method": "observe",
    "args": [1, "gte", "10000000"]
}

// state artifact
[0]:  0x761d584f1c2d43cbc3f42ecd739701a36dffaa31
[1]:  42000000
```

Since `42000000` is greater than or equal to `10000000` the operation conditional has been satisfied.