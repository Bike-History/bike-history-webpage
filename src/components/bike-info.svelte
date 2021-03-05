<!-- Script -->
<script>
  import { goto } from '@sapper/app';
  import { serverURL } from "../config";
  import IScroll from './icons/i-scroll.svelte';


  export let bike;


  $: specs = Object.keys(bike.specs).map((spec) => (
    {type: spec, value: bike.specs[spec]}
  ));
</script>

<!-- DOM -->
<div class="row bike-info">
  <button class="close" on:click={() => goto(`/`)}>X</button>
  <div class="image-preview">
    <img
      class="image"
      src={bike.image ? `${serverURL}${bike.image}`: ''}
      alt="Image missing"
    />
    <div class="row j-c colors">
      {#each bike.colors as color}
        <div class="color" style={`background-color: ${color}`} />
      {/each}
    </div>
  </div>
  <div class="story">
    <h2>{bike.brand.name} - {bike.name}</h2>
    <p class="description">{bike.description}</p>
    {#if bike.brand.link}
      <a class="brand-button" href={bike.brand.link}>To {bike.brand.name}</a>
    {/if}
  </div>
  <div>
    <IScroll />
  </div>
  <div class="specs">
    {#each specs as spec}
    <div class="spec">
      <img class="icon" src={`/icons/${spec.type}.svg`}/>
      <span class="value">{spec.value}</span>
    </div>
    {/each}
  </div>
  <div>
    <IScroll />
  </div>
</div>

<!-- Style -->
<style lang="scss">
	@import "./style/global.scss";

  .close {
    position: absolute;
    top: $space-md;
    left: $space-md;
    font-size: $font-md;
    color: $c-primary-lightest;
  }

  .bike-info {
    position: relative;
    display: flex;
    align-items: center;
    padding: $space-md;
    box-sizing: border-box;
    bottom: 0;
    height: 400px;
    width: 100%;
    box-shadow: $bs-md;
    background-color: $c-background-raised;
		flex-shrink: 0;

    @media screen and (max-width: $breakpoint) {
      position: fixed;
      overflow-y: scroll;
      flex-direction: column;
	  }

    .image-preview {
      display: flex;
      flex-direction: column;
      align-items: center;
      .image {
        width: 20%;
        min-width: 350px;
        max-height: 300px;
        box-shadow: $bs-md;
        border-radius: $br-md;
        margin: $space-md;
        text-align: center;
      }
    }

    .story {
      display: flex;
      flex-direction: column;
      height: 100%;
      flex-grow: 1;
      align-items: center;
      
      .description {
        flex-grow: 1;
        text-align: left;
        width: 90%;
        overflow-y: auto;
      }
    }

    .specs {
      background-color: $c-background-primary;
      border: $space-sm solid $c-background-primary;
      border-radius: $br-md;
      padding: $space-sm;
      max-height: 350px;
      width: 20%;
      min-width: 350px;
      overflow-y: scroll;

      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */

      @media screen and (max-width: $breakpoint) {
        height: fit-content;
        flex-shrink: 0;
      }

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .brand-button {
      font-size: $space-md;
      font-weight: bold;
      padding: $space-md;
      text-decoration: underline;
    }

    .colors {
      .color {
        height: $space-lg;
        width: $space-lg;
        border-radius: $br-md;
        margin: 0 $space-sm;
        border: 4px solid $c-primary;
      }
    }

    .spec {
      display: flex;
      align-items: center;
      padding: 0 $space-sm;
      background-color: $c-background-raised;
      border-radius: $br-md;
      margin: 4px 0;
      .icon {
        padding: $space-sm;
      }
      .value {
        font-weight: 500;
        font-size: $font-ssm;
      }
    }
  }
</style>