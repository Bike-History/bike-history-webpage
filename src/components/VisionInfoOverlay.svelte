<!-- SCRIPT -->
<script>
  let visible = true;
  let overlay;

  const navigateBack = (event) => {
    if (event.target === overlay) {
      visible = false;
    }
  }
</script>

<!-- DOM -->
{#if visible}
  <div class="overlay" on:click={navigateBack} bind:this={overlay}>
    <div class="vision-container">
      <div class="vision-container__creators">
        <img class="vision-container__creators__image" src="/images/creators.png" />
      </div>
      <div class="vision-container__vision">
        <h2>Hey Cyclist! 🚴</h2>
        <p>
          We are <b>Henri</b> and <b>David</b>, working on this bike database.
          Hopefully this list adds some value to your reseach.<br>
          We belive the bicycle should get similar attention as motorized transportation.<br><br>
          Feel free to contact us for feedback, suggestions and ideas under: <a><b>info@bike-history.com</b></a>
        </p>
        <span>We really appreciate any contribution</span>
        <span>❤</span>
      </div>
    </div>
  </div>
{/if}

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

    @media screen and (max-width: $breakpoint) {
      display: none;
    }
  }

  .vision-container{
    display: flex;
    background-color: white;
    border-radius: $br-md;
    align-items: center;
    overflow: hidden;

    &__creators {
      position: relative;
      background-color: $c-accent-secondary;
      width: 350px;
      height: 100%;
      padding: $space-md $space-md 0;

      &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin-bottom: -10px;
      }
    }

    &__vision {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 400px;
      padding: $space-md;
    }

    h2 {
      font-size: $font-lg;
      margin: $space-md;
    }
  }
</style>
