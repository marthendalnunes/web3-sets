'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserTransactionHistory } from '@/components/user-transaction-history'

export default function Home() {
  return (
    <>
      <section className="w-full">
        <div className="container mt-10 w-full max-w-screen-lg">
          <Tabs className="w-full" defaultValue="transactionHistory">
            <TabsList className="w-full justify-start p-4">
              <TabsTrigger value="transactionHistory">Transactions</TabsTrigger>
              <TabsTrigger value="password">Receipts</TabsTrigger>
            </TabsList>
            <TabsContent value="transactionHistory">
              <UserTransactionHistory />
            </TabsContent>
            <TabsContent value="password">Coming soon</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
