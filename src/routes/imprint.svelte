<!-- SCRIPT -->
<script>
  import { goto } from '@sapper/app';
  import imprint from '../assets/imprint.md';
  let overlay;

  const navigateBack = (event) => {
    if (event.target === overlay) {
      goto(`/`);
    }
  }
</script>

<!-- DOM -->
<svelte:head>
	<title>Imprint</title>
</svelte:head>

<div class="overlay" on:click={navigateBack} bind:this={overlay}>
  <div class="overlay__container">
    <h1>Imprint</h1>
    {@html imprint.html}
  </div>
</div>

<!-- STYLE -->
<style lang="scss">
  @import "./style/global.scss";

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 100vh;
    background-color: rgba(black, 0.3);
    z-index: 10;
    overflow-y: auto;
    box-sizing: border-box;

    &__container {
      background-color: $c-background-raised;
      width: 80%;
      border-radius: $br-md;
      padding: $space-lg;
      margin: $space-lg auto;
    }
  }
</style>