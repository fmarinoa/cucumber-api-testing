import { validateResponseBody, validateResponseHeaders, validateResponseStatus } from '@/assertions'
import { Then } from '@cucumber/cucumber'

Then(
  'the response status code should be {int}',
  function (expectedStatusCode: number) {
    const { response } = this.context

    if (response.status !== expectedStatusCode) {
      throw new Error(
        `Expected status code ${expectedStatusCode}, got ${response.status}`
      )
    }

    validateResponseStatus(this.response, expectedStatusCode)
  }
)

Then('the response body should be the same as expected', function () {
  const { response } = this.context

  validateResponseBody(this.response, response.body)
})

Then('the response headers should be the same as expected', function () {
  const { response } = this.context

  validateResponseHeaders(this.response, response.headers)
})
