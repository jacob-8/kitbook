import { groupColocatedPages } from "$lib/layout/parseModules/groupColocatedPages";
import { parseModulesIntoUngroupedPages } from "$lib/layout/parseModules/parseModulesIntoUngroupedPages";
import { testModules } from "../../parseModules/testModules";
import { filterPages } from "./filterPages";

describe('filterPages from testModules', () => {
  const ungroupedPages = parseModulesIntoUngroupedPages(testModules, testModules);
  const pages = groupColocatedPages(ungroupedPages)

  test('readme', () => {
    const result = filterPages(pages, 'readme');
    expect(result.length).toBe(1);
    expect(result[0].name).toMatchInlineSnapshot('"README"');
  });

  test('does not regard spaces', () => {
    const result = filterPages(pages, 'readme');
    const resultWithSpace = filterPages(pages, ' read me');
    expect(result).toEqual(resultWithSpace);

    const result2 = filterPages(pages, 'deploytovercel');
    const result2WithSpace = filterPages(pages, 'deploy to vercel');
    expect(result2.length).toBe(1);
    expect(result2[0].name).toMatchInlineSnapshot('"deploy to vercel"');
    expect(result2).toEqual(result2WithSpace);
  });

  test('ranks name matches higher than url', () => {
    expect(filterPages(pages, 'D').map(({ name, url }) => ({ name, url }))).toMatchInlineSnapshot(`
        [
          {
            "name": "deploy to vercel",
            "url": "/docs/my-notes/1-deploy-to-vercel",
          },
          {
            "name": "D",
            "url": "/lib/a/D",
          },
          {
            "name": "README",
            "url": "/README",
          },
          {
            "name": "index",
            "url": "/index",
          },
          {
            "name": "get started",
            "url": "/docs/1-get-started",
          },
          {
            "name": "why kitbook",
            "url": "/docs/0-why-kitbook",
          },
          {
            "name": "unocss",
            "url": "/docs/my-notes/0-unocss",
          },
          {
            "name": "+page",
            "url": "/kitbook/sandbox/[...file]/+page",
          },
        ]
      `);
  });

  test('handles undefined pages or query', () => {
    const result = filterPages(undefined, undefined);
    expect(result).toStrictEqual([]);
  });
})