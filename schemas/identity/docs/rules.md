## Rules

The Web3Set::Identity schema `Rules` define how `Conditions` can be applied for determining a valid set.

For example the `oneOf` operation can be used to declare the set is valid whether a "Credential A" or "Credential B" condition has been met.

### Operations & Arguments

```
all([ConditionId]) - All conditions listed must be satisfied.
oneOf([ConditionId]) - One of the conditions listed must be satisfied.
range([[ConditionIdOne], [ConditionIdTwo, ConditionIdThree]] ) - One of the conditions listed must be satisfied.
count([ConditionId], [Number]) - Number of credentials that must be presented i.e. 50 GMs
```