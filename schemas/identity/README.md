# Web3Set::Identity

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

The `Web3Set::Identity` schema is used to formally describe relationships between verifiable credentials, decentralized identifiers and public key registries.

**Documentation**
- [Entities](docs/entities)
- [Operators](docs/operators)

## Why

A benefit of the schema is being able to request [verifiable presentations](https://www.w3.org/TR/vc-data-model/#dfn-verifiable-presentations) from users using a set as an indicator for what credentials and issuers will be accepted.

For example to purchase a ticket for a special Ethereum Developer event I have to present at-least 1 Proof of Attendance verifiable credential from a ETHGlobal hackathon.

Another benefit is describing complex access control systems using distributed database technologies.

For example I want to give my community a special privilege and they can qualify with Proof of Mint verifiable credential for the PoolTogether Pooly or Zerion Gensis NFTs.
