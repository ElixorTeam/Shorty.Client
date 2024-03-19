import { z } from 'zod'

const envServerSchema = z.object({
  BACKEND_URL: z.string().trim().min(1),

  PORT: z.coerce.number().default(3000),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

export default envServerSchema
