<!-- Script -->
<script>
  import ICargobike from "../icons/i-cargobike.svelte";
import ICity from "../icons/i-city.svelte";
  import IMountain from "../icons/i-mountain.svelte";
  import IQuestionmark from "../icons/i-questionmark.svelte";

  export let generics;

  let icon = '';
  if (generics.type) {
    switch (generics.type.toUpperCase()) {
      case 'E-TOURING-BIKE':
      case 'E-CITY-BIKE':
      case 'STREET-BIKE':
        icon = 'city';
        break;
      case 'E-MOUNTAIN-BIKE':
        icon = 'montain';
        break;
      case 'E-CARGO-BIKE':
      case 'CARGO-BIKE':
        icon = 'cargobike';
        break;
      default:
        icon = 'unknown';
    }
  }
</script>
<!-- DOM -->

{#if icon != ''}
  <div class="circle">
    {#if icon === 'city'}
      <ICity />
    {:else if icon === 'mountain'}
      <IMountain />
    {:else if icon === 'cargobike'}
      <ICargobike />
    {:else}
      <IQuestionmark />
    {/if}
  </div>
{/if}

<!-- Style -->
<style lang="scss">
	@import "./style/global.scss";
  .circle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FC846F;
    height: $space-lg;
    width: $space-lg;
    border-radius: 50%;
    margin: $space-sm;
    color: white;
    padding: $space-sm;
    box-sizing: border-box;
  }
  .imgIcon {
    width: 70%;
  }
</style>