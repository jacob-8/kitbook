import { placeContentIntoCodeAttribute } from './code-preview-remark';

test('placeContentIntoCodeAttribute handles', async () => {
  expect(
    placeContentIntoCodeAttribute(
      `<Story>\n  <Story>Hello Worlds from inside a Story</Story>\n</Story>`
    )
  ).toMatchInlineSnapshot(`
    "<Story code={\`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>Story</span><span class=\\"token punctuation\\">></span></span>Hello Worlds from inside a Story<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>Story</span><span class=\\"token punctuation\\">></span></span>\`} >
      <Story code={\`Hello Worlds from inside a Story\`} >Hello Worlds from inside a Story</Story>
    </Story>"
  `);
});

test('placeContentIntoCodeAttribute handles', async () => {
  expect(
    placeContentIntoCodeAttribute(
      `<Story name="With Knobs" knobs={{ value: true }} let:props={{ value }}>{value}</Story>`
    )
  ).toMatchInlineSnapshot(
    '"<Story code={`<span class=\\"token language-javascript\\"><span class=\\"token punctuation\\">{</span>value<span class=\\"token punctuation\\">}</span></span>`}  name=\\"With Knobs\\" knobs={{ value: true }} let:props={{ value }}>{value}</Story>"'
  );
});

test('placeContentIntoCodeAttribute handles', async () => {
  expect(
    placeContentIntoCodeAttribute(
      `<Story name="Adjust height and width" height={200} width={200}>
        <div style="width: 100%; height: 100%; background: red;" />
      </Story>`
    )
  ).toMatchInlineSnapshot(`
    "<Story code={\`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">style</span><span class=\\"token attr-value\\"><span class=\\"token punctuation\\">=</span><span class=\\"token punctuation\\">\\"</span>width: 100%; height: 100%; background: red;<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token punctuation\\">/></span></span>\`}  name=\\"Adjust height and width\\" height={200} width={200}>
            <div style=\\"width: 100%; height: 100%; background: red;\\" />
          </Story>"
  `);
});

test('placeContentIntoCodeAttribute handles', async () => {
  expect(
    placeContentIntoCodeAttribute('<Story\n' +
    '  name="range knob"\n' +
    "  knobs={{ fieldName: 'change_range_name', min: 0, max: 100, defaultValue: 50 }}\n" +
    '  let:props={{ fieldName, min, max, defaultValue }}\n' +
    '>\n' +
    '  <Knobs id="rKnobChild" knobs={parseInput({ [fieldName]: `${min}-${max};${defaultValue}` })} />\n' +
    '</Story>')
  ).toMatchInlineSnapshot(`
    "<Story code={\`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>Knobs</span>
      <span class=\\"token attr-name\\">id</span><span class=\\"token attr-value\\"><span class=\\"token punctuation\\">=</span><span class=\\"token punctuation\\">\\"</span>rKnobChild<span class=\\"token punctuation\\">\\"</span></span>
      <span class=\\"token attr-name\\">knobs=</span><span class=\\"token language-javascript\\"><span class=\\"token punctuation\\">{</span><span class=\\"token function\\">parseInput</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span> <span class=\\"token punctuation\\">[</span>fieldName<span class=\\"token punctuation\\">]</span><span class=\\"token operator\\">:</span> <span class=\\"token template-string\\"><span class=\\"token template-punctuation string\\">\\\\\`</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">\\\\\${</span>min<span class=\\"token interpolation-punctuation punctuation\\">}</span></span><span class=\\"token string\\">-</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">\\\\\${</span>max<span class=\\"token interpolation-punctuation punctuation\\">}</span></span><span class=\\"token string\\">;</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">\\\\\${</span>defaultValue<span class=\\"token interpolation-punctuation punctuation\\">}</span></span><span class=\\"token template-punctuation string\\">\\\\\`</span></span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">}</span></span> <span class=\\"token punctuation\\">/></span></span>\`} 
      name=\\"range knob\\"
      knobs={{ fieldName: 'change_range_name', min: 0, max: 100, defaultValue: 50 }}
      let:props={{ fieldName, min, max, defaultValue }}
    >
      <Knobs id=\\"rKnobChild\\" knobs={parseInput({ [fieldName]: \`\${min}-\${max};\${defaultValue}\` })} />
    </Story>"
  `);
});

import fs from 'fs';
test('placeContentIntoCodeAttribute handles backticks and ${', async () => {
const inputFile = fs.readFileSync('./src/lib/plugins/code-preview-remark/input/Backticks.svelte', 'utf-8');
const result = placeContentIntoCodeAttribute(inputFile);
fs.writeFileSync('./src/lib/plugins/code-preview-remark/output/Backticks.svelte', result, 'utf-8');
});