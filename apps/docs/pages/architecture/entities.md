# Entities

Entities are the objects of the Web3 Universe.

```ts
// Minimum Entity implementation
type Entity = {
  id: string;
};
```

### ID
Unique identifier using the URN pattern (e.x. entity:[protocol]:[version])

## How It Works

Resource objects like smart contracts, verifiable credentials, decentralized identifiers, public key registries, and other cryptographic primitives with predictable and measurable behaviors.

 - smart contracts
 - verifiable credentials
 - decentralized identifiers 
 - public key registries

In Web3 Sets each Entity is measured according to its unique properties.

Below are examples of a smart contract and verifiable credentials entities.

```json
// Smart Contracts
// PT:V4:PrizePool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:Optimism (https://optimistic.etherscan.io/address/0x79bc8bd53244bc8a9c8c27509a2d573650a83373)
"entities": [
    {
        "chainId": 10,
        "address": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
        "abi": "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
        "name": "PT:V4:PrizePool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:Optimism"
    }
],
```

```json
// Verifiable Credentials
// disco:credential:membership (https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/MembershipCredential/1-0-0.json)
"entities": [
    {
        "schema": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/MembershipCredential/1-0-0.json",
        "id": "disco:credential:membership",
        "name": "Membership",
    },
],
```

As you can see each `Entity` has unique identifying properties. The properties are used to "hydrate" the entity during runtime execution.

In the case of the smart contract entity hydration is characterized by fetching the ABI reference. For other entities like verifiable credential, it requires triggering a selective disclosure request and obtaining credentials that will be presumed to pass validation during the runtime.

If the Entity can be defined (measurable inputs and outputs) it can be added to a Web3 Sets schema and runtime.

Entity Roadmap

- [ ] Decentralized Identifiers
- [ ] Public Key Registries
- [ ] Ceramic Streams
- [ ] Zero-Knowledge Computations
- [ ] Object Capabilities ([EVM delegations](https://delegatable.org/) and [SIWE ReCaps](https://ethereum-magicians.org/t/eip-5573-siwe-recap/10627))

Want to recommend an Entity definition?

Create an issue on the [Web3 Sets Github repo](https://github.com/district-labs/web3-sets)