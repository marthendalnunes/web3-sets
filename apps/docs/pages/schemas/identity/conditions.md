# Conditions

Conditions are operations applied to a specific [Entity](/architecture/entities) to define a desired behavior.

```ts
// Minimum condition implementation
type Condition = {
  id: string;
  eid: string;
  operations: ConditionOperation[];
};
```

### ID
Unique identifier using the URN pattern (e.x. condition:identification:property).

### Entity ID (eid)
Target entity id to run condition operations on.

### Operations
Logic branch operations for conditions and other rules.

```ts
type Condition = {
  id: string;
  eid: string;
  operations: ConditionOperation[];
};
```
### Operations

- issuedBy(DID)
- issuedByOneOf([DID] | DIDRegistry)
- issuedBefore(Number)
- issuedAfter(Number)
- expirationBefore(Number)
- expirationAfter(Number)
- observe(key:String, operator: Operator, value: String | Number)
- observeOneOf([(key:String, operator: Operator, value: String | Number)])

### Comparators
- eq
- !eq
- gt
- gte
- lt
- lte
- regex

## How It Works
A verifiable credential artifact matching the entity schema must be presented.

In the `MembershipCredential` credential, a `membershipLevel` field is a child of the `credentialSubject` field.

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

```js
// MembershipCredential credentialSubject fields i.e. the important part of credential.
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

In the set example above two operations will be applied to a verifiable credential artifact at runtime.

The first condition `issuedBy` expects the credential to have been issued by the Disco Primary decentralized identifier.

The second condition `observe` method states the credential membership level should be equal to or greater than 5.
