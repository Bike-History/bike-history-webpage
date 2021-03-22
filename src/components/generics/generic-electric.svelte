<!-- Script -->
<script>
import IElectric from "../icons/i-electric.svelte";

  export let generics;

  let color = '#EDEDED';
  let electric = false;
  if (generics && generics.electric) {
    switch (generics.electric) {
      case 'yes':
        color = '#7AED74';
        electric = true;
        break;
      case 'no':
        color = '#FC846F';
        break;
      default:
        color = '#EDEDED';
    }
  }
</script>
<!-- DOM -->

{#if electric}
  <div style={`background-color: ${color}`} class="circle">
    <IElectric />
  </div>
{/if}

<!-- Style -->
<style lang="scss">
	@import "./style/global.scss";
  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $space-lg;
    width: $space-lg;
    box-sizing: border-box;
    border-radius: 50%;
    margin: $space-sm;
    color: white;
  }
</style>