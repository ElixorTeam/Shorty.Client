import { z } from 'zod'

const envSchema = z.object({
  KEYCLOAK_BASE_URL: z.string().url(),
  KEYCLOAK_CLIENT_SECRET: z.string().trim().min(1),
  KEYCLOAK_CLIENT_ID: z.string().trim().min(1),
  KEYCLOAK_REALM: z.string().trim().min(1),

  AUTH_SECRET: z.string().trim().min(1),

  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

const envServer = envSchema.safeParse({
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
