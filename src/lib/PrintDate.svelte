<script>
  export let date: Date;
  function printDate(date: Date | number): string {
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
