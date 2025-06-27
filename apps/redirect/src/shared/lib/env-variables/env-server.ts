const envServer = {
  BACKEND_URL: process.env.BACKEND_URL as string,

  PORT: process.env.PORT as unknown as number,
  NODE_ENV: process.env.NODE_ENV as string,
}

export default envServer
