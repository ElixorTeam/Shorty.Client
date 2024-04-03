import { z } from 'zod'

const updateFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(64, { message: 'Title must be no longer than 64 characters' }),
  avatar: z.any().optional(),
  tag: z.string(),
  link: z.string().url(),
  prefix: z
    .string()
    .min(2, { message: 'Prefix must be at least 2 characters' })
    .max(6, { message: 'Prefix must be no longer than 6 characters' })
    .regex(/^[\da-z]+$/, {
      message: 'Only small Latin letters and numbers are allowed',
    })
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

export default updateFormSchema
