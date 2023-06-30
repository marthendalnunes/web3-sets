# EVM Runtime Output

The EVM runtime outputs a `SetAnalysis` which includes metadata like if the runtime conditions and rules have been met, and which state artifacts 

```ts
type RuntimeOutput = {
  status: Boolean;
  results: {
    entities: [
      {
        id: String;
        status: Boolean;
        conditions: ConditionResults[]
      }
    ];
    rules: RuleOperationResults[];
  }
}

type ConditionResults = {
  cid: String;
  operations: ConditionOperationResults[];
  artifacts: EVMArtifactConditionOperationLink[];
}

type ArtifactOperationMatchLink = {
  opidx: Number; // Operation index in the conditions object
  ref: String // reference to artifact identifier i.e. transaction hash
}

type ConditionOperationResults = {
  status: Boolean;
  metadata: any // Runtime operators should decide what runtime metadata should be stored
}

type RuleOperationResults = {
  status: Boolean;
  metadata: any // Runtime operators should decide what runtime metadata should be stored
}
```

### How It Works

```js
// EVM Set
{
	entities: [
		{
      id: "pooltogether:v4:prizepool",
			chainId: 10,
			address: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
			abi: "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H"
		}
	],
	conditions: [
		{
			id: "condition:depositTo",
			eid: "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
			type: "transaction",
			signature: "depositTo(address,uint256)",
			operations: [
				{
					method: "observe",
					args: [1, "gte", "100000000"]
				}
			]
		}
	],
	rules: [
		{
			id: "rule:all",
			operations: [
				{
					method: "all",
					args: [
						"condition:depositTo"
					]
				},
			]
		}
	]
}
```

```js
// EVM Artifacts
{
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
}
```


```js
// Runtime Output
{
  status: true,
  results: {
    entities: [
      {
        id: "pooltogether:v4:prizepool",
        status: true,
        conditions: [
          {
            cid: "condition:depositTo"
            operations: [
              {
                status: true,
                metadata: {} // Runtime specific. Different operators might want to attach different artifact operation metadata.
                artifacts: [
                    {
                      id: "0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891"
                      reference: "transaction"
                    }
                  ]
              }
            ]
          }
        ]
      }
    ],
    rules: [
      {
        id: "rule:all",
        status: true,
        root: true,
        operations: [
          {
            status: true,
            method: 'all',
            references: [
              {
                id: 'condition:depositTo',
                reference: "condition"
              }
            ]
          }
        ]
      }
    ]
  }
}
```