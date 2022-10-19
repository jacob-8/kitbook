const urlRegex = /(((https?:\/\/)|(www\.))[^\s>]+[$\w])/g;

export function prepareDisplay(s: string) {
  if (urlRegex.test(s)) {
    return s.replace(/https?:\/\//, '');
  } else {
    return s;
  }
}

export function prepareHref(s: string) {
  const match = s?.match(urlRegex);
  if (match?.length) {
    return match[0].replace(/^www\./, 'http://');
  } else {
    return null;
  }
}

if (import.meta.vitest) {
  test('prepareHref handles https, http, www', () => {
    expect(prepareHref('https://google.com')).toMatchInlineSnapshot('"https://google.com"');
    expect(prepareHref('http://google.com')).toMatchInlineSnapshot('"http://google.com"');
    expect(prepareHref('www.google.com')).toMatchInlineSnapshot('"http://google.com"');
  });

  test('prepareHref handles urls inside strings, inside brackets, and returns 1st url if 2 found', () => {
    expect(
      prepareHref(
        'Source: <https://creativecommons.org/licenses/by-sa/2.5>, via Wikimedia Commons, http://google.com'
      )
    ).toMatchInlineSnapshot('"https://creativecommons.org/licenses/by-sa/2.5"');
  });

  test('prepareHref avoid non alpahnumeric characters at the end of the url', () => {
    expect(prepareHref('https://example.com,')).toMatchInlineSnapshot('"https://example.com"');
    expect(prepareHref('https://example.com/.')).toMatchInlineSnapshot('"https://example.com"');
    expect(prepareHref('https://example.com.,´')).toMatchInlineSnapshot('"https://example.com"');
  });

  test('prepareHref handles no match and undefined', () => {
    expect(prepareHref('Foo')).toMatchInlineSnapshot('null');
    expect(prepareHref(undefined)).toMatchInlineSnapshot('null');
  });

  test('prepareDisplay handles no match', () => {
    expect(prepareDisplay('Foo')).toMatchInlineSnapshot('"Foo"');
    expect(prepareDisplay(undefined)).toMatchInlineSnapshot('undefined');
  });
}
