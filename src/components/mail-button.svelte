<!-- Script -->
<script>
  import IPlus from "./icons/i-plus.svelte";

  const subject = '';
  const message = '';
</script>

<!-- DOM -->
<a class="plus" href={`mailto:user@example.com?subject=${subject}&body=${message}`}>
  Contribute
</a>

<!-- Style -->
<style lang="scss">
	@import "./style/global.scss";
  a.plus {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-md;
    font-weight: bold;
    padding: $space-sm $space-sm;
    height: $font-lg;
    border-radius: $br-md;
    color: $c-primary-lightest;
    border: 2px solid $c-shaddow;
  }
</style>