const getShortLink = ({
  subdomain,
  domain,
  path,
}: {
  subdomain?: string
  domain?: string
  path?: string
}) => {
  const subdomainStr = subdomain ? `${subdomain}.` : ''
  const pathStr = path ? `/${path}` : ''
  const protocol = domain?.includes('localhost') ? 'http://' : 'https://'
  return protocol + subdomainStr + domain + pathStr
}

export default getShortLink
