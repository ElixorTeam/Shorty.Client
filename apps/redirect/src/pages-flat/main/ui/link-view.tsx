import { redirect } from 'next/navigation'

import { type RedirectType, RedirectTypesEnum } from '../models/redirect-type'
import GroupRecordView from './group-view'

export default function LinkView({
  record,
}: Readonly<{ record: RedirectType }>) {
  if (record.type === RedirectTypesEnum.SINGLE)
    return redirect(record.urls.at(0) as string)
  return <GroupRecordView urls={record.urls} />
}
