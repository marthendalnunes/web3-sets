# Backlog
The TrustAnchorGateway V2 prototype include multiple development stages.

- Inputs
    - [ ] Sets
    - [ ] Authorizations
- Outputs
    - [ ] Offchain Authorizations
    - [ ] Onchain Access Controls

## Input Sets

Input sets are an essential TrustAnchorGateway feature.

The EVM set has been prototype. The Identity and Collection schemas still remain.

Development Status:

- [ ] EVM - In Progress
- [ ] Identity - Backlog
- [ ] Collection - Backlog

## EVM Schema
The EVM set schema is responsible account and smart contracts.

### Tasks
- [x] Schema
- [ ] Runtime
    - Conditions
        - [x] Transactions
        - [ ] Events
        - [ ] Reads
        - [ ] Archive Reads
        - [ ] Storage Proofs
    - Operations
        - [x] Complete
        - [ ] BeforeTimestamp
        - [ ] AfterTimestamp
        - [ ] BeforeBlock
        - [ ] AfterBlock

## Identity Schema
The Identity set schema is responsible for decentralized identifiers and verifiable credentials.

- [ ] Schema
- [ ] Runtime

## Collection
The Collection set schema is responsible for composing sets of different types together.

- [ ] Schema
- [ ] Runtime Prototype


## Input Authorizations

Input authorizations are an optional TrustAnchorGateway feature.

### Tasks
- [ ] Selective Disclosure
- [ ] JWT
- [ ] Biscuits
- [ ] SIWE Messages
- [ ] URNs and Object Capabilities (e.x. disco:read:gms)

## Output Offchain Authorizations
A TrustAnchorGateway outputs access controls for distributed/decentralized systems.

### Tasks
- [ ] JWT (JSON Web Tokens)
- [ ] Biscuit
- [ ] Object Capability (ReCap)

## Output Offchain Access Controls

### Tasks
- [ ] Signed Transaction
    - [ ] Normal
    - [ ] Delegation
    - [ ] Sponsored (Account Abstraction)