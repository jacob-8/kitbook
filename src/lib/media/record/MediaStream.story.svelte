<script lang="ts" context="module">
  import type { PageMeta } from '@vitebook/client';

  export const __pageMeta: PageMeta = {
    title: 'Button',
    description: 'My awesome button.',
  };
</script>

<script>
  import { Variant } from '@vitebook/client';
  import { EventsAddon, eventCallback } from '@vitebook/client/addons';
  import { Knobs } from 'vitebook-addons';

  let title = 'Click Me';
</script>

<Variant name="Default" description="The default button.">
  <!-- <Button on:click={eventCallback}>{title}</Button> -->
</Variant>

<Variant name="Knobbed" description="Trying knobs">
  <Knobs
    input={{ myBool: false, myNum: 10, myStr: 'hello', myRange: '-10-10;5' }}
    let:output={{ myBool, myNum, myStr, myRange }}
  >
    <!-- <Button on:click={eventCallback}>{myStr}</Button> -->
  </Knobs>
</Variant>

<Variant name="Knobbed2" description="Trying knobs">
  <Knobs
    input={{
      firstProp: { type: 'text', default: 'hello world' },
      secondProp: { type: 'number', default: 123 },
    }}
    let:output={{ firstProp, secondProp }}
  >
    <!-- <Button on:click={eventCallback}>{firstProp}, {secondProp}</Button> -->
  </Knobs>
</Variant>

<EventsAddon />
