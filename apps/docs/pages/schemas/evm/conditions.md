# Conditions

Conditions are collections of operations applied to a specific [Entity](/architecture/entities) to measure a desired behavior.

```ts
type Condition = {
  id: string;
  eid: string;
  type: "transaction" | "log" | "storage_proof";
  signature: string;
  operations: Operation[];
};
```
### Operations

- beforeBlock(Number)
- afterBlock(Number)
- betweenBlocks(Number, Number)
- beforeTimestamp(String)
- afterTimestamp(String)
- betweenTimestamp(String, String)
- to(Address)
- from(Address)
- nonce(Condition, Number)
- value(Condition, Number)
- observe(key:String, operator: Operator, value: String | Number)
- observeOneOf([(key:String, operator: Operator, value: String | Number)])

### ID
Unique identifier using the URN pattern (e.x. condition:identification:property).

### Entity ID (eid)
Target entity id to run condition operations on.

### Operations
Logic branch operations for conditions and other rules.


```ts
type ConditionOperation = {
  method: "beforeBlock" | "afterBlock" | "beforeTimestamp" | "afterTimestamp" | "to" | "from" | "nonce" | "value" | "observe" | "observeOneOf";
  args: (number | string | Array[number | string])[];
};
```

### Comparators
- eq
- !eq
- gt
- gte
- lt
- lte
- regex

## How It Works

The EVM condition operators target EVM [state artifacts](/architecture/state-artifacts.md).

The example applies a single condition operation to a smart contract entity.

```json
{
    "entities": [
		{
			"chainId": 10,
			"address": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
			"abi": "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
			"name": "PT:V4:PrizePool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:Optimism"
		}
	],
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
}
```



```json
"conditions": [
    {
      "id": "condition:pt:v4:deposit:usdc",
      "eid": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
      "type": "transaction",
      "signature": "depositTo(address,uint256)",
      "operations": [
        {
            "method": "afterBlock",
            "args": 420,
        },
        {
            "method": "beforeBlock",
            "args": 690,
        }
      ],
    }
],
```

Example of condition operations for both `transactions` and `log` state artifacts.
```json
"conditions": [
    {
        "id": "condition:pt:prizepool:usdc:depositTo",
        "eid": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
        "type": "transaction",
        "signature": "depositTo(address,uint256)",
		"operations": [
			{
				"method": "observe",
				"args": [1, "gte", "100000000"]
			}
		]
    },
    {
        "id": "condition:usdc:token:event:transfer",
        "eid": "0x7EA2be2df7BA6E54B1A9C70676f668455E329d29",
        "type": "log",
        "signature": "Transfer(address,uint256)",
        "operations": [
			{
				"method": "observe",
				"args": [1, "gte", "100000000"]
			}
		]
    }
],
```

Example of observation of transaction input values with deeply nested values inside of Tuples/Objects
```json
{
    "entities": [
        {
            "name": "DelegatableERC721Controller : Disco District NFT Minter",
            "chainId": 1,
            "address": "0xc81136B1f99b4bA4F6c0BddC56AB8D5EFb9E908f",
            "abi": "ipfs://QmdX4Hh5DrKyZsfSRScGvDupS3Eajhboz85J9m9UR4o3i9"
        }
    ],
    "conditions": [
        {
            "id": "condition:mint",
            "eid": "0xc81136B1f99b4bA4F6c0BddC56AB8D5EFb9E908f",
            "name": "Execute Mint",
            "type": "transaction",
            "signature": "invoke(tuple[])",
			"operations": [
			{
				"method": "observe",
				"args": ["[0].invocations.batch[0].authority[0].delegation.caveats[0].terms", "eq", "0x0000000000000000000000000000000000000000000000000000000000000001"]
			}
		]
            "observations": [
            {
                "index": 0,
                "condition": "eq",
                "selector": "[0].invocations.batch[0].authority[0].delegation.caveats[0].terms",
                "value": "0x0000000000000000000000000000000000000000000000000000000000000001"
            }
            ]
        }
    ],
}
```
In the snippet above we reference a NFT smart contract that inherits the [delegatable framework](https://delegatable.org/) smart contract.

A single condition operator states it wants to "observe" when a user executes the `invoke` function with a deeply nested value inside of an object, inside of a tuple.

The value we're searching for `0x0000...00001` inside of the `terms` field describes specific permissions assigned to a user before transaction execution. The purpose of this example is to demonstrate we can observe a very specific slice of data in a [state artifact](/architecture/state-artifacts.md). 