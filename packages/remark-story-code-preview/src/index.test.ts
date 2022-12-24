import fs from 'fs';
import { placeContentIntoCodeAttribute } from '.';

describe('placeContentIntoCodeAttribute', () => {
  test('basic', async () => {
    expect(
      placeContentIntoCodeAttribute(
        `<Story name="With Knobs" knobs={{ value: true }} let:props={{ value }}>{value}</Story>`, 'Story'
      )
    ).toMatchInlineSnapshot('"<Story code={`&#123;value&#125;`} name=\\"With Knobs\\" knobs={{ value: true }} let:props={{ value }}>{value}</Story>"');
  });

  test('handles Story inside a Story', async () => {
    expect(
      placeContentIntoCodeAttribute(
        `<Story>\n  <Story>Hello Worlds from inside a Story</Story>\n</Story>`, 'Story'
      )
    ).toMatchInlineSnapshot(`
      "<Story code={\`<Story>Hello Worlds from inside a Story</Story>\`}>
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
      "<Story code={\`<div style=\\"width: 100%; height: 100%; background: red;\\" />\`} name=\\"Adjust height and width\\" height={200} width={200}>
              <div style=\\"width: 100%; height: 100%; background: red;\\" />
            </Story>"
    `);
  });

  test('knobs range', async () => {
    expect(
      placeContentIntoCodeAttribute('<Story\n' +
        '  name="range knob"\n' +
        "  knobs={{ fieldName: 'change_range_name', min: 0, max: 100, defaultValue: 50 }}\n" +
        '  let:props={{ fieldName, min, max, defaultValue }}\n' +
        '>\n' +
        '  <Knobs id="rKnobChild" knobs={parseInput({ [fieldName]: `${min}-${max};${defaultValue}` })} />\n' +
        '</Story>', 'Story')
    ).toMatchInlineSnapshot(`
      "<Story code={\`<Knobs
        id=\\"rKnobChild\\"
        knobs=&#123;parseInput(&#123; [fieldName]: &#96;$&#123;min&#125;-$&#123;max&#125;;$&#123;defaultValue&#125;&#96; &#125;)&#125; />\`}
        name=\\"range knob\\"
        knobs={{ fieldName: 'change_range_name', min: 0, max: 100, defaultValue: 50 }}
        let:props={{ fieldName, min, max, defaultValue }}
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