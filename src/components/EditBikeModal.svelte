<!-- SCRIPT -->
<script>
  import { goto } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import ImageUpload from './elements/ImageUpload.svelte';
  import { bikeData, brands } from '../store';
  import BikeSpecsEdit from './BikeSpecsEdit.svelte';
  import { serverURL } from '../config';
  import { brandData, user } from '../store';

  let overlay;
  let errors = {
    name: '',
    brand: '',
    link: '',
    bikeType: '',
    maxGears: '',
    productionStart: '',
    end: '',
  }

  let userData = null;
  const unsubscribeUser = user.subscribe((value) => userData = value);

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
    goto(`/brand-edit`);
  }

  const createOrUpdateBike = () => {
    fetch(`${serverURL}/bikes`, {
      method: 'POST',
      body: JSON.stringify(bike),
      headers: {
        'Authorization': `Bearer ${userData.jwt}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigateBack();
      });
  };

  const saveBike = () => {
    if (!bike.name) {
      errors.name = 'Please insert bike name.';
    } else {
      errors.name = '';
    }
    console.log('brand', bike.bike_brand);
    if (!(bike.bike_brand || bike.bike_brand === 0)) {
      errors.bike_brand = 'Please select a brand.';
    } else {
      errors.bike_brand = '';
    }
    if (!bike.link) {
      errors.link = 'Please provide a link to an online source about this bike.';
    } else {
      errors.link = '';
    }
    if (!bike.bikeType) {
      errors.bikeType = 'Please select the bikes type.';
    } else {
      errors.bikeType = '';
    }
    if (!bike.maxGears) {
      errors.maxGears = 'Please set the maximum gear count for this bike.';
    } else {
      errors.maxGears = '';
    }
    if (!bike.productionStart) {
      errors.productionStart = 'Please enter the start date of this bikes production.';
    } else {
      errors.productionStart = '';
    }
    if (!bike.productionEnd) {
      errors.productionEnd = 'Please enter the end date of this bikes production.';
    } else {
      errors.productionEnd = '';
    }

    // Check all errors
    for (const key in errors) {
      if (errors[key].length !== 0) {
        return;
      }
    }

    createOrUpdateBike();
  }
 
  onDestroy(unsubscribeBike);
  onDestroy(unsubscribeBrands);
  onDestroy(unsubscribeUser);
</script>

<!-- DOM -->
<div class="bike-info-overlay" on:click={navigateBack} bind:this={overlay}>
  <div class="bike-edit">
    <span>{bike.id ? `Editing ${bike.name}` : 'Adding a new Bike'}</span>
    <button class="bike-edit__save" on:click={saveBike}>Save Bike Data</button>
    <div class="bike-edit__header">
      <div class="bike-edit__header__image">
        <ImageUpload currentImage={bike.images[0]} on:change={updateImage}/>
      </div>
      <div class="bike-edit__header__info">
        {#if errors.name}
          <span class="bike-edit__error">{errors.name}</span>
        {/if}
        <input
          class="bike-edit__header__info__title"
          type="text"
          placeholder="Bike-Name"
          value={bike.name}
          on:change={(event) => {
            bike.name = event.target.value
            bike.slug = `${event.target.value}-slug`
          }}
        />
        <textarea
          class="bike-edit__header__info__description"
          placeholder="Bike-Story"
          value={bike.description}
          on:change={(event) => bike.description = event.target.value}
        />
        {#if errors.link}
          <span class="bike-edit__error">{errors.link}</span>
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
      {#if errors.bike_brand}
        <span class="bike-edit__error">{errors.bike_brand}</span>
      {/if}
      <div class="bike-edit__brand-input">
        <select
          class="bike-edit__brand-select"
          on:click={(event) => bike.bike_brand = event.target.value}
        >
          <option value="" disabled selected>Please select</option>
          {#each brandList as brand}
            <option value={brand.id}>{brand.title}</option>
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
        {#if errors.bikeType}
          <span class="bike-edit__error">{errors.bikeType}</span>
        {/if}
        <select
          value={bike.bikeType}
          on:change={(event) => {
            console.log(event)
            bike.bikeType = event.target.value
          }}
        >
          <option value="" disabled selected>Please select</option>
          <option>CITY_BIKE</option>
        </select>
      </div>
      <div class="bike-edit__meta-entry">
        <label>Gears/Speeds</label>
        {#if errors.maxGears}
          <span class="bike-edit__error">{errors.maxGears}</span>
        {/if}
        <input
          type="number"
          value={bike.maxGears}
          on:change={(event) => bike.maxGears = event.target.value}
        />
      </div>
      <div class="bike-edit__meta-entry">
        <label>Electric</label>
        <input type="checkbox"
          value={bike.electric}
          on:change={(event) => bike.electric = event.target.value}
        />
      </div>
      <div class="bike-edit__meta-entry">
        <label>Smart</label>
        <input type="checkbox"
          value={bike.smart}
          on:change={(event) => bike.smart = event.target.value}
        />
      </div>
      <div class="bike-edit__meta-entry">
        <label>Production-Start</label>
        {#if errors.productionStart}
          <span class="bike-edit__error">{errors.productionStart}</span>
        {/if}
        <input
          type="date"
          value={bike.productionStart}
          on:change={(event) => bike.productionStart = event.target.value}
        />
      </div>
      <div class="bike-edit__meta-entry">
        <label>Production-End</label>
        {#if errors.productionEnd}
          <span class="bike-edit__error">{errors.productionEnd}</span>
        {/if}
        <input
          type="date"
          value={bike.productionEnd}
          on:change={(event) => bike.productionEnd = event.target.value}
        />
      </div>
    </div>
    <button class="bike-edit__save" on:click={saveBike}>Save Bike Data</button>
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

    &__error {
      color: red;
      font-size: $font-ssm;
    }

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