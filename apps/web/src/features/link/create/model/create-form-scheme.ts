import { z } from 'zod'

const createFormSchema = z.object({
  urls: z
    .array(
      z.object({
        url: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .min(1)
    .max(5),
  path: z
    .string()
    .min(2, { message: 'Path must be at least 2 characters' })
    .max(16, { message: 'Path must be no longer than 16 characters' }),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters' })
    .max(16, { message: 'Password must be no longer than 16 characters' })
    .optional()
    .or(z.literal('')),
  domain: z.string().uuid(),
})

export default createFormSchema
