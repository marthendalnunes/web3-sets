# EVM Runtime Mutations

During the EVM runtime multiple mutations are applied to input arguments.

A new object named `SetHydrated` is created and linked conditions and EVM artifacts are co-located with the hydrated Entity object.

For example all transactions and log artifacts related to an Entity will be added to the `EntityHydrated` object inside of the `SetHydrated` object.

After the state artifacts have been added to the `EntityHydrated` object, raw state like transactions will be parsed using the Entity ABI. In the future storage proofs will be used to determine the validity of EVM state artifacts.

```json
{
   "cidToEntityIndex": {
    "cid": 0
   },
   "clients": ["CLIENT"],
   "rules": [
    {
      "id": "rule.complete",
      "operations": ["all"],
      "args": [["condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000"]]
    }
  ],
   "entities":[
      {
         "chainId":10,
         "address":"0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
         "abi":"ipfs://Qmc6MHybup7ppGgUdyEcsi5jqCeTAPtcxF9wBaco56Uc1H",
         "name":"PoolTogether USDC Prize Pool",
         "state": {
            "raw": {
                "transactions": [],
                "logs": [],
                "proofs": [],
                "receipts": [],
            },
            "parsed": {
                "transactions": [],
                "logs": [],
                "proofs": [],
                "receipts": [],
            }
         },
        "matches": {
            "transactions": [],
            "logs": [],
            "proofs": [],
            "receipts": [],
        },
         "conditions":[
            {
               "id":"condition:0x79bc8bd53244bc8a9c8c27509a2d573650a83373:depositTo:gte:100000000",
               "eid":"0x79bc8bd53244bc8a9c8c27509a2d573650a83373",
               "name":"PoolTogether Optimism Deposit over 1 USDC",
               "type":"transaction",
               "signature":"depositTo(address,uint256)",
               "values":[
                  {
                     "index":1,
                     "type":"bignumber",
                     "condition":"gte",
                     "value":"10000000"
                  }
               ]
            }
         ]
      }
   ]
}
```