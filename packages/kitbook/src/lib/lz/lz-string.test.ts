import { compressToEncodedURIComponent as compress, decompressFromEncodedURIComponent as decompress } from './lz-string'

function range(length) {
  return [...Array(length).keys()]
};

function allPrintableCharacters() {
  let testString = ''
  for (let i = 32; i < 127; ++i)
    testString += String.fromCharCode(i)

  for (let i = 128 + 32; i < 55296; ++i)
    testString += String.fromCharCode(i)

  for (let i = 63744; i < 65536; ++i)
    testString += String.fromCharCode(i)

  return testString
};

describe('lz-string', (test) => {
  test('compresses and decompresses: string', () => {
    const value = 'Hello world!'
    const compressed = compress(value)
    expect(compressed).toMatchInlineSnapshot('"BIUwNmD2AEDukCcwBMCEQ"')
    const decompressed = decompress(compressed)
    expect(decompressed).toBe(value)
  })

  test('compresses and decompresses: null', () => {
    const compressed = compress(null)
    expect(compressed).toBe('')
    const decompressed = decompress(compressed)
    expect(decompressed).toBe(null)
  })

  test('compresses and decompresses: undefined', () => {
    const compressed = compress(undefined)
    expect(compressed).toBe('')
    const decompressed = decompress(compressed)
    expect(decompressed).toBe(null)
  })

  test('decompresses: null', () => {
    const decompressed = decompress(null)
    expect(decompressed).toBe('')
  })

  test('compresses and decompresses: empty string', () => {
    const compressed = compress('')
    expect(compressed).not.toBe('')
    const decompressed = decompress(compressed)
    expect(decompressed).toBe('')
  })

  test('all printable characters', () => {
    const testString = allPrintableCharacters()
    const compressed = compress(testString)
    expect(compressed).not.toBe(testString)
    const decompressed = decompress(compressed)
    expect(decompressed).toBe(testString)
  })

  test('compresses and decompresses a string that repeats', () => {
    const testString = 'aaaaabaaaaacaaaaadaaaaaeaaaaa'
    const compressed = compress(testString)
    expect(compressed).not.toBe(testString)
    expect(compressed.length).toBeLessThan(testString.length)
    const decompressed = decompress(compressed)
    expect(decompressed).toBe(testString)
  })

  test('compresses and decompresses a long string', () => {
    const testString = range(1000)
      .map(() => `${Math.random()} `)
      .join('')

    const compressed = compress(testString)
    expect(compressed).not.toBe(testString)
    expect(compressed.length).toBeLessThan(testString.length)
    const decompressed = decompress(compressed)
    expect(decompressed).toBe(testString)
  })
})
