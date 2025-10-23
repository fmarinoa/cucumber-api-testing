import { defineParameterType, When } from '@cucumber/cucumber'
import { executeRequest } from '@/services/client'

defineParameterType({
  name: 'httpMethod',
  regexp: /(GET|POST|PUT|DELETE|PATCH)/,
  transformer: (method: string) => method,
})

When(
  'I send a {httpMethod} request to {string}',
  async function (method: string, url: string) {
    const { request } = this.context

    if (method !== request.method || url !== request.url) {
      throw new Error(
        `Request method or URL does not match context. Expected ${request.method} ${request.url}, got ${method} ${url}`
      )
    }

    this.response = await executeRequest({
      method,
      url,
      headers: request?.headers,
      body: request?.body,
    })
  }
)
