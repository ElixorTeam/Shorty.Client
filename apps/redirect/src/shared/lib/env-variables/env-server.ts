import { env } from 'next-runtime-env'

const envServer = {
  BACKEND_URL: env('BACKEND_URL') as string,

  PORT: env('PORT') as unknown as number,
  NODE_ENV: env('NODE_ENV') as string,
}

export default envServer
