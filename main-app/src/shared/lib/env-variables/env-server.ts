import envServerSchema from '@/shared/lib/env-variables/env-server-scheme'

const envServer = envServerSchema.safeParse({
  KEYCLOAK_BASE_URL: process.env.KEYCLOAK_BASE_URL,
  KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
  AUTH_SECRET: process.env.AUTH_SECRET,

  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
})

if (!envServer.success)
  throw new Error(
    `There is an error with the server environment variables ${envServer.error}`
  )

export default envServer.data
