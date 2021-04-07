<!-- Script -->
<script>
import IElectric from "../icons/i-electric.svelte";

  export let bike;

  let color = '#EDEDED';
  let electric = false;
  if (bike && bike.electric) {
    if (bike.electric) {
      color = '#7AED74';
      electric = true;
    } else {
      color = '#FC846F';
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