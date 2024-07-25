import type { GroupedPage, GroupedPageMap } from 'kitbook'

export function filterPages(pageMap: GroupedPageMap, query: string) {
  const pages: GroupedPage[] = []
  if (!pageMap)
    return pages

  const pagesToFilterAndSort = Object.values(pageMap)
  const _query = query?.replace(/ /g, '')

  const startsWithName = pagesToFilterAndSort.filter(({ name }) => startsWithQuery(name, _query))
  const nameIncluded = pagesToFilterAndSort.filter(({ name }) => includesQuery(name, _query))
  const urlIncluded = pagesToFilterAndSort.filter(({ url }) => includesQuery(url, _query))

  return [...new Set([...startsWithName, ...nameIncluded, ...urlIncluded])]
}

function startsWithQuery(text: string, _query: string) {
  return text.replace(/ /g, '').toLowerCase().startsWith(_query.toLowerCase())
}

function includesQuery(text: string, _query: string) {
  return text.replace(/ /g, '').toLowerCase().includes(_query.toLowerCase())
}
