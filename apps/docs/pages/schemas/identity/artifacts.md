# Artifacts

The Identity set entities generate state artifacts.

**Types**
- Decentralized Identifier Document (document)
- Verifiable Credential (credential)
- Verifiable Presentations (presentation)

```ts
interface DIDDocument {
  '@context': string;
  id: string;
  publicKey?: Array<PublicKey>;
  verificationMethod?: Array<VerificationMethod>;
  authentication?: Array<string>;
  assertionMethod?: Array<string>;
  capabilityDelegation?: Array<string>;
  capabilityInvocation?: Array<string>;
  keyAgreement?: Array<string>;
  service?: Array<Service>;
}

interface PublicKey {
  id: string;
  type: string;
  controller: string;
  publicKeyBase58?: string;
  publicKeyJwk?: object;
  publicKeyHex?: string;
  publicKeyPem?: string;
}

interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyBase58?: string;
  publicKeyJwk?: object;
  publicKeyHex?: string;
  publicKeyPem?: string;
}
```

```ts
interface VerifiableCredential {
  '@context': string | string[];
  type: string | string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: object;
  id?: string;
}
```

```ts
interface VerifiablePresentation {
  '@context': string | string[];
  type: string | string[];
  holder?: string;
  verifier?: string | string[];
  issuanceDate?: string;
  expirationDate?: string;
  verifiableCredential: any[];
  proof?: any;
  [key: string]: any;
}
```

## How It Works

Artifacts are generated from Entities. Artifacts are the objects, which contain data we can cryptographically prove.

For example a `VerifiableCredential` artifact inherently include a reference to a `DataSchema` entity.

The data schema is the "thing" that describes how an artifact can be cryptographically verified.

### Decentralized Identifier Documents
Coming soon...

### Verifiable Presentations
Coming soon...

### Verifiable Credential

Below is an example of a verifiable credential artifact of type GMCredential.

The `VerifiableCredential` artifact even includes a reference `DataSchema` entity in the `credentialSchema.id` field.

```json
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "credentialSchema": {
    "id": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json",
    "type": "JsonSchemaValidator2018"
  },
  "credentialSubject": {
    "id": "did:3:kjzl6cwe1jw149ofmn3uw261yxv5eio39po2auvgdjxyidmxvqufpnsxrgmo2oa"
  },
  "id": "did:3:kjzl6cwe1jw145hfb9pfeoxwdl32e9f0ilwg3y7p8y5jn2ayksyoh3l3eqzg2ex#74ffe0d7-9a92-4a96-82ee-0600812d69f9",
  "issuanceDate": "2023-03-08T23:50:29.657Z",
  "issuer": {
    "id": "did:3:kjzl6cwe1jw145hfb9pfeoxwdl32e9f0ilwg3y7p8y5jn2ayksyoh3l3eqzg2ex"
  },
  "type": ["VerifiableCredential", "GmCredential"],
  "genId": "4b803b4d-cebe-45a7-a10f-17856446ba62",
  "proof": {
    "jwt": "eyJraWQiOiJkaWQ6MzpranpsNmN3ZTFqdzE0NWhmYjlwZmVveHdkbDMyZTlmMGlsd2czeTdwOHk1am4yYXlrc3lvaDNsM2VxemcyZXg_dmVyc2lvbi1pZD0wIzN1ZTc2c1VEbXlIMk5DcCIsImFsZyI6IkVTMjU2SyJ9.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJjcmVkZW50aWFsU2NoZW1hIjp7ImlkIjoiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Rpc2NveHl6L2Rpc2NvLXNjaGVtYXMvbWFpbi9qc29uL0dNQ3JlZGVudGlhbC8xLTAtMC5qc29uIiwidHlwZSI6Ikpzb25TY2hlbWFWYWxpZGF0b3IyMDE4In0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOjM6a2p6bDZjd2UxancxNDlvZm1uM3V3MjYxeXh2NWVpbzM5cG8yYXV2Z2RqeHlpZG14dnF1ZnBuc3hyZ21vMm9hIn0sImlkIjoiZGlkOjM6a2p6bDZjd2UxancxNDVoZmI5cGZlb3h3ZGwzMmU5ZjBpbHdnM3k3cDh5NWpuMmF5a3N5b2gzbDNlcXpnMmV4Izc0ZmZlMGQ3LTlhOTItNGE5Ni04MmVlLTA2MDA4MTJkNjlmOSIsImlzc3VhbmNlRGF0ZSI6IjIwMjMtMDMtMDhUMjM6NTA6MjkuNjU3WiIsImlzc3VlciI6eyJpZCI6ImRpZDozOmtqemw2Y3dlMWp3MTQ1aGZiOXBmZW94d2RsMzJlOWYwaWx3ZzN5N3A4eTVqbjJheWtzeW9oM2wzZXF6ZzJleCJ9LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiR21DcmVkZW50aWFsIl19.5-Y9GkZE6M0WXRebtNJlJHyVxTHlK-98UVdiju_Zw1KbCoSkMTN8KTRtmRcdYUnZ3oTV11KINVz8xmH4jepymA"
  },
  "recipient": "did:3:kjzl6cwe1jw149ofmn3uw261yxv5eio39po2auvgdjxyidmxvqufpnsxrgmo2oa",
}
```

And here is an example of a verifiable credential artifact of type TshirtSizeCredential.

The `credentialSubject` field, the location for custom credential data fields, includes the `tshirtSize` field with a value of `L - Unisex`

```json
{
  "id": "did:3:kjzl6cwe1jw149ofmn3uw261yxv5eio39po2auvgdjxyidmxvqufpnsxrgmo2oa#364c2d5b-9af6-4cdf-96e0-febdb35afabd",
  "type": [
    "VerifiableCredential",
    "TshirtSizeCredential"
  ],
  "genId": "923d4427-49e7-48ff-b876-86127aa64b4b",
  "issuer": {
    "id": "did:3:kjzl6cwe1jw149ofmn3uw261yxv5eio39po2auvgdjxyidmxvqufpnsxrgmo2oa"
  },
  "@context": [
    "https://www.w3.org/2018/credentials/v1"
  ],
  "isPublic": false,
  "recipient": "did:3:kjzl6cwe1jw149ofmn3uw261yxv5eio39po2auvgdjxyidmxvqufpnsxrgmo2oa",
  "updatedAt": "2022-12-07T11:00:04.227Z",
  "issuanceDate": "2022-12-07T11:00:04.227Z",
  "credentialSchema": {
    "id": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/TshirtSizeCredential/1-0-0.json",
    "type": "JsonSchemaValidator2018"
  },
  "credentialSubject": {
    "id": "did:3:kjzl6cwe1jw149ofmn3uw261yxv5eio39po2auvgdjxyidmxvqufpnsxrgmo2oa",
    "tshirtSize": "L - Unisex"
  }
}
```

Arguably it's the `tshirtSize` data field you care if consuming this verifiable credential.

[Conditions](conditions.md) and [Rules](rules.md) are how we apply logic operations on these important fields. As a set developer you'll want to apply custom logic operators on an infinite list of potential credential artifacts and their unique data fields.

