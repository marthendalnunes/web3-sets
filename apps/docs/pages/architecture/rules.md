# Rules

Rules are logic branches applied to Conditions and other Rules.

```ts
// Minimum rule implementation
type Rule = {
  id: string;
  root?: Boolean;
  operations: RuleOperation[];
};
```

### ID
Unique identifier using the URN pattern (e.x. rule:identification:property)

### Root
The `root` boolean field designates an entry rule. **A set must have 1 or more root rules.**

For example, if 3 rules exist, but 1 of those rules is `oneOf` for the 2 other rules, the runtime needs to start at the root rule.

The [Disco District Party Set]() set demonstrates this specific use case.

### Operations
Logic branch operations for conditions and other rules

# How It Works

```json
{
    "entities": [
		{
			
			"id": "disco:credential:gm",
			"name": "GM Credential",
			"schema": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json"
		}
	],
	"conditions": [
		{
			"id": "condition:gm:issuance",
			"eid": "disco:credential:gm",
			"operations": [
				{
					"method": "issuedBy",
					"args": [
						"did:3:kjzl6cwe1jw14bfc93dsmejffll3j687kpq3te8ntmcjb98erxj9x8mdrdompf6"
					]
				},
			]
		}
	],
	"rules": [
		{
			"id": "rule:base",
			"operations": [
				{
					"method": "count",
					"args": ["condition:gm:issuance", 50]
				}
			]
		}
	]
}
```

In the example above the Rule contains a `count` operation, which requires a minimum number of the GMCredential to be available during runtime validation.

Rules can also enforce logic branches on other Rules.

Below is a relatively complex set that defines several conditions and rules for an imagined District Disco Party. Stating that either a Membership and Ticket credential or VIP credential must be available during the runtime to pass validation.

Simplified set statement `Membership + Ticket || Verified Identity Pass = True`


```json
    "entities": [
		{
			
			"id": "disco:credential:membership",
			"name": "Membership",
			"schema": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/MembershipCredential/1-0-0.json"
		},
		{
			
			"id": "disco:credential:ticket",
			"name": "Ticket",
			"schema": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/TicketCredential/1-0-0.json"
		},
		{
			
			"id": "disco:credential:vip",
			"name": "VIP (Verified Identity Pass)",
			"schema": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/VerifiedIdentityPass/1-0-0.json"
		}
	],
	"conditions": [
		{
			"id": "condition:member:district",
			"eid": "disco:credential:membership",
			"operations": [
				{
					"method": "issuedBy",
					"args": ["did:web:districtlabs.com"]
				}
			]
		},
		{
			"id": "condition:vip:district",
			"eid": "disco:credential:vip",
			"operations": [
				{
					"method": "issuedBy",
					"args": ["did:web:districtlabs.com"]
				}
			]
		},
		{
			"id": "condition:ticket:district-disco-party",
			"eid": "disco:credential:ticket",
			"operations": [
				{
					"method": "issuedBy",
					"args": ["did:web:disco.xyz"]
				}
			]
		}
	],
	"rules": [
		{
			"id": "rule:base",
			"operations": [
				{
					"method": "oneOf",
					"args": [
						"rule:district-member-with-ticket",
						"rule:district-member-with-vip"
					]
				}
			]
		},
		{
			"id": "rule:district-member-with-ticket",
			"operations": [
				{
					"method": "all",
					"args": [
						"condition:member:district",
						"condition:ticket:district-disco-party"
					]
				}
			]
		},
		{
			"id": "rule:district-member-with-vip",
			"operations": [
				{
					"method": "all",
					"args": ["condition:vip:district"]
				}
			]
		}
	]
```