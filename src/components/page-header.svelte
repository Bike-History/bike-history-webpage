<!-- Script -->
<script>
  import MailButton from "./mail-button.svelte";
  import Search from "./search.svelte";
	import ILogo from './icons/i-logo.svelte';

</script>

<!-- DOM -->
<div class="header">
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
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    background-color: $c-background-raised;
    box-shadow: $bs-md;
    padding: 0 $space-md;
    box-sizing: border-box;

    @media screen and (max-width: $breakpoint) {
      flex-direction: column;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    margin-right: $space-sm;
  }
</style>