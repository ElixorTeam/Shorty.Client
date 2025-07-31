const config = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  REDIRECT_DOMAIN: process.env.REDIRECT_DOMAIN as string,
  PORT: process.env.PORT as unknown as number,
  NODE_ENV: process.env.NODE_ENV as string,
}

export { config }
