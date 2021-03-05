<!-- Script -->
<script>
  import MailButton from "./mail-button.svelte";
  import Search from "./search.svelte";
	import ILogo from './icons/i-logo.svelte';

</script>

<!-- DOM -->
<div class="row header a-c">
  <div class="row a-c">
    <span class="logo">
      <ILogo />
    </span>
    <h1>Bike-History</h1 >
  </div>
  <Search />
  <MailButton />
</div>

<!-- Style -->
<style lang="scss">
  @import "./style/global.scss";
  .header {
    width: 100%;
    justify-content: space-between;
    background-color: $c-background-raised;
    box-shadow: $bs-md;
    margin: $space-md 0;
    padding: 0 $space-md;
    box-sizing: border-box;
  }
  .logo {
    display: flex;
    align-items: center;
    margin-right: $space-sm;
  }
</style>