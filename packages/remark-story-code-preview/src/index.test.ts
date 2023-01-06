import fs from 'fs';
import { placeContentIntoCodeAttribute } from '.';

describe('placeContentIntoCodeAttribute', () => {
  test('basic', async () => {
    expect(
      placeContentIntoCodeAttribute(
        `<Story name="With Knobs" knobs={{ value: true }} let:knobs={{ value }}>{value}</Story>`, 'Story'
      )
    ).toMatchInlineSnapshot('"<Story code={`<span class=\\"token language-javascript\\"><span class=\\"token punctuation\\">&#123;</span>value<span class=\\"token punctuation\\">&#125;</span></span>`} name=\\"With Knobs\\" knobs={{ value: true }} let:knobs={{ value }}>{value}</Story>"');
  });

  test('handles Story inside a Story', async () => {
    expect(
      placeContentIntoCodeAttribute(
        `<Story>\n  <Story>Hello Worlds from inside a Story</Story>\n</Story>`, 'Story'
      )
    ).toMatchInlineSnapshot(`
      "<Story code={\`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>Story</span><span class=\\"token punctuation\\">></span></span>Hello Worlds from inside a Story<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;/</span>Story</span><span class=\\"token punctuation\\">></span></span>\`}>
        <Story code={\`Hello Worlds from inside a Story\`}>Hello Worlds from inside a Story</Story>
      </Story>"
    `);
  });

  test('simple', async () => {
    expect(
      placeContentIntoCodeAttribute(
        `<Story name="Adjust height and width" height={200} width={200}>
        <div style="width: 100%; height: 100%; background: red;" />
      </Story>`, 'Story'
      )
    ).toMatchInlineSnapshot(`
      "<Story code={\`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>div</span> <span class=\\"token attr-name\\">style</span><span class=\\"token attr-value\\"><span class=\\"token punctuation\\">=</span><span class=\\"token punctuation\\">\\"</span>width: 100%; height: 100%; background: red;<span class=\\"token punctuation\\">\\"</span></span> <span class=\\"token punctuation\\">/></span></span>\`} name=\\"Adjust height and width\\" height={200} width={200}>
              <div style=\\"width: 100%; height: 100%; background: red;\\" />
            </Story>"
    `);
  });

  test('knobs range', async () => {
    expect(
      placeContentIntoCodeAttribute('<Story\n' +
        '  name="range knob"\n' +
        "  knobs={{ fieldName: 'change_range_name', min: 0, max: 100, defaultValue: 50 }}\n" +
        '  let:knobs={{ fieldName, min, max, defaultValue }}\n' +
        '>\n' +
        '  <Knobs id="rKnobChild" knobs={parseInput({ [fieldName]: `${min}-${max};${defaultValue}` })} />\n' +
        '</Story>', 'Story')
    ).toMatchInlineSnapshot(`
      "<Story code={\`<span class=\\"token tag\\"><span class=\\"token tag\\"><span class=\\"token punctuation\\">&lt;</span>Knobs</span>
        <span class=\\"token attr-name\\">id</span><span class=\\"token attr-value\\"><span class=\\"token punctuation\\">=</span><span class=\\"token punctuation\\">\\"</span>rKnobChild<span class=\\"token punctuation\\">\\"</span></span>
        <span class=\\"token attr-name\\">knobs=</span><span class=\\"token language-javascript\\"><span class=\\"token punctuation\\">&#123;</span><span class=\\"token function\\">parseInput</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">&#123;</span> <span class=\\"token punctuation\\">[</span>fieldName<span class=\\"token punctuation\\">]</span><span class=\\"token operator\\">:</span> <span class=\\"token template-string\\"><span class=\\"token template-punctuation string\\">&#96;</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">$&#123;</span>min<span class=\\"token interpolation-punctuation punctuation\\">&#125;</span></span><span class=\\"token string\\">-</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">$&#123;</span>max<span class=\\"token interpolation-punctuation punctuation\\">&#125;</span></span><span class=\\"token string\\">;</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">$&#123;</span>defaultValue<span class=\\"token interpolation-punctuation punctuation\\">&#125;</span></span><span class=\\"token template-punctuation string\\">&#96;</span></span> <span class=\\"token punctuation\\">&#125;</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">&#125;</span></span> <span class=\\"token punctuation\\">/></span></span>\`}
        name=\\"range knob\\"
        knobs={{ fieldName: 'change_range_name', min: 0, max: 100, defaultValue: 50 }}
        let:knobs={{ fieldName, min, max, defaultValue }}
      >
        <Knobs id=\\"rKnobChild\\" knobs={parseInput({ [fieldName]: \`\${min}-\${max};\${defaultValue}\` })} />
      </Story>"
    `);
  });

  test('backticks and ${', async () => {
    const inputFile = fs.readFileSync('./src/fixtures/input/Backticks.svelte', 'utf-8');
    const result = placeContentIntoCodeAttribute(inputFile, 'Story');
    fs.writeFileSync('./src/fixtures/output/Backticks.svelte', result, 'utf-8');
  });
});