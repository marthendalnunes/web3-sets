# Rules

Rules are logic branches applied to Conditions and other Rules.

- id - unique identifier using the URN pattern (e.x. rule:identification:property)
- root - status flag if the rule operation is an entry rule
- operations - logic branches for conditions and other rules

```ts
type Rule = {
  id: string;
  root?: Boolean;
  operations: RuleOperation[];
};
```

### Operations
**Operations applicable to conditions and other rules.**
- all([ConditionOrRuleId]) - All conditions listed must be satisfied.
- oneOf([ConditionOrRuleId]) - One of the conditions listed must be satisfied.
- range([[ConditionOrRuleIdOne], [ConditionOrRuleIdTwo, ConditionOrRuleIdThree] ) - One of the conditions listed must be satisfied.

**Operations only applicable to conditions.**
- beforeBlock(Number, [ConditionId...])
- afterBlock(Number, [ConditionId...])
- betweenBlocks(Number, Number, [ConditionId...])
- beforeTimestamp(String, [ConditionId...])
- afterTimestamp(String, [ConditionId...])
- betweenTimestamp(String, String, [ConditionId...])

```ts
type RuleOperation = {
  method:  "all" | "oneOf" | "range" | "beforeBlock" | "afterBlock" | "beforeTimestamp" | "afterTimestamp";
  args: (number | string | Array[number | string])[];
};
```

## How It Works

Rules 

In the example below the `all` rule operation is applied to the singular condition.

```json
"entities": [
  {
    "chainId": 10,
    "address": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
    "abi": "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
  }
],
"conditions": [
  {
    "id": "condition:depositTo",
    "eid": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
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
"rules": [
  {
    "id": "rule.complete",
    "operations": [
      {
        "method": "all",
        "args": [
          "condition:depositTo"
        ]
      }
    ]
  }
]
```

Can you guess what will happen during runtime?

The `all` operation checks if all of the `condition` reference is satisfied.

The `all` operator accepts a list condition or rule references, but since this set only contains a single condition and a single rule, we only pass in the single condition with the identifier `condition:depositTo`.

