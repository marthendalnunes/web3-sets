import { ReactNode } from 'react'

import { NetworkStatus } from '@/components/blockchain/network-status'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { Toaster } from '@/components/ui/toaster'

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex min-h-[100vh] flex-col pb-10 lg:pb-12">
        <Header />
        <main className="my-20 md:px-10 lg:my-32">{children}</main>
        <div className="fixed bottom-6 left-6">
          <NetworkStatus />
        </div>
        <div className="fixed bottom-6 right-6 flex items-center">
          <WalletConnect />
        </div>
        <Footer />
      </div>
      {/* TODO: Add position controls */}
      <Toaster />
    </>
  )
}
