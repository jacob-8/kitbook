import { writeModuleGlobsIntoVirtualModuleCode } from "./writeModuleGlobsIntoVirtualModuleCode";

describe('writeModuleGlobsIntoVirtualModuleCode', () => {
  test('', () => {
    const code_string = `const modules = import.meta.glob(["REPLACE_WITH_MODULE_GLOBS"]);
const rawModules = import.meta.glob(["REPLACE_WITH_MODULE_GLOBS"], { as: "raw" });`
    const importModuleGlobs = ["/src/**/*.svelte","/README.md"];
    const expected = `const modules = import.meta.glob(["/src/**/*.svelte","/README.md"]);
const rawModules = import.meta.glob(["/src/**/*.svelte","/README.md"], { as: "raw" });`
    expect(writeModuleGlobsIntoVirtualModuleCode(code_string, importModuleGlobs)).toEqual(expected);
  });
});