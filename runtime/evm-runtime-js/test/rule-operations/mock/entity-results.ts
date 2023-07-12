import { EVMStateArtifacts, EntityResults } from '../../../src/types'
import transactions from './transactions.json'

export const mockEntityResults: EntityResults[] = [
  {
    id: 'entity:pooltogether:v4:prizepool',
    status: true,
    conditions: [
      {
        cid: 'condition:depositTo:gte:100000000',
        status: true,
        operations: [
          {
            status: true,
            artifacts: [
              {
                id: '0xb1aa4eb5937d7599f246cd35998dc22ad0acc8fbf8577a847a29f75f269ac891',
                reference: 'transaction',
              },
              {
                id: '0x14c2bcecbf5c11ef6d3378456aa0c444c2547ac1c76573bbb06de449c9b9e1f9',
                reference: 'transaction',
              },
              {
                id: '0x0f105d3cff0149298490d5a7c19c172ff31fb86df3f022879810ea70c1a9e0d8',
                reference: 'transaction',
              },
            ],
          },
        ],
      },
      {
        cid: 'condition:depositToAndDelegate:gte:100000000',
        status: true,
        operations: [
          {
            status: true,
            artifacts: [
              {
                id: '0x323b2d6865a97f0cd8f76e302f13a7e49e9d32a1efea69cee2f47b81ab0a12b5',
                reference: 'transaction',
              },
              {
                id: '0xbcd0ed368ff29956b8c9aea0c3d0433bfb7ea5ed6eb1ed51779b42a2c73212b8',
                reference: 'transaction',
              },
              {
                id: '0xedc87f18c8f1fdc931647e9429d357f4bf4e8cb096cadcc60f4a7f414829b27f',
                reference: 'transaction',
              },
            ],
          },
        ],
      },
    ],
  },
]

export const mockArtifacts = EVMStateArtifacts.parse({
  transactions,
})
