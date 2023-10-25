import type { KitbookSettings } from '$lib/kitbook-types'

export function serializeIntersection(props: Record<string, any>, state: Record<string, any>): Record<string, any> {
  if (!props || !state)
    return {}
  const cleanedState = deepCloneSerializingFunctionsSymbols(state)

  const keyIntersection = Object.keys(props).filter(key => key in state)
  return keyIntersection.reduce((acc, key) => {
    acc[key] = cleanedState[key] ?? undefined // use ?? to keep from converting empty strings or 0 to null
    return acc
  }, {} as Record<string, any>)
}

function deepCloneSerializingFunctionsSymbols(value: any, seen = new Map()) {
  switch (typeof value) {
    case 'symbol':
    case 'function':
      return `REMOVEQUOTE_${value.toString()}_REMOVEQUOTE`
    case 'object': {
      if (value === null)
        return null
      if (Array.isArray(value))
        return value.map(o => deepCloneSerializingFunctionsSymbols(o, seen))
      if (seen.has(value))
        return {}

      const o: Record<string, any> = {}
      seen.set(value, o)
      for (const [key, v] of Object.entries(value))
        o[key] = deepCloneSerializingFunctionsSymbols(v, seen)

      return o
    }
    default:
      return value
  }
}

if (import.meta.vitest) {
  describe(serializeIntersection, () => {
    test('use keys from intersection and values from state with functions and symbols being written into strings ', () => {
      const props = {
        name: 'Jim',
        emptyString: '',
        array: ['a', 'b', 'c'],
        page: {
          bee: 2,
          foo: (a, b) => { return a + b },
          symbol: Symbol('description'),
        },
        $$scope: null, // not in state
      }
      const state = {
        name: 'Bob', // changed
        emptyString: '',
        array: ['a', 'b', ''], // changed
        page: {
          bee: 0, // changed
          foo: (a, b) => { return a + b },
          symbol: Symbol('description'),
        },
        computedVariable: 1, // not in props
      }

      expect(serializeIntersection(props, state)).toMatchInlineSnapshot(`
        {
          "array": [
            "a",
            "b",
            "",
          ],
          "emptyString": "",
          "name": "Bob",
          "page": {
            "bee": 0,
            "foo": "REMOVEQUOTE_(a, b) => {
                    return a + b;
                  }_REMOVEQUOTE",
            "symbol": "REMOVEQUOTE_Symbol(description)_REMOVEQUOTE",
          },
        }
      `)
    })

    test('handles undefined', () => {
      const props = undefined
      const state = undefined
      expect(serializeIntersection(props, state)).toMatchInlineSnapshot('{}')
    })
  })
}

export function removeQuotesFromSerializedFunctions(code: string): string {
  return code.replace(/["']REMOVEQUOTE_/g, '').replace(/_REMOVEQUOTE["']/g, '')
}

if (import.meta.vitest) {
  test(removeQuotesFromSerializedFunctions, () => {
    const add = (a, b) => a + b
    const obj = { add }
    const serialized = serializeIntersection(obj, obj)
    const stringified = removeQuotesFromSerializedFunctions(JSON.stringify(serialized))
    expect(stringified).toEqual('{"add":(a, b) => a + b}')
  })
}

export function serializeSettings(settings: KitbookSettings): string {
  if (!settings.addLanguageToUrl)
    return JSON.stringify(settings)

  const serializedSettings = {
    ...settings,
    addLanguageToUrl: `REMOVEQUOTE_${settings.addLanguageToUrl.toString().replace(/\n/g, '').replace(/["']/g, '`')}_REMOVEQUOTE`,
  }
  return removeQuotesFromSerializedFunctions(JSON.stringify(serializedSettings))
}

if (import.meta.vitest) {
  test(serializeSettings, () => {
    expect(serializeSettings({
      title: 'Kitbook',
      description: 'foo',
      languages: [],
      viewports: [],
      addLanguageToUrl: ({ code, url }) => {
        const [path, search] = url.split('?')
        const params = new URLSearchParams(search)
        params.set('lang', code)
        return `${path}?${params.toString()}`
      },
    // eslint-disable-next-line no-template-curly-in-string
    })).toEqual('{"title":"Kitbook","description":"foo","languages":[],"viewports":[],"addLanguageToUrl":({ code, url }) => {        const [path, search] = url.split(`?`);        const params = new URLSearchParams(search);        params.set(`lang`, code);        return `${path}?${params.toString()}`;      }}')
  })
}
