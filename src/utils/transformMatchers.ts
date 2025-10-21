/**
 * Recursively transforms string values in an object or array that match specific matcher patterns
 * into their corresponding JavaScript representations (e.g., RegExp).
 *
 * For objects and arrays, the function traverses all nested properties and elements.
 * Non-matching strings and other types are returned unchanged.
 *
 * @param obj - The input object, array, or value to transform.
 * @returns The transformed object, array, or value with matcher strings replaced.
 */
export function transformMatchers(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(transformMatchers)
  }
  if (obj !== null && typeof obj === 'object') {
    const result: any = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = transformMatchers(value)
    }
    return result
  }
  if (typeof obj === 'string') {
    const matcherRegex = /^#\{(.+?)\}$/
    const match = matcherRegex.exec(obj)
    if (match) {
      const matcherType = match[1]
      switch (matcherType) {
        case 'RANDOM:NUMBER':
          return /^\d+$/
        // add more matcher types here as needed
        default:
          return obj
      }
    }
  }
  return obj
}
