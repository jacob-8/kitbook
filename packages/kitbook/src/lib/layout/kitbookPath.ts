export function findKitbookPath(path: string): {
  kitbookPath: string;
  activePath: string;
} {
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  const kitbookPath = '/kitbook';
  const activePath = path.slice(kitbookPath.length);
  return {
    kitbookPath,
    activePath,
  };
}

if (import.meta.vitest) {
  describe(findKitbookPath, () => {
    test('root', () => {
      expect(findKitbookPath('/kitbook')).toEqual({
        kitbookPath: '/kitbook',
        activePath: '',
      });
    });

    test('root with trailing slash', () => {
      expect(findKitbookPath('/kitbook/')).toEqual({
        kitbookPath: '/kitbook',
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
      expect(findKitbookPath('/kitbook/docs/')).toEqual({
        kitbookPath: '/kitbook',
        activePath: '/docs',
      });
    });

    test('nested including kitbook in name', () => {
      expect(findKitbookPath('/kitbook/docs/kitbook')).toEqual({
        kitbookPath: '/kitbook',
        activePath: '/docs/kitbook',
      });
    });
  });
}