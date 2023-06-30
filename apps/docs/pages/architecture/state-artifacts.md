# State Artifacts

In Web3 Sets `artifacts` are measurable outputs of cryptographic operations.

Blockchain transactions and verifiable credential issuance are examples of artifacts produced by an entity.

For example when an Account interacts with a Smart Contract multiple EVM state artifacts can be produced: transactions, logs and storage proofs. Artifacts are cryptographically verifiable and can provide data authenticity guarantees to runtime engines.

**EVM Artifacts**
- Transaction (transaction)
- Log (log)
- Storage Proof (storage_proof)

**Identity Artifacts**
- Decentralized Identifier Document (did)
- Verifiable Credential (credential)
- Verifiable Presentation (presentation)


## Why are State Artifacts Important?

State artifacts are **required** to validate sets.

The **runtime** engines consume both **sets** and **state artifacts**.

Without state artifacts, it wouldn't be possible to check if the set condition and rule operation are satisfied because there would be nothing to compare them against.

**How state artifacts are gathered is up to a runtime service operator.**

In the case of public blockchains and rollups like Ethereum, Optimism and Arbitrum, state artifacts are relatively easy to obtain. You can request them from JSON-RPC node providers, if you trust them, or run a node and query blockchain history directly. You could even generate your own storage proofs or request storage proofs from third-party service providers.

And in some instances where data is private by default, like verifiable credentials and verifiable presentations, the state artifacts require explicit selective disclosure requests from users.