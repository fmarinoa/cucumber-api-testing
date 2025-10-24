type Placeholder = {
  raw: string // "#{RANDOM:NUMBER:13}"
  content: string // "RANDOM:NUMBER:13"
  start: number // Index where starts the placeholder
  end: number // Index (exclusive) where ends the placeholder
}

/**
 * Searches for placeholders  in a string.
 *
 * @param input - the string to scan
 * @param opts.ignoreEscaped - if true (default) ignores occurrences escaped with '\' (e.g., \#{no-match})
 * @returns array of found placeholders (empty if none)
 */
export function findPlaceholders(
  input: string,
  regex: RegExp,
  opts: { ignoreEscaped?: boolean } = {}
): Placeholder[] {
  const ignoreEscaped = opts.ignoreEscaped ?? true
  const results: Placeholder[] = []
  let m: RegExpExecArray | null

  while ((m = regex.exec(input)) !== null) {
    const raw = m[0]
    const content = m[1]
    const start = m.index
    const end = start + raw.length

    if (ignoreEscaped) {
      // if the match is "\" escaped, skip it
      const beforeCharIndex = start - 1
      if (beforeCharIndex >= 0 && input[beforeCharIndex] === '\\') {
        continue
      }
    }

    results.push({ raw, content, start, end })
  }

  return results
}
