import { like, regex } from 'pactum-matchers'

export type MatcherType = 'LIKE' | 'REGEX'

export function transformMatchers(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(transformMatchers)
  }
  if (obj !== null && typeof obj === 'object') {
    // Si es un matcher pactum-matchers
    if ('pactum_type' in obj && typeof obj === 'object') {
      const pactumType = (obj as any).pactum_type as MatcherType
      const value = (obj as any).value
      switch (pactumType) {
        case 'LIKE':
          return like(value)
        case 'REGEX':
          return regex(value)
        default:
          return obj
      }
    }
    // Si es un objeto normal, recursivo
    const result: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      result[key] = transformMatchers(value)
    }
    return result
  }
  return obj
}
