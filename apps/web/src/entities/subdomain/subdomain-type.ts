export type SubdomainType = {
  uid: string
  value: string
  domainUid: string
}

export type SubdomainResponseObjectType = {
  domainUid: string
  domainValue: string
  subdomains: SubdomainResponseType[]
}

export type SubdomainResponseType = {
  uid: string
  value: string
}
