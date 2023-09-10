import { groupColocatedPages } from "./groupColocatedPages";
import { parseModulesIntoUngroupedPages } from "./parseModulesIntoUngroupedPages";
import { putPagesIntoFolders } from "./putPagesIntoFolders";
import { testModules } from "./testModules";

describe(putPagesIntoFolders, () => {
  test('organizes Pages into proper folders', () => {
    const pages = parseModulesIntoUngroupedPages(testModules, testModules);
    expect(putPagesIntoFolders(groupColocatedPages(pages))).toMatchFileSnapshot('./putPagesIntoFolders.snap.json5');
  });

  test('handles no pages found', () => {
    expect(putPagesIntoFolders(null)).toMatchInlineSnapshot(`
      {
        "depth": 0,
        "name": "No pages found",
        "url": "/",
      }
    `);
    ;
  });
});