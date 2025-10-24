import { findPlaceholders } from '@/utils'
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
  const matchs = findPlaceholders(obj, /#\{([^}]*)\}/g)
  if (!matchs) return obj

  let pattern = '^'
  let lastIndex = 0

  for (const match of matchs) {
    const beforeLiteral = obj
      .slice(lastIndex, match.start)
      .replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\\$&`)
    pattern += beforeLiteral

    const parts = match.content.split(':')
    const fn = parts[0]?.toUpperCase()

    switch (fn) {
      case 'RANDOM':
        pattern += generateRegexFromPlaceholder(parts)
        break
      case 'ASC_TIME':
        pattern += String.raw`(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{1,2} \d{2}:\d{2}:\d{2} UTC \d{4}`
        break
      case 'DESC_TIME':
        pattern += String.raw`\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z`
        break
      default:
        throw new Error(`Unknown matcher function: ${fn}`)
    }

    lastIndex = match.end
  }

  const afterLiteral = obj
    .slice(lastIndex)
    .replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\\$&`)
  pattern += afterLiteral
  pattern += '$'

  return jestExpect.stringMatching(new RegExp(pattern))
}

function generateRegexFromPlaceholder(parts: string[]): unknown {
  const subType = parts[1]?.toUpperCase()
  switch (subType) {
    case 'NUMBER': {
      const len = parts[2] ? Number.parseInt(parts[2], 10) : undefined
      if (!len || !Number.isInteger(len) || len <= 0) jestExpect.any(Number)
      return `\\d{${len}}`
    }
    case 'STRING': {
      const len = parts[2] ? parts[2].toString() : undefined
      if (!len) jestExpect.any(String)
      return `[A-Za-z0-9]{${len}}`
    }
    default:
      throw new Error(`Unknown matcher subtype: ${subType}`)
  }
}
