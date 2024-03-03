import { z } from 'zod'

const createFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(64, { message: 'Title must be no longer than 64 characters' })
    .optional()
    .or(z.literal('')),
  urls: z.array(
    z.object({
      url: z.string().url({ message: 'Please enter a valid URL.' }),
    })
  ),
  prefix: z
    .string()
    .min(2, { message: 'Prefix must be at least 2 characters' })
    .max(6, { message: 'Prefix must be no longer than 6 characters' })
    .optional()
    .or(z.literal('')),
  domain: z.object({
    uid: z.string().uuid(),
    value: z.string(),
  }),
  path: z
    .string()
    .min(2, { message: 'Path must be at least 2 characters' })
    .max(16, { message: 'Path must be no longer than 16 characters' })
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters' })
    .max(16, { message: 'Password must be no longer than 16 characters' })
    .optional()
    .or(z.literal('')),
})

export default createFormSchema
