<script lang="ts">
  import { Story } from '$lib';
</script>

# StoryComponent for Sandbox Mocking

None of the text here should show when viewed inside the +Page sandbox

<Story id="showMe" knobs={{ age: 20 }} let:knobs={{ age }}>
  This story should show in the +page sandbox
  Sample age prop: {age}
  <div>This line also should show</div>
</Story>

<Story id="doNotShowMe">This story should not show.</Story>

<span>This line should not show</span>

I'm a **story**, but this line (and all documentation) should not show in the sandbox.
