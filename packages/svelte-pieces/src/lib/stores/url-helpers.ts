export const encodeParam = (value: any) => {
  if (typeof value === 'undefined' || value === null) return undefined;
  if (typeof value === 'string') return encodeURIComponent(value);
  return encodeURIComponent(JSON.stringify(value));
};

export const decodeParam = (value: string) => {
  if (typeof value === 'undefined') return undefined;
  const decoded = decodeURIComponent(value);
  try {
    return JSON.parse(decoded);
  } catch {
    // if a decoded string that was never JSON stringified (to save URL space) is parsed, it will throw an error and so we don't parse it but just return the string
    return decoded;
  }
};

export const encode = (value: string | string[][] | Record<string, string> | URLSearchParams) => {
  return new URLSearchParams(value).toString();
};

const object = {
  foo: 'hi there',
  bar: {
    blah: 123,
    quux: [1, 2, 3],
  },
};

if (import.meta.vitest) {
  test('encodeParam handles undefined, null, string, number, boolean, object, and array with an object inside', () => {
    expect(encodeParam(undefined)).toMatchInlineSnapshot('undefined');
    expect(encodeParam(null)).toMatchInlineSnapshot('undefined');
    expect(encodeParam('Hello')).toMatchInlineSnapshot('"Hello"');
    expect(encodeParam('Hello world? & some = that')).toMatchInlineSnapshot(
      '"Hello%20world%3F%20%26%20some%20%3D%20that"'
    );
    expect(encodeParam(45)).toMatchInlineSnapshot('"45"');
    expect(encodeParam(true)).toMatchInlineSnapshot('"true"');
    expect(encodeParam(object)).toMatchInlineSnapshot(
      '"%7B%22foo%22%3A%22hi%20there%22%2C%22bar%22%3A%7B%22blah%22%3A123%2C%22quux%22%3A%5B1%2C2%2C3%5D%7D%7D"'
    );

    expect(encodeParam([1, 2, object])).toMatchInlineSnapshot(
      '"%5B1%2C2%2C%7B%22foo%22%3A%22hi%20there%22%2C%22bar%22%3A%7B%22blah%22%3A123%2C%22quux%22%3A%5B1%2C2%2C3%5D%7D%7D%5D"'
    );
  });

  test('decodeParam', () => {
    expect(decodeParam(undefined)).toEqual(undefined);
    expect(decodeParam(null)).toEqual(null);
    expect(decodeParam('Hello')).toMatchInlineSnapshot('"Hello"');
    expect(decodeParam('Hello%20world%3F%20%26%20some%20%3D%20that')).toMatchInlineSnapshot(
      '"Hello world? & some = that"'
    );
    expect(decodeParam('45')).toEqual(45);
    expect(decodeParam('true')).toEqual(true);
    expect(decodeParam('false')).toEqual(false);
    expect(
      decodeParam(
        '%7B%22foo%22%3A%22hi%20there%22%2C%22bar%22%3A%7B%22blah%22%3A123%2C%22quux%22%3A%5B1%2C2%2C3%5D%7D%7D'
      )
    ).toMatchInlineSnapshot(`
      {
        "bar": {
          "blah": 123,
          "quux": [
            1,
            2,
            3,
          ],
        },
        "foo": "hi there",
      }
    `);
    expect(
      decodeParam(
        '%5B1%2C2%2C%7B%22foo%22%3A%22hi%20there%22%2C%22bar%22%3A%7B%22blah%22%3A123%2C%22quux%22%3A%5B1%2C2%2C3%5D%7D%7D%5D'
      )
    ).toMatchInlineSnapshot(`
      [
        1,
        2,
        {
          "bar": {
            "blah": 123,
            "quux": [
              1,
              2,
              3,
            ],
          },
          "foo": "hi there",
        },
      ]
    `);
  });
}
