<script lang="ts">
  import { Story } from 'kitbook';
  const id = 'foo';
</script>

<Story code={`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">title=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">messages/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>id<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">&#125;</span></span><span class="token punctuation">></span></span>Hi<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>`}>
  <div title={`messages/${id}`}>Hi</div>
</Story>

<Story code={`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Story</span> <span class="token attr-name">name=</span><span class="token language-javascript"><span class="token punctuation">&#123;</span><span class="token template-string"><span class="token template-punctuation string">&#96;</span><span class="token string">messages/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$&#123;</span>id<span class="token interpolation-punctuation punctuation">&#125;</span></span><span class="token template-punctuation string">&#96;</span></span><span class="token punctuation">&#125;</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>background: red;<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>Story</span><span class="token punctuation">></span></span>`} name="Adjust" knobs={{id: 'foo'}} let:props={{id}} height={200} width={200}>
  <Story code={`<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>background: red;<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>`} name={`messages/${id}`}>
    <div style="background: red;" />
  </Story>
</Story>
