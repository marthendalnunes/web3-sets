# Entities

The Identity set contains two primary entity types.

**Types**
- Data Schema (schema)

```ts
type DataSchema {
    id: URN;
    schema: URL;
}
```

### ID
Unique identifier using the URN pattern (e.x. entity:identification:property).

### Schema
Reference to a schema for generating a verifiable credential state artifact.

## How It Works

A `DataSchema` Entity describes how a `VerifiableCredential` artifact will be generated.

For example, the entity below contains a reference to the `GMCredential` credential schema.

```json
"entities": [
    {
        "id": "disco:credential:gm",
        "name": "GM Credential",
        "schema": "https://raw.githubusercontent.com/discoxyz/disco-schemas/main/json/GMCredential/1-0-0.json"
    }
],
```

A GMCredential state artifact (i.e. verifiable credential) will resemble the example below.

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
  "isPublic": false,
  "recipient": "did:3:kjzl6cwe1jw149ofmn3uw261yxv5eio39po2auvgdjxyidmxvqufpnsxrgmo2oa",
  "updatedAt": "2023-03-08T23:50:29.657Z"
}
```

For simplicity's sake think of Entities as describing how Artifacts will be generated. Artifacts are the objects, which contain data we can cryptographically prove.

In this instance, we know we want a verifiable credential of type GMCredential, so we reference the Entity (DataSchema), which gives us the metadata we need to accurately validate the GMCredential at runtime.

Since the GMCredential only contains an `id` key in the `credentialSubject` it's relatively simple to parse. But more complex verifiable credentials require more complex validation conditions and rules, depending on the type of data being requested.