import { jestExpect } from '@jest/expect'
import { AxiosResponse } from 'axios'
import { transformMatchers } from './transformMatchers'

export function validateResponseStatus(
  response: AxiosResponse,
  expectedStatusCode: number
) {
  jestExpect(response.status).toBe(expectedStatusCode)
}

export function validateResponseBody(
  response: AxiosResponse,
  expectedBody: unknown
) {
  jestExpect(response.data).toEqual(transformMatchers(expectedBody))
}
