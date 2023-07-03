'use client'

import { FormDecodeEventLog } from '@/components/form-decode-event-log'
import { FormDecodeTransactionData } from '@/components/form-decode-function-data'
import { FormTransactionReceipt } from '@/components/form-transaction-receipt'
import { FormUserTransactionHistory } from '@/components/form-user-transaction-history'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  return (
    <>
      <section className="w-full">
        <div className="container mt-10 w-full max-w-screen-lg">
          <Tabs className="w-full" defaultValue="transactionHistory">
            <TabsList className="w-full justify-start p-4">
              <TabsTrigger value="transactionHistory">Transaction History</TabsTrigger>
              <TabsTrigger value="transaction-receipt">Transaction Receipt</TabsTrigger>
              <TabsTrigger value="decode-transaction-data">Decode Function Data</TabsTrigger>
              <TabsTrigger value="decode-event-log">Decode Event Log</TabsTrigger>
            </TabsList>
            <TabsContent value="transactionHistory">
              <FormUserTransactionHistory />
            </TabsContent>
            <TabsContent value="transaction-receipt">
              <FormTransactionReceipt />
            </TabsContent>
            <TabsContent value="decode-transaction-data">
              <FormDecodeTransactionData />
            </TabsContent>
            <TabsContent value="decode-event-log">
              <FormDecodeEventLog />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
