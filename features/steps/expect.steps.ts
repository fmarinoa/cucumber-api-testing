import { Then } from '@cucumber/cucumber'
import pactum from 'pactum'

Then(
  'the response status code should be {int}',
  function (expectedStatusCode: number) {
    const { response } = this.context

    if (response.status !== expectedStatusCode) {
      throw new Error(
        `Expected status code ${expectedStatusCode}, got ${response.status}`
      )
    }

    pactum.expect(this.response).to.have.status(expectedStatusCode)
  }
)

Then('the response body should be the same as expected', function () {
  const { response } = this.context

  pactum.expect(this.response).to.have.body(response.body)
})
