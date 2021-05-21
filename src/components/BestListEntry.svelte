<!-- SCRIPT -->
<script>
  import IStar from "./icons/i-star.svelte";

  export let entry;
  export let rank;
</script>

<!-- DOM -->
<div class="ranking">
  <div class="ranking__circle">
    <span class="ranking__circle__text">{`#${rank}`}</span>
  </div>
  <div class="ranking__text">
    <span class="ranking__text__stars">{entry.stars}</span>
    <IStar/>
  </div>
  <span class="ranking__text ranking__text--bold">{entry.username}</span>
  <div class="ranking__circle">
    <img  class="ranking__circle" src={`https://avatars.githubusercontent.com/${entry.username}`} />
  </div>
</div>

<!-- STYLE -->
<style lang="scss">
  @import "./style/global.scss";

  .ranking {
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-shadow: $bs-md;
    border-radius: $br-md;
    padding: $space-md;
    margin: $space-sm 0;
    box-sizing: border-box;

    &__text {
      display: flex;
      align-items: center;

      &__stars {
        margin: 0 $space-sm;
      }

      &--bold {
        font-weight: bold;
      }
    }

    &__circle {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $font-slg;
      width: $font-slg;
      border-radius: 50%;
      background-color: $c-background-primary;
    }
  }
</style>
