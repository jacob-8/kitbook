import { modules } from "$lib/pages/testModules";
import { parseModules, putPagesIntoFolders, parsePath, combineModulesIntoPages } from "./pages";

test('parseModules properly returns array of Pages', () => {
  expect(parseModules(modules)).toMatchSnapshot();
});

test('combineModulesIntoPages properly combines Pages', () => {
  const pages = parseModules(modules);
  expect(combineModulesIntoPages(pages)).toMatchSnapshot();
});

test('putPagesIntoFolders organizes Pages into proper folders', () => {
  const pages = parseModules(modules);
  expect(putPagesIntoFolders(combineModulesIntoPages(pages))).toMatchSnapshot();
});


test('parsePath parses path correctly', () => {
  expect(parsePath('/src/docs/0-why-kitbook.md')).toMatchInlineSnapshot(`
    {
      "dir": "docs/",
      "ext": "md",
      "name": "0-why-kitbook",
    }
  `);
  expect(parsePath('/src/docs/index.md')).toMatchInlineSnapshot(`
    {
      "dir": "docs/",
      "ext": "md",
      "name": "index",
    }
  `);
  expect(parsePath('/README.md')).toMatchInlineSnapshot(`
    {
      "dir": "/",
      "ext": "md",
      "name": "README",
    }
  `);
  expect(parsePath('/src/routes/a/+page.svelte')).toMatchInlineSnapshot(`
    {
      "dir": "routes/a/",
      "ext": "svelte",
      "name": "+page",
    }
  `);
  expect(parsePath('/src/routes/a/_page.variants.ts')).toMatchInlineSnapshot(`
    {
      "dir": "routes/a/",
      "ext": "variants.ts",
      "name": "_page",
    }
  `);
});

test.skip('skips and logs warning upon receiving unusable path', () => {
  expect(parsePath('+page.ts')).toThrow();
  // expect(parsePath('+page.ts')).toThrowErrorMatchingInlineSnapshot();
});

