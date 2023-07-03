import { useState } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FieldValues, useForm } from 'react-hook-form'

import { chainClients } from '@/config/clients'
import { useToast } from '@/lib/hooks/use-toast'
import { downloadFile } from '@/lib/utils/download-file'

import { toObjectWithBigInt } from './to-object-with-bigint'
import { ScrollArea } from './ui/scroll-area'

export function FormTransactionReceipt() {
  const { register, handleSubmit } = useForm({})
  const [transactionAndReceipt, setTransactionReceipt] = useState<any | undefined>(undefined)
  const onSubmit = async (data: FieldValues) => {
    const {
      hash,
      chainId,
    }: {
      hash: string
      chainId: number
    } = data

    const client = chainClients[chainId]

    if (!client) {
      throw new Error(`No client for chainId ${chainId}`)
    }
    if (!hash) {
      throw new Error(`No hash`)
    }
    const [transaction, transactionReceipt] = await Promise.all([client.getTransaction({ hash }), client.getTransactionReceipt({ hash })])
    setTransactionReceipt({ transaction, transactionReceipt })
  }

  const { toast } = useToast()
  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="font-bold">Transaction Hash</label>
      <input {...register('hash')} className="input" />
      <select {...register('chainId')}>
        <option value="1">Ethereum</option>
        <option value="10">Optimism</option>
        <option value="42161">Arbitrum</option>
        <option value="137">Polygon</option>
      </select>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
      {transactionAndReceipt && (
        <>
          <div className="flex justify-end gap-x-4">
            {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <span
              className="cursor-pointer opacity-80 hover:opacity-100"
              onClick={() =>
                downloadFile({
                  data: JSON.stringify(toObjectWithBigInt(transactionAndReceipt)),
                  fileName: 'transactions.json',
                  fileType: 'application/json',
                })
              }>
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
            <CopyToClipboard text={JSON.stringify(toObjectWithBigInt(transactionAndReceipt))}>
              {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <span
                className="cursor-pointer opacity-80 hover:opacity-100"
                onClick={() =>
                  toast({
                    title: 'Scheduled: Catch up',
                    description: 'Friday, February 10, 2023 at 5:57 PM',
                  })
                }>
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
                  <pre>{`${JSON.stringify(toObjectWithBigInt(transactionAndReceipt), null, 2)}`}</pre>
                </code>
              </div>
            }
          </ScrollArea>
        </>
      )}
    </form>
  )
}
