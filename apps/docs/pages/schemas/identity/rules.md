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
- issuedBy(DID, [ConditionId...])
- issuedByOneOf([DID] | DIDRegistry, [ConditionId...])
- issuedBefore(Number, [ConditionId...])
- issuedAfter(Number, [ConditionId...])
- expirationBefore(Number, [ConditionId...])
- expirationAfter(Number, [ConditionId...])

```ts
type RuleOperation = {
  method:  "all" | "oneOf" | "range" | "issuedBy" | "issuedByOneOf" | "issuedBefore" | "issuedAfter" | "expirationBefore" | "expirationAfter" ;
  args: (number | string | Array[number | string])[];
};
```

## How It Works

Rules 

In the example below the `all` rule operation is applied to the singular condition.

```json
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
"rules": [
    {
        "id": "rule:all",
        "root": true,
        "operations": [
            {
                "method": "all",
                "args": ["condition:membership:issuance"]
            }
        ]
    }
]
```

Can you guess what will happen during runtime?

The `all` operation checks if all of the `condition` is reference is satisfied. In this case, we're checking to see if the `membershipLevel` field has a value greater than 5.

The `all` operator accepts a list condition or rule references, but since this set only contains a single condition and a single rule, we only pass in the single condition with the identifier `condition:membership:issuance`.

## Rule Recursion

Rules can also reference other rules. This is why a set must contain at least 1 rule with `root` set to `true`, because the runtime engine needs to know which rule(s) to start traversing operations from.

Below is an example of set that describes requiring presenting a Membership/Ticket or a Verified Identity Pass. A set like this is useful for programmatically requesting a verifiable presentation from a user at an event. If either condition is met, then the guest can enter the event. And if no conditions are met it means they were not invited.

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
        "root": true,
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

As we can see the set contains several rules:

- rule:base
- rule:district-member-with-ticket
- rule:district-member-with-vip

The `rule:base` rule references the two other rules. That is why it's marked as the root.

The rules state that if either `rule:district-member-with-ticket` or the `rule:district-member-with-vip` rule can be satisfied, the set will validate.