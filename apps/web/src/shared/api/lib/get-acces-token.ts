'use server'

import { auth } from '@/shared/auth'

export const getAccessToken = async () => (await auth())?.access_token
