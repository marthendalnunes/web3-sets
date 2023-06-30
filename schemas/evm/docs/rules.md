## Rules

The Web3Set::Identity schema `Rules` define how `Conditions` can be applied for determining a valid set.

For example the `oneOf` operation can be used to declare the set is valid whether "Transaction A" or "Transaction B" condition has been met.

### Operations & Arguments

```
all([ConditionId]) - All conditions listed must be satisfied.
oneOf([ConditionId]) - One of the conditions listed must be satisfied.
range([[ConditionIdOne], [ConditionIdTwo, ConditionIdThree]] ) - One of the conditions listed must be satisfied.
beforeBlock(Number, [ConditionId]) - Before an EVM block
afterBlock(Number,[ConditionId]) - After an EVM block
beforeTimestamp(Epoch. [ConditionId]) - Before an epoch timestamp
afterTimestamp(Epoch, [ConditionId]) - After an epoch timestamp
```