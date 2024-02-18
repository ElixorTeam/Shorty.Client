import { z } from 'zod'

const envServerSchema = z.object({
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

export default envServerSchema
