# EVM Runtime Output

The EVM runtime outputs a `SetAnalysis` which includes metadata like if the runtime conditions and rules have been met, and which state artifacts 

### Set Analysis
```json
    {
      "passing": true,
      "analysis": [
        {
          "id": "rid",
          "passing": true,
          "operations": [
            [true, [true], [{
                "id": "artifact_id",
                "type": "transaction | log | proof | read | archive_read",
            }]]
          ]
        }
      ]
    }
```