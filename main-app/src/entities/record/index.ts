import useGetDomains from '@/entities/domain/use-get-domains'
import createLinkAction from '@/entities/record/actions/create-link-action'
import deleteLinkAction from '@/entities/record/actions/delete-link-action'
import updateLinkAction from '@/entities/record/actions/update-link-action'
import getAllRecords from '@/entities/record/get-all-records'
import getCurrentRecord from '@/entities/record/get-current-record'
import getFormattedDate from '@/entities/record/get-formatted-date'
import { type RecordType } from '@/entities/record/record-type'
import useGetAllRecords from '@/entities/record/use-get-all-records'
import useGetCurrentRecord from '@/entities/record/use-get-current-record'
import useGetShortLink from '@/entities/record/use-get-short-link'
import useGroupedRecords from '@/entities/record/use-grouped-records'

export {
  getAllRecords,
  getCurrentRecord,
  getFormattedDate,
  useGetDomains,
  useGetCurrentRecord,
  useGetShortLink,
  useGetAllRecords,
  useGroupedRecords,
  createLinkAction,
  deleteLinkAction,
  updateLinkAction,
  type RecordType,
}
