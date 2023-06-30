# EVM Runtime Mutations

## Hydration
Before the set is compared to state artifacts it first undergoes hydration.

Entity hydration is required for fetching external interfaces, like smart contract application binary interfaces and verifiable credential schemas.

```ts
export const EVMSetHydrated = {
	clients: Client[]
	entities: EntityHydrated[]
	rules: Rule[]
};
```

Conditions and state artifacts are co-located inside an Entity object: simplifying artifact decoding and validation.

And if required the runtime arguments will be injected into condition and rule operation arguments.

```ts
export const EntityHydrated = {
	id: String,
	address: Address,
	chainId: Number,
	abi: ABI,
	conditions: ConditionHydrated[]
	artifacts: EVMArtifacts,
	matches: EVMArtifactMatches,
};

type EVMArtifacts = {
   raw: {
      transactions: TransactionReceipt
      logs: Log
   },
   parsed: {
      transactions: TransactionParsed
      logs: LogParsed
   },
}

type EVMArtifactMatches = {
   transactions: TransactionMatch;
   logs: LogMatch
}
```


## How It Works

During runtime several mutations are applied to the original Set object.

## Interfaces

```js
// Entity before hydration
{
   id: "pooltogether:v4:prizepool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:optimism",
   chainId: 10,
   address: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
   abi: "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
}

// Entity after hydration
{
   id: "pooltogether:v4:prizepool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:optimism",
   chainId: 10,
   address: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
   abi: [
      {"inputs":[{"internalType":"address","name":"_owner","type":"address"}]},
      {"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositTo","outputs":[],"stateMutability":"nonpayable","type":"function"}
      // ...
   ]
}
```

## Arguments

```js
// Condition before argument injection
{
   id: "condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
   eid: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
   type: "transaction",
   signature: "depositTo(address,uint256)",
   operations: [
      {
         method: "observe",
         args: [0, "eq", "$ADDRESS_DEPOSITOR"] // THIS LINE CHANGES
      }
   ]
}

// runtime argument 
{
   ADDRESS_DEPOSITOR: "0x761d584f1C2d43cBc3F42ECd739701a36dFFAa31"
}

// Condition after argument injection
{
   id: "condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
   eid: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
   type: "transaction",
   signature: "depositTo(address,uint256)",
   operations: [
      {
         method: "observe",
         args: [0, "eq", "0x761d584f1C2d43cBc3F42ECd739701a36dFFAa31"] // THIS LINE CHANGES
      }
   ]
}
```

## Colocation

Conditions and artifacts are co-located with the hydrated EVMEntity object.

```js
// Before entity, condition and artifact co-location.

{
   entities: [{
      id: "pooltogether:v4:prizepool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:optimism",
      chainId: 10,
      address: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      abi: [
         {"inputs":[{"internalType":"address","name":"_owner","type":"address"}]},
         {"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositTo","outputs":[],"stateMutability":"nonpayable","type":"function"}
         // ...
      ],
   }]
   conditions: [
      {
         id: "condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
         eid: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
         type: "transaction",
         signature: "depositTo(address,uint256)",
         operations: [
            {
               method: "observe",
               args: [0, "eq", "0x761d584f1C2d43cBc3F42ECd739701a36dFFAa31"] // THIS LINE CHANGES
            }
         ]
      }
   ]
}

// After entity, condition and artifact co-location.
{
   entities: [
      {
         id: "pooltogether:v4:prizepool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:optimism",
         chainId: 10,
         address: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
         abi: [
            {"inputs":[{"internalType":"address","name":"_owner","type":"address"}]},
            {"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositTo","outputs":[],"stateMutability":"nonpayable","type":"function"}
            // ...
         ],
         conditions: [
            {
               id: "condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
               eid: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
               type: "transaction",
               signature: "depositTo(address,uint256)",
               operations: [
                  {
                     method: "observe",
                     args: [0, "eq", "0x761d584f1C2d43cBc3F42ECd739701a36dFFAa31"] // THIS LINE CHANGES
                  }
               ]
            }
         ],
         artifacts: {
            raw: {
               transactions: [
                  {
                     blockNumber: "15204742",
                     timeStamp: "1658658027",
                     hash: "0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891",
                     nonce: "2681446",
                     blockHash: "0x8a1092d67153c98609ce112ed25fc441bd85827672cfb24700e7362a54ecd2d2",
                     transactionIndex: "50",
                     from: "0x761d584f1c2d43cbc3f42ecd739701a36dffaa31",
                     to: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
                     value: "771500000000000000",
                     gas: "21000",
                     gasPrice: "7555699848",
                     isError: "0",
                     txreceipt_status: "1",
                     data: "0xffaad6a5000000000000000000000000761d584f1c2d43cbc3f42ecd739701a36dffaa31000000000000000000000000000000000000000000000000000000000280de80",
                     contractAddress: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
                     cumulativeGasUsed: "3987451",
                     gasUsed: "21000",
                     confirmations: "1757651",
                     methodId: "0x",
                     functionName: ""
                  }
               ]
               logs: []
            }
            parsed: {
               transactions: []
               logs: []
            }
         }
      }
   ]
}
```

After the artifacts have been added to the new Entity object being hydrated, raw state artifacts will be parsed and decoded using the Entity application binary interface (ABI). Completing the hydration process and making it easier to parse and execute operations.

```js
{
   entities: [
      {
         id: "pooltogether:v4:prizepool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:optimism",
         chainId: 10,
         address: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
         abi: [
            {"inputs":[{"internalType":"address","name":"_owner","type":"address"}]},
            {"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"depositTo","outputs":[],"stateMutability":"nonpayable","type":"function"}
            // ...
         ],
         conditions: [
            {
               id: "condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
               eid: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
               type: "transaction",
               signature: "depositTo(address,uint256)",
               operations: [
                  {
                     method: "observe",
                     args: [0, "eq", "0x761d584f1C2d43cBc3F42ECd739701a36dFFAa31"] // THIS LINE CHANGES
                  }
               ]
            }
         ],
         artifacts: {
            raw: {
               transactions: [
                  {
                     blockNumber: "15204742",
                     timeStamp: "1658658027",
                     hash: "0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891",
                     nonce: "2681446",
                     blockHash: "0x8a1092d67153c98609ce112ed25fc441bd85827672cfb24700e7362a54ecd2d2",
                     transactionIndex: "50",
                     from: "0x761d584f1c2d43cbc3f42ecd739701a36dffaa31",
                     to: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
                     value: "771500000000000000",
                     gas: "21000",
                     gasPrice: "7555699848",
                     isError: "0",
                     txreceipt_status: "1",
                     data: "0xffaad6a5000000000000000000000000761d584f1c2d43cbc3f42ecd739701a36dffaa31000000000000000000000000000000000000000000000000000000000280de80",
                     contractAddress: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
                     cumulativeGasUsed: "3987451",
                     gasUsed: "21000",
                     confirmations: "1757651",
                     methodId: "0x",
                     functionName: ""
                  }
               ]
               logs: []
            }
            parsed: {
               transactions: [{
                  hash: "0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891",
                  functionName: "depositTo",
                  args: [
                     "0x761d584f1C2d43cBc3F42ECd739701a36dFFAa31",
                     420000000
                  ]
               }]
               logs: []
            }
         }
      }
   ]
}
```

Once hydration occurs, and state artifacts are parsed, condition and rules operations can be applied.