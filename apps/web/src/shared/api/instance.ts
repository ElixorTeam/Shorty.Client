import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'

import { config } from '@/shared/consts/config'

import { getAccessToken } from './lib/get-acces-token'
import { ApiPaths, ApiSchemas } from './schema'

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: config.API_BASE_URL,
})

fetchClient.use({
  async onRequest({ request }) {
    const token = await getAccessToken()
    if (token) request.headers.set('Authorization', `Bearer ${token}`)
    else
      return new Response(
        JSON.stringify({
          code: 'NOT_AUTHORIZED',
          message: 'You are not authorized',
        } as ApiSchemas['Error']),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
  },
})

export const rqClient = createClient(fetchClient)
