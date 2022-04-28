<script >export let string;
function prepareDisplay(s) {
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    if (urlRegex.test(s)) {
        return s.replace(/https?:\/\//, '');
    }
    else {
        return s;
    }
}
function prepareHref(s) {
    const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    if (urlRegex.test(s)) {
        return s.replace(/^www\./, 'http://');
    }
    else {
        return null;
    }
}
</script>

<slot display={prepareDisplay(string)} href={prepareHref(string)} />

<style windi:inject>
</style>