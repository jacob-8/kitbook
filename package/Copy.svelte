<script>var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { tick, createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
export let text;
let textarea;
function copy() {
    return __awaiter(this, void 0, void 0, function* () {
        textarea.select();
        document.execCommand('Copy');
        yield tick();
        textarea.blur();
        dispatch('copy');
    });
}
// Usage example:
// <Copy text={message} let:copy>
// 	<Button size="sm" form="simple" color="black" onclick={copy}>
// 		<i class="fas fa-copy" />
// 	</Button>
// </Copy>;
</script>

<slot {copy} />
<textarea bind:this={textarea} value={text} />

<style>
	textarea {
		opacity: 0;
		width: 1px;
		height: 1px;
		position: fixed;
		pointer-events: none;
	}</style>
