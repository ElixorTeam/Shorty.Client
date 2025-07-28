import { config } from '@/shared/consts/config'

export const KEYCLOAK_PROTOCOL_URL = `${config.KEYCLOAK_BASE_URL}/realms/${config.KEYCLOAK_REALM}/protocol/openid-connect`
