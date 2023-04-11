export function writeModuleGlobsIntoVirtualModuleCode(code: string, importModuleGlobs: string[]) {
  const stringified_globs = JSON.stringify(importModuleGlobs); // will be double-quotes
  const remove_brackets_and_outer_quotes = stringified_globs.substring(2, stringified_globs.length - 2);
  const STRING_TO_REPLACE = 'REPLACE_WITH_MODULE_GLOBS';
  return code.replaceAll(STRING_TO_REPLACE, remove_brackets_and_outer_quotes);
}
