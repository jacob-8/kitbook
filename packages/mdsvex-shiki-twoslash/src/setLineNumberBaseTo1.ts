export function setLineNumberBaseTo1(meta: Record<string, any>): Record<string, any> {
  if (!meta?.highlight)
    return meta

  const newHighlight: Record<string, any> = {}
  Object.keys(meta.highlight).forEach((key: string) => {
    if (key.includes('-')) {
      const [start, end] = key.split('-')
      newHighlight[`${+start - 1}-${+end - 1}`] = true
    }
    else {
      newHighlight[+key - 1] = true
    }
  })
  return { ...meta, highlight: newHighlight }
}
