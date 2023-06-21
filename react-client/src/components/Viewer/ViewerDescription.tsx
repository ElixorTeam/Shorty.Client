'use client'

import { convertDateTime } from '@/shared/convertDate'
import GroupInput from '@/components/Common/GroupInput'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import IconButton from '@/components/Common/IconButton'
import toast from 'react-hot-toast'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import Link from 'next-intl/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useAppSelector } from '@/redux/hooks'
import ViewerDescriptionTitle from '@/components/Viewer/ViewerDescriptionTitle'

export default function ViewerDescription({
  translate
}: {
  translate: { [_: string]: string }
}) {
  const selectedLink = useAppSelector(state => state.selectedLink.selected)
  const shortURL = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/${selectedLink?.innerRef}`
  return (
    <div>
      {selectedLink && (
        <div className="h-48">
          <ViewerDescriptionTitle
            selectedLink={selectedLink}
            translate={translate}
          />
          <p className="line-clamp-1">
            {translate.windowDate} {convertDateTime(selectedLink.createDt)}
          </p>
          <div className="mt-4">
            <GroupInput value={selectedLink.externalRef} label="Link" />
          </div>
          <div className="mt-2 flex gap-4">
            <div className="w-full">
              <GroupInput value={shortURL} label="Short link" />
            </div>
            <div className="flex gap-2">
              <CopyToClipboard text={shortURL}>
                <IconButton onClick={() => toast(translate.toastURLCopied)}>
                  <DocumentDuplicateIcon className="h-5 w-5 text-gray-500" />
                </IconButton>
              </CopyToClipboard>
              <Link target="_blank" href={shortURL}>
                <IconButton>
                  <ArrowTopRightOnSquareIcon className="h-5 w-5 text-gray-500" />
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
