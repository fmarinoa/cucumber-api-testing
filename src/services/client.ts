import pactum from 'pactum'
import Spec from 'pactum/src/models/Spec'

import { BASE_URL } from '..'

export function buildHttpRequest(method: string, url: string): Spec {
  const spec = pactum.spec()
  switch (method.toLowerCase()) {
    case 'get':
      return spec.get(`${BASE_URL}${url}`)
    case 'post':
      return spec.post(`${BASE_URL}${url}`)
    case 'put':
      return spec.put(`${BASE_URL}${url}`)
    case 'delete':
      return spec.delete(`${BASE_URL}${url}`)
    case 'patch':
      return spec.patch(`${BASE_URL}${url}`)
    default:
      throw new Error(`Invalid HTTP method: ${method}`)
  }
}
