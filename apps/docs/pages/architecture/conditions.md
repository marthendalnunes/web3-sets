# Conditions

Conditions are operations applied to a specific [Entity](/architecture/entities) to define a desired behavior.

```ts
// Minimum condition implementation
type Condition = {
  id: string;
  eid: string;
  operations: RuleOperation[];
};
```

### ID
Unique identifier using the URN pattern (e.x. condition:identification:property).

### Entity ID (eid)
Target entity id to run condition operations on.

### Operations
Logic branch operations for conditions and other rules.

## How It Works
A smart contract entity might have multiple methods which can be executed.

```json
{
    "entities": [
		{
			"id": "entity:pooltogether:v4:prizepool",
			"chainId": 10,
			"address": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
			"abi": "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H"
		}
	],
	"conditions": [
		{
			"id": "condition:depositTo:gte:100000000",
			"eid": "entity:pooltogether:v4:prizepool",
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
			"id": "condition:depositToAndDelegate:gte:100000000",
			"eid": "entity:pooltogether:v4:prizepool",
			"type": "transaction",
			"signature": "depositToAndDelegate(address,uint256,address)",
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

In the above example, we've applied a condition to the `PT:V4:PrizePool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:Optimism` entity which measures a specific transaction EVM state artifact.

The condition specifically states a `Transaction` EVM state artifact, denoted by the `"type": "transaction"` field, calling the target entity must include a deposit amount greater than 10 USDC.

Multiple conditions can be applied to the same entity. For example, you could require both `depositTo` and `withdraw` transaction artifacts to be present before the set can be validated. In that instance, it would require both the `depositTo` and `withdraw` transaction EVM state artifacts to be passed into the runtime engine.

For brevities sake let's example the `credential` Entity will conditions applied to state artifacts.

```json
{
    "entities": [
		{
			
			"id": "district:credential:membership",
			"name": "Membership",
			"schema": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/MembershipCredential/1-0-0.json"
		}
	],
	"conditions": [
		{
			"id": "condition:membership:issuance",
			"eid": "district:credential:disconaut",
			"operations": [
				{
					"method": "issuedBy",
					"args": [
						"did:3:kjzl6cwe1jw14bfc93dsmejffll3j687kpq3te8ntmcjb98erxj9x8mdrdompf6"
					]
				},
				{
					"method": "observe",
					"args": ["credentialSubject.membershipLevel", "gte", "5"]
				}
			]
		}
	],
}
```

In the example above The `credential` Entity using the `MembershipCredential` schema has two condition operations applied to the state artifact we expect to be available during runtime.

For context here are the sub-fields available the MembershipCredential credential.

```js
properties: {
    id: { title: "Member DID", type: "string", format: "uri" },
    organization: { title: "Organization Name", type: "string" },
    membershipType: { title: "Membership Type", type: "string" },
    membershipLevel: { title: "Membership Level", type: "string" },
    memberId: { title: "Member ID", type: "string" },
    membershipDescription: { title: "Membership Description", type: "string" },
    expiration: { title: "Expiration", type: "string", format: "date" },
},
```

The second condition using the `observe` method is stating the verifiable credential that will be available at runtime is expected to have a membership level equal to or above 5.
