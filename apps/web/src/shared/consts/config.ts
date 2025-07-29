const config = {
  KEYCLOAK_BASE_URL: process.env.KEYCLOAK_BASE_URL as string,
  KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET as string,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID as string,
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM as string,
  AUTH_SECRET: process.env.AUTH_SECRET as string,

  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL as string,

  PORT: process.env.PORT as unknown as number,
  NODE_ENV: process.env.NODE_ENV as string,
}

export { config }
