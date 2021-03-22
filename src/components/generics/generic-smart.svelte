<!-- Script -->
<script>
  import ISmartphone from "../icons/i-smartphone.svelte";
  export let generics;

  let color = '#EDEDED';
  let smart = false;
  if (generics && generics.smart) {
    switch (generics.smart.toLowerCase()) {
      case 'yes':
        color = '#009DFF';
        smart = true;
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

{#if smart}
  <div style={`background-color: ${color}`} class="circle">
    <ISmartphone />
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
    padding: $space-sm;
    box-sizing: border-box;
    border-radius: 50%;
    margin: $space-sm;
    color: white;
  }
</style>