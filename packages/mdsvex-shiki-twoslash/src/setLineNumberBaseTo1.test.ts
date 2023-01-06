import { setLineNumberBaseTo1 } from "./setLineNumberBaseTo1";

test('setLineNumberBaseTo1', () => {
  const meta = {
    title: 'examples/index.ts', highlight: { '1': true, '3': true }
  }
  expect(setLineNumberBaseTo1(meta)).toMatchInlineSnapshot(`
      {
        "highlight": {
          "0": true,
          "2": true,
        },
        "title": "examples/index.ts",
      }
    `);
});

test('setLineNumberBaseTo1 handles ranges', () => {
  const meta = {
    title: 'examples/index.ts', highlight: { '1': true, '3-4': true }
  }
  expect(setLineNumberBaseTo1(meta)).toMatchInlineSnapshot(`
      {
        "highlight": {
          "0": true,
          "2-3": true,
        },
        "title": "examples/index.ts",
      }
    `);
});

test('setLineNumberBaseTo1 handles no highlight', () => {
  const meta = {
    title: 'examples/index.ts'
  }
  expect(setLineNumberBaseTo1(meta)).toMatchInlineSnapshot(`
      {
        "title": "examples/index.ts",
      }
    `);
});

test('setLineNumberBaseTo1 handles undefined meta', () => {
  const meta = {
    title: 'examples/index.ts'
  }
  // @ts-expect-error
  expect(setLineNumberBaseTo1(undefined)).toMatchInlineSnapshot('undefined');
});