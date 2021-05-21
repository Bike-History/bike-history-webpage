<!-- Script -->
<script>
  import { goto } from '@sapper/app';
  import { serverURL } from "../config";
  import GenericElectric from './generics/generic-electric.svelte';
  import GenericGear from './generics/generic-gear.svelte';
  import GenericSmart from './generics/generic-smart.svelte';
  import GenericType from './generics/generic-type.svelte';
  export let bike;
</script>

<!-- DOM -->
<div class="grid-element" on:click={() => goto(`/${bike.bike_brand.id}/${bike.id}`)}>
  <div class="grid-element__header">
    <img class="brand-logo table-column" src={`${serverURL}${bike.bike_brand.logo.url}`} alt=""/>
  </div>
  <div class="grid-element__image-container">
    <img
      class="grid-element__image"
      src={bike.images ? `${serverURL}${bike.images[0].url}`: ''}
      alt="No picture available"
    />
  </div>
  <div class="grid-element__description">
    <span class="grid-element__description__title">{bike.name}</span>
    <div class="grid-element__description__generics row">
      <GenericElectric bike={bike} />
      <GenericType bike={bike} />
      <GenericGear bike={bike} />
      <GenericSmart bike={bike} />
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

    @media screen and (max-width: $breakpoint) {
      width: 300px;
    }

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
        width: 90%;
        border-radius: $br-md;
      }
    }
  }
</style>
