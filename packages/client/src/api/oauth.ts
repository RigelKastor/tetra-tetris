import { yandexApi } from './setupApi'

export const redirectUri = 'http://localhost:3000'
export const getYandexUrl = (clientId: string) => {
  return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURI(
    redirectUri
  )}`
}

export async function getServiceId() {
  const response = await yandexApi.get<{ service_id: string }>(
    'oauth/yandex/service-id',
    { data: { redirectUri: redirectUri } }
  )
  return response.data.service_id
}

export function signInWithYandex(code: string) {
  return yandexApi.post('oauth/yandex', {
    code: code,
    redirectUri: redirectUri,
  })
}
