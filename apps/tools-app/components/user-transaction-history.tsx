import { useState } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FieldValues, useForm } from 'react-hook-form'

import { WalletConnect } from '@/components/blockchain/wallet-connect'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { appEtherscanAccountTransactions } from '@/integrations/etherscan/actions/etherscan-account-transactions/client'

import { ScrollArea } from './ui/scroll-area'

const downloadFile = ({ data, fileName, fileType }: any) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType })
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

export function FormUserTransactionHistory() {
  const { register, handleSubmit } = useForm()
  const [transactions, setTransactions] = useState<any | undefined>(undefined)
  const onSubmit = async (data: FieldValues) => {
    console.log(data)
    const transaction_history = await appEtherscanAccountTransactions({
      address: data.address,
      chainId: data.chainId || 1,
    })

    setTransactions(transaction_history?.transactions)
  }

  const onDownload = () => {
    downloadFile({
      data: JSON.stringify(transactions),
      fileName: 'transactions.json',
      fileType: 'application/json',
    })
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="font-bold">Address</label>
      <input {...register('address')} className="input" />
      <label className="font-bold">Network</label>
      <select {...register('chainId')}>
        <option value="1">Ethereum</option>
        <option value="10">Optimism</option>
        <option value="42161">Arbitrum</option>
        <option value="137">Polygon</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Fetch User Transaction History
      </button>
      {transactions && (
        <>
          <div className="flex justify-end gap-x-4">
            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <span className="cursor-pointer opacity-80 hover:opacity-100" onClick={onDownload}>
              {/* rome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                fill="none"
                height="24"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </span>
            <CopyToClipboard text={JSON.stringify(transactions)} onCopy={() => console.log('Copied')}>
              <span className="cursor-pointer opacity-80 hover:opacity-100">
                {/* rome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect height="14" rx="2" ry="2" width="14" x="8" y="8" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </span>
            </CopyToClipboard>
          </div>
          <ScrollArea className="max-h-[580px] overflow-y-auto">
            {
              <div className="">
                <hr className="my-4" />
                <code className="text-xs">
                  <pre>{`${JSON.stringify(transactions, null, 2)}`}</pre>
                </code>
              </div>
            }
          </ScrollArea>
        </>
      )}
    </form>
  )
}

export function UserTransactionHistory() {
  return (
    <div className="card w-full">
      <IsWalletConnected>
        <div className="w-full">
          <FormUserTransactionHistory />
          <hr className="my-4" />
        </div>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className="flex items-center justify-center gap-10">
          <WalletConnect />
        </div>
      </IsWalletDisconnected>
    </div>
  )
}
