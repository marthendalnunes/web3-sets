import { useState } from 'react'

import { FieldValues, useForm } from 'react-hook-form'
import { decodeFunctionData } from 'viem'

import { CopyOrDownloadJSON } from './copy-or-download-json'
import { toObjectWithBigInt } from './to-object-with-bigint'
import { ScrollArea } from './ui/scroll-area'

export function FormDecodeTransactionData() {
  const { register, handleSubmit } = useForm()
  const [decodedLog, setDecodedLog] = useState<any | undefined>(undefined)
  const onSubmit = async (data: FieldValues) => {
    const decoded = decodeFunctionData({
      abi: JSON.parse(data.abi),
      // `data` should be 64 bytes, but is only 32 bytes.
      data: data.input,
    })
    setDecodedLog(decoded)
  }

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <label className="font-bold">ABI</label>
      <input {...register('abi')} className="input" />
      <label className="font-bold">Input</label>
      <textarea {...register('input')} className="textarea min-h-[260px]" />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
      {decodedLog && (
        <>
          <CopyOrDownloadJSON data={decodedLog} />
          <ScrollArea className="max-h-[580px] overflow-y-auto">
            {
              <div className="">
                <hr className="my-4" />
                <code className="text-xs">
                  <pre>{`${JSON.stringify(toObjectWithBigInt(decodedLog), null, 2)}`}</pre>
                </code>
              </div>
            }
          </ScrollArea>
        </>
      )}
    </form>
  )
}
