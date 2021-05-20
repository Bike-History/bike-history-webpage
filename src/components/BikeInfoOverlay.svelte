<!-- Script -->
<script>
  import { goto } from '@sapper/app';
  import { onDestroy } from "svelte";
	import { serverURL } from '../config';
  import { lightOrDark } from '../helpers/color.js';
  import { user, loginOverlayShown, bikeData } from '../store.js';
  import IBike from './icons/i-bike.svelte';
  import IClipboardEdit from './icons/i-clipboard-edit.svelte';
  export let bike;

  let overlay;

  const propertyTypes = ['motor', 'gear', 'battery', 'range', 'weight'];

  $: specs = bike.bike_property ? Object.keys(bike.bike_property).map((spec) => (
    {type: spec, value: bike.bike_property[spec]}
  )) : [];

  $: buttonColor = lightOrDark(bike.bike_brand.color) === 'light' ? '#000' : '#fff';

  const navigateBack = (event) => {
    if (event.target === overlay) {
      goto(`/`);
    }
  }

  let userData = null;
  const unsubscribeUser = user.subscribe((value) => {
    userData = value;
  });

  const handleEdit = () => {
    if (!userData.user) {
      loginOverlayShown.update(() => true);
      return;
    }
    bikeData.update(() => bike);
    goto('/bike-edit');
  }

  onDestroy(unsubscribeUser);
</script>

<!-- DOM -->
<div class="bike-info-overlay" on:click={navigateBack} bind:this={overlay}>
  <div class="bike-info-container">
    <div class="bike-info-header">
      <img
        class="bike-info-header__image"
        src={bike.images ? `${serverURL}${bike.images[0].url}`: ''}
        alt="No Bike image available"
      />
      <div class="bike-info-header__text">
        <h1 class="bike-info-header__title">{bike.name}</h1>
        <p class="bike-info-header__description">{bike.description}</p>
        <button class="bike-info-header__dealer" style={`background-color:${bike.bike_brand.color}; color: ${buttonColor}`}>
          <span class="text">To Dealer</span>
          <IBike /> 
        </button>
      </div>
    </div>
    <div class="bike-info__specs">
      {#each specs as spec}
        {#if propertyTypes.includes(spec.type) && spec.value}
          <div class="bike-info__specs__chip">
            <img class="icon" src={`/icons/${spec.type}.svg`} alt={spec.type} />
            <span class="value">{spec.value}</span>
          </div>
        {/if}
      {/each}
    </div>
    <div class="bike-info__footer">
      <span>Added by @{bike.creator}</span>
      <span on:click={handleEdit} class="row a-c bike-info__edit">
        edit- <IClipboardEdit />
      </span>
    </div>
  </div>
</div>

<!-- Style -->
<style lang="scss">
  @import "./style/global.scss";
  .bike-info-overlay {
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
    	height: auto;
      padding: $space-slg 0;

      main {
        height: 100vh;
        overflow: hidden;
      }
		}
  }

  .bike-info-container {
    background-color: $c-background-raised;
    width: 80%;
    border-radius: $br-md;
    margin-top: $space-elg;
  }

  .bike-info-header {
    display: flex;
    @media screen and (max-width: $breakpoint) {
    	flex-direction: column;
      align-items: center;
		}

    &__image {
      flex: 1;
      margin: $space-lg;
      margin-top: -$space-elg;
      width: 50%;
      max-height: 350px;
      object-fit: contain;
      min-width: 350px;
      border-radius: $br-md;
      box-shadow: $bs-md;
      background-color: white;
      padding: $space-lg;
      box-sizing: border-box;
    }

    &__text {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: $space-md;
      box-sizing: border-box;
    }

    &__title {
      text-align: center;
    }

    &__description {
      padding: $space-md;
    }

    &__dealer {
      display: flex;
      align-items: center;
      align-self: center;
      width: fit-content;
      padding: $space-sm $space-md;
      border-radius: $br-md;
      box-shadow: $bs-md;
      font-size: $font-md;

      .text {
        margin-right: $space-sm;
      }
    }
  }

  .bike-info {
    &__specs {
      position: relative;
      background-color: $c-background-primary;
      border-radius: $br-md;
      min-height: $space-lg;
      margin: 0 $space-lg $space-md $space-lg;
      box-sizing: border-box;
      padding: $space-sm;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(330px,auto));

      @media screen and (max-width: $breakpoint) {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      &__chip {
        display: flex;
        align-items: center;
        padding: $space-sm;
        background-color: $c-background-raised;
        border-radius: $br-md;
        width: 320px;
        margin: $space-sm;

        @media screen and (max-width: $breakpoint) {
          width: 90%;
        }

        .icon {
          width: 1.5rem;
          margin: 0 $space-md;
        }
      }
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      margin: 0 $space-lg $space-md $space-lg;
    }

    &__edit {
      cursor: pointer;
    }
  }
</style>
