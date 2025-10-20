import { Given } from '@cucumber/cucumber'
import fs from 'node:fs'

Given(
  'I set the context for the test with the file {string}',
  async function (contextFile: string) {
    this.context = JSON.parse(
      fs.readFileSync(`./data/${contextFile}.json`, 'utf8')
    )
  }
)
