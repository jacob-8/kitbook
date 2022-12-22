import { processHere, processToFileBeside } from "./process";

test('processHere', async () => {
  expect(await processHere('./src/personal-unified-learning/example.md')).toMatchInlineSnapshot(`
    "
    <h1 id=\\"hello-world\\">Hello World</h1>
    <h2 id=\\"table-of-content\\">Table of Content</h2>
    <ul>
      <li><a href=\\"#install\\">Install</a></li>
      <li><a href=\\"#use\\">Use</a></li>
      <li><a href=\\"#license\\">License</a></li>
    </ul>
    <h2 id=\\"install\\">Install</h2>
    <p>A <strong>example</strong>.</p>
    <h2 id=\\"use\\">Use</h2>
    <p>More <code>text</code>.</p>
    <h2 id=\\"license\\">License</h2>
    <p>MIT</p>
    "
  `);
});

test('processToFileBeside', async () => {
  expect(await processToFileBeside('./src/personal-unified-learning/example.md')).toMatchInlineSnapshot('undefined');
});

test('processToFileBeside', async () => {
  expect(await processToFileBeside('./src/personal-unified-learning/link.md')).toMatchInlineSnapshot('undefined');
});
