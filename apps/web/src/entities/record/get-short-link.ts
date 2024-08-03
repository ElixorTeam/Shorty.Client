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
  return `https://${subdomainStr}${domain}${pathStr}`
}
export default getShortLink
