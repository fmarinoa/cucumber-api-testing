import { jestExpect } from '@jest/expect'
import { AxiosResponse } from 'axios'

export function validateResponseStatus(
  response: AxiosResponse,
  expectedStatusCode: number
) {
  jestExpect(response.status).toBe(expectedStatusCode)
}

export function validateResponseBody(
  response: AxiosResponse,
  expectedBody: any
) {
  jestExpect(response.data).toEqual(expectedBody)
}
