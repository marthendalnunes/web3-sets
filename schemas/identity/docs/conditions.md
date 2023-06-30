# Conditions

An condition operator is a specific logical action or process that can be applied to an `Entity` object.

For example the `issuedBy` operator can be applied to `credential` object to validate issuance by a specific `identifier`.

### Type::VerifiableCredential

Questions that can be answered using `credential` conditions:

- Who issued the verifiable credential? 
- When was the credential issued? 
- When will the credential expire?
- Does it contain a specific value? 
- Does it contain a range of potential values?

#### Operations & Arguments
```
issuedBy(DID | DIDRegistry)
issuedByOneOf([DID] | DIDRegistry)
issuedBefore(Number)
issuedAfter(Number)
expirationBefore(Number)
expirationAfter(Number)
is(key:String, operator: Operator, value: String | Number)
isOneOf(key:String, operator: [Operator], value: [String | Number])
```