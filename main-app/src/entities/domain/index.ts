import createDomainAction from './actions/create-domain-action'
import deleteDomainAction from './actions/delete-domain-action'
import { DomainType } from './domain-type'
import getDomains from './get-domains'
import useGetAllDomains from './use-get-all-domains'

export {
  getDomains,
  useGetAllDomains,
  createDomainAction,
  deleteDomainAction,
  type DomainType,
}
