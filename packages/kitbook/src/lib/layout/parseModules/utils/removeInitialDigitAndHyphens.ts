export function removeInitialDigitAndHyphens(string: string) {
  return string.replace(/^\d+\w?/, '')
    .replace(/-/g, ' ')
    .trim()
}

if (import.meta.vitest) {
  describe(removeInitialDigitAndHyphens, () => {
    test('replace hyphens with spaces', () => {
      expect(removeInitialDigitAndHyphens('0-Amazing-Button')).toEqual('Amazing Button')
    })
    test('removes any letters appended to digit', () => {
      expect(removeInitialDigitAndHyphens('0a-another-thing')).toEqual('another thing')
    })
  })
}
