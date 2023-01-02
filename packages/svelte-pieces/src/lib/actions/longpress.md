<script>
  import { Story } from 'kitbook';
  import { longpress } from './longpress';
</script>

<Story knobs={{ duration: '200-2000;1000' }} let:knobs={{ duration }}>
  <button
    class="p-3 hover:bg-gray-200"
    type="button"
    use:longpress={+duration}
    on:longpress={() => console.log('longpress')}
    on:shortpress={() => console.log('shortpress')}>Press/tap more or less than {duration}</button>
</Story>
