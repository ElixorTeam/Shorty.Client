import { env } from 'next-runtime-env'

import envServerSchema from '@/shared/lib/env-variables/env-server-scheme'

const envServer = envServerSchema.safeParse({
  KEYCLOAK_BASE_URL: env('KEYCLOAK_BASE_URL'),
  KEYCLOAK_CLIENT_SECRET: env('KEYCLOAK_CLIENT_SECRET'),
  KEYCLOAK_CLIENT_ID: env('KEYCLOAK_CLIENT_ID'),
  KEYCLOAK_REALM: env('KEYCLOAK_REALM'),
  AUTH_SECRET: env('AUTH_SECRET'),
  AUTH_URL: env('AUTH_URL'),

  PORT: env('PORT'),
  NODE_ENV: env('NODE_ENV'),
})

if (!envServer.success)
  throw new Error(
    `There is an error with the server environment variables ${envServer.error}`
  )

export default envServer.data
