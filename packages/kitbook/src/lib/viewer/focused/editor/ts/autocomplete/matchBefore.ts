import { ensureAnchor } from './ensureAnchor.js'

// From: https://github.com/codemirror/autocomplete/blob/53cc58393252659ac4a86162b40afef13eeb2241/src/completion.ts#L111
export function matchBefore(code: string, pos: number, expr: RegExp) {
  const line = getLineAtPosition(code, pos)
  const start = Math.max(line.from, pos - 250)
  const str = line.text.slice(start - line.from, pos - line.from)
  const found = str.search(ensureAnchor(expr, false))
  return found < 0
    ? null
    : { from: start + found, to: pos, text: str.slice(found) }
}

if (import.meta.vitest) {
  test(matchBefore, () => {
    expect(matchBefore('hi.', 0, /\./)).toEqual(null)
    expect(matchBefore('hi.', 3, /\./)).toEqual({
      from: 2,
      text: '.',
      to: 3,
    })
  })
}

/**
 * TODO: confirm that this is necessary; it may be possible
 * and more efficient to get the line from CodeMirror, though
 * that would mean it probably doesn't mix well with the approach
 * of persisting code in the TS enviroment.
 */
function getLineAtPosition(code: string, position: number) {
  // lineStart is the index of line break or zero
  const from = code.lastIndexOf('\n', position - 1) + 1
  let to = code.indexOf('\n', position)
  if (to === -1)
    to = code.length

  const text = code.slice(from, to)
  return {
    from,
    to,
    text,
  }
}

if (import.meta.vitest) {
  test(getLineAtPosition, () => {
    expect(getLineAtPosition('x', 0)).toEqual({
      from: 0,
      text: 'x',
      to: 1,
    })

    expect(getLineAtPosition('x', 10)).toEqual({
      from: 0,
      text: 'x',
      to: 1,
    })

    expect(getLineAtPosition('x', -10)).toEqual({
      from: 0,
      text: 'x',
      to: 1,
    })

    expect(getLineAtPosition('first line\nsecond line', 12)).toEqual({
      from: 11,
      text: 'second line',
      to: 22,
    })
  })
}
