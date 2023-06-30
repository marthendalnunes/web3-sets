# EVM Runtime Inputs

The EVM runtime accepts a single `RuntimeSeed` argument.

```ts
type RuntimeSeed = {
  set: EVMSet
  state: EVMStateArtifacts
  clients: Client[]
  args: RuntimeArguments
}

const runtimeSeed: RuntimeSeed = {...}
const analysis = runtime(runtimeSeed)
```

A `RuntimeSeed` object has 4 fields: 2 required and 2 semi-optional.

- **EVMSet**: A set marked as `set:evm` containing EVM entity references, conditions and rules.
- **EVMStateArtifacts**: EVM state artifacts like transactions, logs and storage proofs.
- **Clients**: JSON-RPC provider client connections with `read` and `archive_read` support.
- **RuntimeArguments**: Dynamic inputs for operation and observation arguments.

The `EVMSet` and `EVMStateArtifacts` fields are always required to execute the runtime.

The `Client` and `RuntimeArguments` are only required if the Set expects the runtime to handle `read` and `archive_read` operations and includes dynamic operation and/or includes dynamic operation and observation arguments.

## How It Works

**Basic Runtime Example**

The minimum arguments required to execute the runtime are a set and state artifacts.
```rust
runtime({
    set, 
    artifacts
})
```

**Advanced Runtime Example**
For sets that require `reads` and `archive_read` functionality a JSON-RPC provider client is required.

If a set has dynamic arguments the runtime will also require the arguments to be passed during the runtime.

```rust
runtime({
    set, 
    artifacts: {
        "logs": Log[],
        "proofs": Proof[],
        "receipts": Receipt[],
        "transactions": Transaction[],
    }
    clients: Client[],
    args: {
        INJECT_VALUE: "0x0000000000000000000000000000000000000000"
    }
})
```

### Set (Required)
```js
{
  id: "set:pooltogether:10:usdc:prize-pool:deposit",
  object: "set:evm",
  name: "PoolTogether $10 USDC Deposit",
  description: "Deposit $10 USDC into the PoolTogether V4 PrizePool on the Optimism network",
  keywords: ["pooltogether", "optimism", "usdc"],
  version: {
    major: 0,
    minor: 0,
    patch: 0
  },
  entities: [
    {
      chainId: 10,
      address: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      abi: "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
      name: "PoolTogether USDC Prize Pool"
    }
  ],
  conditions: [
    {
      id: "condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
      eid: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      name: "PoolTogether Optimism Deposit over 1 USDC",
      type: "transaction",
      signature: "depositTo(address,uint256)",
      values: [
        {
          index: 1,
          condition: "gte",
          value: "10000000"
        }
      ]
    }
  ],
  rules: [
    {
      id: "rule.complete",
      operations: ["all"],
      args: [["condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000"]]
    }
  ]
}
```

### Artifacts (Required)

```js
{
    logs: Log[],
    proofs: Proof[]
    receipts: Receipts[]
    transactions: Transaction[]
}
```

### Clients (Optional)

For a Javascript runtime, we recommend using the [viem](https://viem.sh/) client interface.

For a Rust runtime, we don't recommend a specific crate. Dealers choice.


### Arguments (Optional)
Arguments can be used to provide operation and observation inputs during runtime.

For example, we might have a condition that is intended to measure "burning" a token. In most cases, we could hard code the `0x0` address, but there might be times when a custom address is desired and we don't want to create a new set.

For these instances, we can use arguments to hydrate set condition and rule operation arguments, before comparing the set to state artifacts.

```js
// runtime arguments
{
    ADDRESS_BURN: "0x0000000000000000000000000000000000000000"
}
```

```js
// condition with dynamic observation argument
{
    id: "condition:transfer:to",
    eid: "0x7ea2be2df7ba6e54b1a9c70676f668455e329d29",
    type: "transaction",
    signature: "transfer(address,uint256)",
    values: [
      {
        index: 0,
        condition: "eq",
        value: "$ADDRESS_BURN"
      },
    ]
  }
```

```js
const analysis = runtime({
  set: Set_With_Dynamic_Arguments,
  artifacts: Artifacts,
  args: {
    ADDRESS_BURN: "0x0000000000000000000000000000000000000000"
  }
})
```