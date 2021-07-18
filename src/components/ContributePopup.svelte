<!-- SCRIPT -->
<script>
  import IGithub from "./icons/i-github.svelte";

  export let closeCallback;

  let overlay;

  const navigateToGithub = () => {
    window.location = `https://api.bike-history.com/connect/github`;
  };

  const navigateBack = (event) => {
    if (event.target === overlay) {
      closeCallback();
    }
  }
</script>

<!-- DOM -->
<div class="overlay" on:click={navigateBack} bind:this={overlay}>
  <div class="contribute-container">
    <h2 class="title">Contribute</h2>
    <ul class="description">
      <li>Join the community and add your bike to the list.</li>
      <li>Edit present bikes and improve the Open Source Dataset.</li>
    </ul>
    <button class="github-auth" on:click={navigateToGithub}>
      <IGithub />
      <span>Login with Github</span>
    </button>
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
    height: 100%;
    background-color: rgba(black, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .contribute-container{
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 350px;
    padding: $space-md;
    border-radius: $br-md;
    align-items: center;

    .title {
      margin-bottom: $space-sm;
    }

    .description {
      margin-top: 0;
      padding: $space-md $space-lg;

      & > * {
        margin-bottom: $space-sm;
      }
    }
  }

  .github-auth{
    display: flex;
    padding: $space-sm $space-md;
    background-color: #24292E;
    border-radius: $br-md;
    color: white;
    justify-content: center;
    align-items: center;
  }
</style>