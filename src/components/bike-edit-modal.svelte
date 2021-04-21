<!-- SCRIPT -->
<script>
  import { goto } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import ImageUpload from './image-upload.svelte';
  import { bikeData, brands } from '../store';
  import BikeSpecsEdit from './bike-specs-edit.svelte';

  let overlay;
  let errors = {
    name: '',
    brand: '',
    link: '',
    type: '',
    grear: '',
    start: '',
    end: '',
  }

  let brandList = [];
  const unsubscribeBrands = brands.subscribe((value) => brandList = value);

  let bike;
  const unsubscribeBike = bikeData.subscribe((value) => bike = value);

  const navigateBack = (event) => {
    if (event.target === overlay) {
      goto(`/`);
    }
  }

  const updateImage = (event) => {
    bike.images.push(event.detail[0]);
    bikeData.update(() => bike);
  };

  const handleAddBrand = () => {
    goto('/new-brand');
  }
 
  onDestroy(unsubscribeBike);
  onDestroy(unsubscribeBrands);
</script>

<!-- DOM -->
<div class="bike-info-overlay" on:click={navigateBack} bind:this={overlay}>
  <div class="bike-edit">
    <span>{bike.id ? `Editing ${bike.name}` : 'Adding a new Bike'}</span>
    <button class="bike-edit__save">Save Bike Data</button>
    <div class="bike-edit__header">
      <div class="bike-edit__header__image">
        <ImageUpload currentImage={bike.images[0]} on:change={updateImage}/>
      </div>
      <div class="bike-edit__header__info">
        {#if errors.name}
          <span>{errors.name}</span>
        {/if}
        <input
          class="bike-edit__header__info__title"
          type="text"
          placeholder="Bike-Name"
          value={bike.name}
          on:change={(event) => bike.name = event.target.value}
        />
        <textarea
          class="bike-edit__header__info__description"
          placeholder="Bike-Story"
          value={bike.description}
          on:change={(event) => bike.description = event.target.value}
        />
        {#if errors.link}
          <span>{errors.link}</span>
        {/if}
        <input
          class="bike-edit__header__info__web"
          type="text"
          placeholder="Link to Seller"
          value={bike.link}
          on:change={(event) => bike.link = event.target.value}
        />
      </div>
    </div>
    <BikeSpecsEdit />
    <div class="bike-edit__brand">
      <label>Brand</label>
      {#if errors.brand}
        <span>{errors.brand}</span>
      {/if}
      <div class="bike-edit__brand-input">
        <select
          class="bike-edit__brand-select"
          on:click={(event) => bike.brand = event.target.value}
        >
          {#each brandList as brand}
            <option value={brand}>{brand.title}</option>
          {/each}
        </select>
        <button
          on:click={handleAddBrand}
          class="bike-edit__brand-add"
        >
          Add brand +
        </button>
      </div>
    </div>
    <div class="bike-edit__meta">
     
      <div class="bike-edit__meta-entry">
        <label>Type</label>
        {#if errors.type}
          <span>{errors.type}</span>
        {/if}
        <select>
          <option>CITY_BIKE</option>
        </select>
      </div>
      <div class="bike-edit__meta-entry">
        <label>Gears/Speeds</label>
        {#if errors.grear}
          <span>{errors.grear}</span>
        {/if}
        <input type="number"/>
      </div>
      <div class="bike-edit__meta-entry">
        <label>Electric</label>
        <input type="checkbox"/>
      </div>
      <div class="bike-edit__meta-entry">
        <label>Smart</label>
        <input type="checkbox"/>
      </div>
      <div class="bike-edit__meta-entry">
        <label>Production-Start</label>
        {#if errors.start}
          <span>{errors.start}</span>
        {/if}
        <input type="date"/>
      </div>
      <div class="bike-edit__meta-entry">
        <label>Production-End</label>
        {#if errors.end}
          <span>{errors.end}</span>
        {/if}
        <input type="date"/>
      </div>
    </div>
    <button class="bike-edit__save">Save Bike Data</button>
  </div>
</div>

<!-- STYLE -->
<style lang="scss">
	@import "./style/global.scss";

  .bike-info-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: rgba(black, 0.3);
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

  .bike-edit {
    position: relative;
    background-color: $c-background-raised;
    width: 80%;
    border-radius: $br-md;
    margin: $space-lg auto;
    padding: $space-lg;

    & > * {
      margin-top: $space-lg;
    }

    input, select {
      border: 1px solid rgba(black, 0.1);
      margin: 0;
      padding: $space-sm $space-md;
      box-sizing: border-box;
    }

    &__header {
      display: flex;

      &__image {
        position: relative;
        flex: 1;
        margin: $space-lg;
        width: 50%;
        max-height: 350px;
        min-height: 300px;
        object-fit: contain;
        min-width: 350px;
        border-radius: $br-md;
        box-shadow: $bs-md;
        background-color: white;
        box-sizing: border-box;
      }

      &__info {

        & > * {
          width: 100%;
        }

        &__description {
          height: 300px;
          border: 1px solid rgba(black, 0.1);
          border-top: none;
          border-bottom: none;
          resize: none;
          margin: 0;
          padding: $space-sm $space-md;
          box-sizing: border-box;
        }
      }
    }

    &__brand {
      width: 320px;

      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &-input {
        display: flex;
      }

      &-select {
        flex-grow: 1;
      }

      &-add {
        border: 1px solid rgba(black, 0.1);
        background-color: $c-primary;
        color: white;
      }
    }

    &__meta {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(330px,auto)); 
      
      &-entry {
        display: flex;
        flex-direction: column;
        width: 320px;
        margin: $space-sm 0;
      }
    }

    &__save {
      width: 100%;
      background-color: $c-primary;
      padding: $space-sm $space-md;
      color: white;
    }
  }
</style>