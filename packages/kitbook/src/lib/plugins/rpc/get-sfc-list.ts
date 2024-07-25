import fg from 'fast-glob'

export async function get_sfc_list(
  root: string,
  target: string[] = ['**/*.svelte'],
  ignore: string[] = ['**/node_modules/**', '**/kitbook/**'],
) {
  const files = await fg(target, {
    cwd: root,
    onlyFiles: true,
    ignore,
  })

  return files
}
