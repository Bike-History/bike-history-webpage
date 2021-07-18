<!-- Script -->
<script>
  import { goto } from '@sapper/app';
  import { serverURL } from "../config";
  import IWeb from './icons/i-web.svelte';
  export let brand;
</script>

<!-- DOM -->
<div class="grid-element" on:click={() => goto(`/${brand.id}`)}>
  <!-- <div class="grid-element__header">
    
  </div> -->
  <div class="grid-element__image-container">
   <img class="brand-logo table-column" src={`${serverURL}${brand.logo.url}`} alt=""/>
  </div>
  <div class="grid-element__description">
    <div class="grid-element__description__generics row">
      <div class="grid-element__description__circle" on:click={() => window.open(brand.link, '_blank')}>
        <IWeb />
      </div>
      <div class="grid-element__description__circle" style={`background-color: ${brand.color}`}/>
    </div>
  </div>
</div>

<!-- Style -->
<style lang="scss">
	@import "./style/global.scss";

  .grid-element {
    position: relative;
    width: 350px;
    display: flex;
    flex-direction: column;
    background-color: $c-background-raised;
    border-radius: $br-md;
    margin: $space-sm;
    margin-bottom: $space-sm;
    height: fit-content;
    cursor: pointer;

    &__header {
      display: flex;
      justify-content: center;
      padding: $space-md;
      box-sizing: border-box;
      width: 100%;
      height: $space-slg;
      background-color: $c-background-raised;
      border-radius: $br-md;
      box-shadow: $bs-md;
    }

    &__image-container {
      position: relative;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: $space-md;
    }

    &__image {
      width: 80%;
      height: 200px;
      z-index: 0;
      object-fit: scale-down;
    }

    &__description {
      width: 100%;
      min-height: $space-elg;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: $c-background-raised;
      border-radius: $br-md;
      box-shadow: $bs-md;
      padding: $space-sm;
      box-sizing: border-box;

      &__title {
        font-weight: bold;
        font-size: $font-md;
        margin: $space-sm;
      }

      &__generics {
        background-color: $c-background-primary;
        min-height: $space-lg;
        width: 100%;
        height: 100%;
        border-radius: $br-md;
        display: flex;
        justify-content: space-around;
        padding: $space-md;
        box-sizing: border-box;
      }

      &__circle {
        border-radius: 50%;
        border: 2px solid $c-primary;
        background-color: $c-background-raised;
        padding: $space-sm;
        width: $space-lg;
        height: $space-lg;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .brand-logo {
    padding: $space-sm;
    box-sizing: border-box;
    max-width: 100%;
  }
</style>
