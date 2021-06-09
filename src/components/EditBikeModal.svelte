<!-- SCRIPT -->
<script>
  import { goto } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import ImageUpload from './elements/ImageUpload.svelte';
  import { bikeData, brands } from '../store';
  import BikeSpecsEdit from './BikeSpecsEdit.svelte';
  import { serverURL } from '../config';
  import { user } from '../store';

  let overlay;
  let errors = {
    name: '',
    brand: '',
    link: '',
    bikeType: '',
    maxGears: '',
    productionStart: '',
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
    bike.images[0] = event.detail[0];
    bikeData.update(() => bike);
  };

  const handleAddBrand = () => {
    goto(`/brand-edit`);
  }

  const createOrUpdateBike = () => {
    if (bike.id != -1) {
      fetch(`${serverURL}/bikes/${bike.id}`, {
        method: 'PUT',
        body: JSON.stringify({...bike, creator: userData.user.username}),
        headers: {
          'Authorization': `Bearer ${userData.jwt}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          goto(`/`);
        });
    } else {
      fetch(`${serverURL}/bikes`, {
        method: 'POST',
        body: JSON.stringify(bike),
        headers: {
          'Authorization': `Bearer ${userData.jwt}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          goto(`/`);
        });
    }
  };

  const saveBike = () => {
    if (!bike.name) {
      errors.name = 'Please insert bike name.';
    } else {
      errors.name = '';
    }
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
    <h2 class="bike-edit__title">{bike.id != -1 ? `> Editing ${bike.name}` : '> Adding a new Bike'}</h2>
    <div class="bike-edit__submit">
      <button class="bike-edit__save" on:click={saveBike}>Save Bike Data</button>
      {#if bike.id == -1}
        <span class="bike-edit__error">Once a bike is create it cannot be removed!</span>
      {/if}
    </div>
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
            bike.slug = `${event.target.value.split(' ').join('')}-slug`
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
    <BikeSpecsEdit
      initSpecs={bike.bike_property}
      on:change={(event) => bike.bike_property = event.detail}
    />
    <div class="bike-edit__brand">
      <label>Brand</label>
      {#if errors.bike_brand}
        <span class="bike-edit__error">{errors.bike_brand}</span>
      {/if}
      <div class="bike-edit__brand-input">
        <select
          class="bike-edit__brand-select"
          value={bike.bike_brand ? bike.bike_brand.id : ""}
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
            bike.bikeType = event.target.value
          }}
        >
          <option value="" disabled selected>Please select</option>
          <option value="E_CITY_BIKE">E_CITY_BIKE</option>
          <option value="E_MOUNTAIN_BIKE">E_MOUNTAIN_BIKE</option>
          <option value="E_CARGO_BIKE">E_CARGO_BIKE</option>
          <option value="CITY_BIKE">CITY_BIKE</option>
          <option value="MOUNTAIN_BIKE">MOUNTAIN_BIKE</option>
          <option value="CARGO_BIKE">CARGO_BIKE</option>
          <option value="STREET_BIKE">STREET_BIKE</option>
          <option value="BMX">BMX</option>
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
        <input
          type="checkbox"
          checked={bike.electric}
          on:change={(event) => bike.electric = event.target.checked}
        />
      </div>
      <div class="bike-edit__meta-entry">
        <label>Smart</label>
        <input
          type="checkbox"
          checked={bike.smart}
          on:change={(event) => bike.smart = event.target.checked}
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
        <div class="row a-c">
          <input
            type="checkbox"
            checked={bike.productionEnd === null}
            on:change={(event) => {
              console.log(event);
              if (event.target.checked) {
                bike.productionEnd = null
                return;
              }
              bike.productionEnd = Date.now();
            }}
          />
          <span class="bike-edit__meta-entry__text">Now /</span>
          <input
            disabled={bike.productionEnd === null}
            type="date"
            value={bike.productionEnd}
            on:change={(event) => bike.productionEnd = event.target.value}
          />
        </div>
      </div>
    </div>
    <div class="bike-edit__submit">
      {#if bike.id == -1}
        <span class="bike-edit__error">Once a bike is create it cannot be removed!</span>
      {/if}
      <button class="bike-edit__save" on:click={saveBike}>Save Bike Data</button>
    </div>
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
      color: $c-error;
      font-size: $font-ssm;
      font-weight: bold;
    }

    &__submit {
      display: flex;
      flex-direction: column;
      align-items: center;
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

    &__title {
      margin: 0;
    }

    &__header {
      display: flex;

      @media screen and (max-width: $breakpoint) {
        flex-direction: column;
        align-items: center;
      }

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

        @media screen and (max-width: $breakpoint) {
          min-height: 200px;
          min-width: 280px;
        }
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

        &__text {
          margin: 0 $space-md;
        }
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