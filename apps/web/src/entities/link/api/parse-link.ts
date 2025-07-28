import { type ApiSchemas } from '@/shared/api'

import { LinkType } from './link-type'

const parseLink = (raw: ApiSchemas['Record']) => ({
  ...raw,
  type: raw.urls.length > 1 ? LinkType.GROUP : LinkType.SINGLE,
  urls: raw.urls.map((url: string) => new URL(url)),
  createDt: new Date(raw.createDt),
  updateDt: new Date(raw.updateDt),
})

export type ParsedLink = ReturnType<typeof parseLink>

export { parseLink }
