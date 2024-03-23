export function getFilenameAndExtension(filepath: string) {
  const parts = filepath.split('/')
  const filename = parts[parts.length - 1]
  const folder = parts.slice(0, parts.length - 1).join('/')
  const lastDotIndex = filename.lastIndexOf('.')
  const filenameWithoutExtensions = filename.slice(0, lastDotIndex)
  const extension = filename.slice(lastDotIndex + 1)
  const filepathWithoutExtension = `${folder}/${filenameWithoutExtensions}`
  return { filename, extension, filenameWithoutExtensions, filepathWithoutExtension }
}

if (import.meta.vitest) {
  describe(getFilenameAndExtension, () => {
    test('should correctly parse a filename and extension from a simple path', () => {
      const result = getFilenameAndExtension('path/to/file.txt')
      expect(result).toEqual({
        filename: 'file.txt',
        extension: 'txt',
        filenameWithoutExtensions: 'file',
        filepathWithoutExtension: 'path/to/file',
      })
    })

    test('should correctly parse a filename and extension from a path with multiple dots', () => {
      const result = getFilenameAndExtension('path/to/file.name.with.dots.txt')
      expect(result).toEqual({
        filename: 'file.name.with.dots.txt',
        filenameWithoutExtensions: 'file.name.with.dots',
        extension: 'txt',
        filepathWithoutExtension: 'path/to/file.name.with.dots',
      })
    })

    // not currently needed, would check if lastDotIndex === -1 to solve
    // test('should correctly parse a filename and extension from a path without an extension', () => {
    //   const result = getFilenameAndExtension('path/to/filename')
    //   expect(result).toEqual({
    //     filename: 'filename',
    //     filenameWithoutExtensions: 'filename',
    //     extension: '',
    //     filepathWithoutExtension: 'path/to/filename',
    //   })
    // })
  })
}
