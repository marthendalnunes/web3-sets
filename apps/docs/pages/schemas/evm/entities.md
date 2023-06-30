# Entities

The EVM set contains two primary entity types.

**Types**
- Account (account)
- SmartContract (smart_contract)

```ts
type Account {
    did: DID;
    address: Address;
}

type SmartContract {
    chainId: Number;
    address: Address;
    abi: URI;
    name?: String;
}
```
## Account
Coming soon...

## Smart Contract
A `SmartContract` entity requires the `chainId`, `address` and `abi` fields. 

These fields are used to identify, locate and initialize a [state artifact](/architecture/state-artifacts) interpreter.

Below is an example of PoolTogether V4 PrizePool on the Optimism rollup. 

```json
// Smart Contracts
// pooltogether:v4:prizepool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:optimism (https://optimistic.etherscan.io/address/0x79bc8bd53244bc8a9c8c27509a2d573650a83373)
"entities": [
    {
        "name": "pooltogether:v4:prizepool:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:optimism",
        "chainId": 10,
        "address": "0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
        "abi": "ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
    }
],
```

And here is an example of the Coinbase Stand with Crypto Collectible on the Ethereum mainnet.

```json
// Smart Contracts
// zora:coinbase:stand_with_crypto:0x9d90669665607f08005cae4a7098143f554c59ef:mainnet (https://etherscan.io/address/0x9d90669665607f08005cae4a7098143f554c59ef)
"entities": [
    {
        "name": "zora:coinbase:stand_with_crypto:0x9d90669665607f08005cae4a7098143f554c59ef:mainnet",
        "chainId": 1,
        "address": "0x9d90669665607f08005cae4a7098143f554c59ef",
        "abi": "ipfs://QmWesVTzwwEUxaHkf3kbNWWPKoiFsxTxJCsubVH9V1VEeW"
    }
],
```
