export function remove_initial_digit_and_hyphens(string: string) {
  return string.replace(/^\d+\w?/, '')
    .replace(/-/g, ' ')
    .trim()
}

if (import.meta.vitest) {
  describe(remove_initial_digit_and_hyphens, () => {
    test('replace hyphens with spaces', () => {
      expect(remove_initial_digit_and_hyphens('0-Amazing-Button')).toEqual('Amazing Button')
    })
    test('removes any letters appended to digit', () => {
      expect(remove_initial_digit_and_hyphens('0a-another-thing')).toEqual('another thing')
    })
  })
}
