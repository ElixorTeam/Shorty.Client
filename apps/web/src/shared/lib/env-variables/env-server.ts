import { env } from 'next-runtime-env'

const envServer = {
  KEYCLOAK_BASE_URL: env('KEYCLOAK_BASE_URL') as string,
  KEYCLOAK_CLIENT_SECRET: env('KEYCLOAK_CLIENT_SECRET') as string,
  KEYCLOAK_CLIENT_ID: env('KEYCLOAK_CLIENT_ID') as string,
  KEYCLOAK_REALM: env('KEYCLOAK_REALM') as string,
  AUTH_SECRET: env('AUTH_SECRET') as string,

  BACKEND_URL: env('BACKEND_URL') as string,

  PORT: env('PORT') as unknown as number,
  NODE_ENV: env('NODE_ENV') as string,
}

export default envServer
