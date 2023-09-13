export function findKitbookPath(path: string): {
  kitbookPath: string;
  activePath: string;
} {
  const kitbookIndex = path.indexOf('/kitbook');

  if (kitbookIndex === -1) {
    return {
      kitbookPath: '',
      activePath: path.replace(/\/$/, ''),
    };
  }

  const kitbookPath = path.slice(0, kitbookIndex + 8);
  const activePath = path.slice(kitbookPath.length).replace(/\/$/, '');
  return {
    kitbookPath,
    activePath,
  };
}

if (import.meta.vitest) {
  describe(findKitbookPath, () => {
    test('root is /', () => {
      expect(findKitbookPath('/')).toEqual({
        kitbookPath: '',
        activePath: '',
      });
    });

    test('root is /kitbook', () => {
      expect(findKitbookPath('/kitbook')).toEqual({
        kitbookPath: '/kitbook',
        activePath: '',
      });
    });

    test('root is /kitbook/', () => {
      expect(findKitbookPath('/kitbook/')).toEqual({
        kitbookPath: '/kitbook',
        activePath: '',
      });
    });

    test('root is /en/kitbook', () => {
      expect(findKitbookPath('/en/kitbook')).toEqual({
        kitbookPath: '/en/kitbook',
        activePath: '',
      });
    });

    test('nested', () => {
      expect(findKitbookPath('/kitbook/docs')).toEqual({
        kitbookPath: '/kitbook',
        activePath: '/docs',
      });
    });

    test('nested with trailing slash', () => {
      expect(findKitbookPath('/de/kitbook/docs/')).toEqual({
        kitbookPath: '/de/kitbook',
        activePath: '/docs',
      });
    });

    test('nested including kitbook in name', () => {
      expect(findKitbookPath('/en/kitbook/docs/kitbook')).toEqual({
        kitbookPath: '/en/kitbook',
        activePath: '/docs/kitbook',
      });
    });
  });
}