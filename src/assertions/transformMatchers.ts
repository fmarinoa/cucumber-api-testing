import { jestExpect } from '@jest/expect'

export function transformMatchers(obj: unknown): any {
  if (isArray(obj)) {
    return obj.map(transformMatchers)
  } else if (isObject(obj)) {
    return Object.keys(obj).reduce(
      (acc, key) => {
        acc[key] = transformMatchers(obj[key])
        return acc
      },
      {} as Record<string, unknown>
    )
  } else if (isString(obj)) {
    return generateMatcher(obj)
  } else {
    return obj
  }
}

const isArray = (obj: unknown): obj is unknown[] =>
  obj !== null && Array.isArray(obj)

const isObject = (obj: unknown): obj is Record<string, unknown> =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj)

const isString = (obj: unknown): obj is string =>
  obj !== null && typeof obj === 'string'

const generateMatcher = (obj: string): unknown => {
  // Parse placeholder in format #{FUNCTION:PARAM1:PARAM2}
  const match = /^#\{(.+?)\}$/.exec(obj)
  if (!match) return obj

  const parts = match[1].split(':')
  const functionName = parts[0]?.toUpperCase()

  switch (functionName) {
    case 'RANDOM':
      return parseRandomPlaceholder(parts)
    default:
      throw new Error(`Unknown matcher function: ${functionName}`)
  }
}

function parseRandomPlaceholder(parts: string[]): unknown {
  const subType = parts[1]?.toUpperCase()
  switch (subType) {
    case 'NUMBER': {
      const len = parts[2] ? Number.parseInt(parts[2], 10) : undefined
      if (!len || !Number.isInteger(len) || len <= 0) jestExpect.any(Number)
      return jestExpect.stringMatching(new RegExp(`^\\d{${len}}$`))
    }
    case 'STRING': {
      const len = parts[2] ? parts[2].toString() : undefined
      if (!len) jestExpect.any(String)
      return jestExpect.stringMatching(new RegExp(`^[A-Za-z0-9]{${len}}$`))
    }
    default:
      throw new Error(`Unknown matcher subtype: ${subType}`)
  }
}
