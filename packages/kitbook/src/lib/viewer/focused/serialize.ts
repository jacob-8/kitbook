export function serialize(props: Record<string, any>, state: Record<string, any>): Record<string, any> {
  if (!props || !state)
    return {}
  const cleanedState = clone(state)

  const keyIntersection = Object.keys(props).filter(key => key in state)
  return keyIntersection.reduce((acc, key) => {
    acc[key] = cleanedState[key] ?? undefined // use ?? to keep from converting empty strings or 0 to null
    return acc
  }, {} as Record<string, any>)
}

function clone(value: any, seen = new Map()) {
  switch (typeof value) {
    case 'symbol':
    case 'function':
      return `REMOVEQUOTE_${value.toString()}_REMOVEQUOTE`
    case 'object': {
      if (value === null)
        return null
      if (Array.isArray(value))
        return value.map(o => clone(o, seen))
      if (seen.has(value))
        return {}

      const o: Record<string, any> = {}
      seen.set(value, o)
      for (const [key, v] of Object.entries(value))
        o[key] = clone(v, seen)

      return o
    }
    default:
      return value
  }
}

if (import.meta.vitest) {
  describe(serialize, () => {
    test('simplifies functions', () => {
      const props = {
        name: 'Jim',
        emptyString: '',
        array: ['a', 'b', 'c'],
        page: {
          bee: 2,
          foo: (a, b) => { return a + b },
          symbol: Symbol('description'),
        },
        $$scope: null,
      }
      const state = {
        name: 'Bob',
        emptyString: '',
        array: ['a', 'b', ''],
        page: {
          bee: 0,
          foo: (a, b) => { return a + b },
          symbol: Symbol('description'),
        },
        computedVariable: 1,
      }

      expect(serialize(props, state)).toMatchInlineSnapshot(`
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
  })

  test('handles undefined', () => {
    const props = undefined
    const state = undefined
    expect(serialize(props, state)).toMatchInlineSnapshot('{}')
  })
}
