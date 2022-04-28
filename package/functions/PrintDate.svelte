<script >export let date;
function printDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);
}
</script>

{#if date}
  {printDate(date)}
{/if}

<style windi:inject>
</style>