# Entities

The Web3Set::Identity schema includes `Entities` core to decentralized identity:

- Verifiable Credentials (credentials)
- Decentralized Identifiers (identifiers)
- Public Key Infrastructure (registries)

Entities are referenced in multiple location of the set schema. Both as a referencle `Entity` object and also as `Condition` arguments. 

### Type::Credential

The `Credential` type represents a verifiable credential object.

Example of defining a `credential` object in the `Entities` list.
```json
"entities": [
    {
        "type":"credential",
        "id": "disco:credential:gm",
        "name": "GM Credential",
        "schema": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json",
    }
],
```

### Type::Identifier

The `Identifier` type represents a decentralized identifier object.

Example of an `identifier` an input argument in the `issuedBy` operator.

```json
"conditions": [
    {
        "id": "condition:issuance",
        "eid": "disco:credential:disconaut",
        "operations": ["issuedBy"],
        "args": [
            ["did:3:kjzl6cwe1jw14bfc93dsmejffll3j687kpq3te8ntmcjb98erxj9x8mdrdompf6"]
        ]
    } 
]
```

### Type::Registry

The `Registry` type represents a public key infrastructure object.

Example of an `registry` an input argument in the `issuedByOneOf` operator.

DISCLAIMER: The standard for a onchain PKI needs to be finalized.

```json
"conditions": [
    {
        "id": "condition:issuance",
        "eid": "disco:credential:disconaut",
        "operations": ["issuedByOneOf"],
        "args": [
            ["registry:eip155:10:v0:0x0000000000000000000000000000000000000000"]
        ]
    } 
]
```