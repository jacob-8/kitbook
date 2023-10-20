import type { Folder, GroupedPageMap } from '../../kitbook-types'
import { removeInitialDigitAndHyphens } from './utils/removeInitialDigitAndHyphens'

export function putPagesIntoFolders(groupedPages: GroupedPageMap): Folder {
  if (!groupedPages) {
    return {
      name: 'No pages found',
      url: '/',
      depth: 0,
    }
  }
  const pagesToOrganize = Object.values(groupedPages)

  const rootFolder: Folder = {
    name: '.',
    url: '/',
    depth: 0,
    folders: [],
    pages: [],
  }

  if (!pagesToOrganize?.length)
    return rootFolder

  pagesToOrganize.forEach((page) => {
    const pageIsJustAComposition = page.extensions.length === 1 && page.extensions[0] === 'composition'
    if (pageIsJustAComposition)
      return

    let currentFolder = rootFolder

    const path = page.url.split('/')
    path.forEach((folderName, index) => {
      const cleanedFolderName = removeInitialDigitAndHyphens(folderName)

      if (index === path.length - 1) {
        currentFolder.pages.push(page) // is a page
      }
      else if (folderName === '') {
        currentFolder = rootFolder
      }
      else {
        let folder = currentFolder.folders.find(({ name }) => name === cleanedFolderName)
        if (!folder) {
          folder = {
            name: cleanedFolderName,
            url: path
              .slice(0, index + 1)
              .join('/')
              .replace(/^\./, ''),
            depth: index,
            folders: [],
            pages: [],
          }
          currentFolder.folders.push(folder)
        }
        currentFolder = folder
      }
    })
  })
  return rootFolder
}
