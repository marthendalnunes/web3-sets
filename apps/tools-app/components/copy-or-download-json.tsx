import * as React from 'react'

import classNames from 'clsx'
import CopyToClipboard from 'react-copy-to-clipboard'

import { downloadFile } from '@/lib/utils/download-file'

import { toObjectWithBigInt } from './to-object-with-bigint'

type Props = React.HTMLAttributes<HTMLElement> & {
  data: any
}

export const CopyOrDownloadJSON = ({ children, className, data }: Props) => {
  const classes = classNames(className, 'CopyOrDownloadJSON')
  return (
    <div className={classes}>
      <div className="flex justify-end gap-x-4">
        {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <span
          className="cursor-pointer opacity-80 hover:opacity-100"
          onClick={() =>
            downloadFile({
              data: JSON.stringify(data),
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
        <CopyToClipboard text={JSON.stringify(toObjectWithBigInt(data))} onCopy={() => console.log('Copied')}>
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
    </div>
  )
}
