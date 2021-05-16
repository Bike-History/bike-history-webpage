<!-- SCRIPT -->
<script>
  import { goto } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import ImageUpload from './elements/ImageUpload.svelte';
  import { brandData, user } from '../store';
  import { serverURL } from '../config';

  let overlay;
  let userData = null;
  const unsubscribeUser = user.subscribe((value) => userData = value);

  let brand;
  const unsubscribeBrand = brandData.subscribe((value) => brand = value);

  let errors = {
    title: '',
    brand: '',
    link: '',
    startDate: '',
    endDate: '',
    origin: '',
    color: '',
  }

  const navigateBack = (event) => {
    if (event.target === overlay) {
      goto(`/bike-edit`);
    }
  }

  const uploadImage = () => {
    document.getElementById('fileUpload').click();
  }
  const updateImage = (event) => {
    brand.logo = event.detail[0];
    brandData.update(() => bike);
  };

  const createOrUpdateBrand = () => {
    fetch(`${serverURL}/bike-brands`, {
      method: 'POST',
      body: JSON.stringify(brand),
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

  const saveBrand = () => {
    if (!brand.title) {
      errors.title = 'Please insert brand name.';
    } else {
      errors.title = '';
    }
    if (!brand.color) {
      errors.color = 'Please set a brand color.';
    } else {
      errors.color = '';
    }
    if (!brand.origin) {
      errors.origin = 'Please select a brand origin.';
    } else {
      errors.origin = '';
    }
    if (!brand.startDate) {
      errors.startDate = 'Please enter the founding date of the brand.';
    } else {
      errors.startDate = '';
    }
    if (!brand.endDate) {
      errors.endDate = 'Please enter the founding date of the brand.';
    } else {
      errors.endDate = '';
    }

    // Check all errors
    for (const key in errors) {
      console.log(key);
      if (errors[key].length !== 0) {
        return;
      }
    }

    createOrUpdateBrand();
  }

  onDestroy(unsubscribeBrand);
  onDestroy(unsubscribeUser);
</script>

<!-- DOM -->
<div class="brand-info-overlay" on:click={navigateBack} bind:this={overlay}>
  <div class="brand-edit">
    <button class="brand-edit__save" on:click={saveBrand}>Save Brand Data</button>
    <div class="brand-edit__header">
      <div class="brand-edit__header__image">
        <ImageUpload currentImage={brand.logo} on:change={updateImage}/>
      </div>
      <div class="brand-edit__header__info">
        {#if errors.title}
          <span class="brand-edit__error">{errors.title}</span>
        {/if}
        <input
          class="brand-edit__header__info__title"
          type="text"
          placeholder="Brand-Name"
          value={brand.title}
          on:change={(event) => brand.title = event.target.value}
        />
        <textarea
          class="brand-edit__header__info__description"
          placeholder="Brand-Story"
          value={brand.description}
          on:change={(event) => brand.description = event.target.value}
        />
        <input
          class="brand-edit__header__info__web"
          type="text"
          placeholder="Link to Brand"
          value={brand.link}
          on:change={(event) => brand.link = event.target.value}
        />
      </div>
    </div>
    <div class="brand-edit__meta">
      <div class="brand-edit__meta-entry">
        <label>Color</label>
        {#if errors.color}
          <span class="brand-edit__error">{errors.color}</span>
        {/if}
        <input
          type="text"
          value={brand.color}
          on:change={(event) => brand.color = event.target.value}
        />
      </div>
      <div class="brand-edit__meta-entry">
        <label>Origin</label>
        {#if errors.origin}
          <span class="brand-edit__error">{errors.origin}</span>
        {/if}
        <input
          type="text"
          value={brand.origin}
          on:change={(event) => brand.origin = event.target.value}
        />
      </div>
      <div class="brand-edit__meta-entry">
        <label>Production-Start</label>
        {#if errors.startDate}
          <span class="brand-edit__error">{errors.startDate}</span>
        {/if}
        <input
          type="date"
          value={brand.startDate}
          on:change={(event) => brand.startDate = event.target.value}
        />
      </div>
      <div class="brand-edit__meta-entry">
        <label>Production-End</label>
        {#if errors.endDate}
          <span class="brand-edit__error">{errors.endDate}</span>
        {/if}
        <input
          type="date"
          value={brand.endDate}
          on:change={(event) => brand.endDate = event.target.value}
        />
      </div>
    </div>
    <button class="brand-edit__save" on:click={saveBrand}>Save Brand Data</button>
  </div>
</div>

<!-- STYLE -->
<style lang="scss">
	@import "./style/global.scss";

  .brand-info-overlay {
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

  .brand-edit {
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

    &__error {
      color: red;
      font-size: $font-ssm;
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

        &__overlay {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: $font-lg;
          color: white;
          position: absolute;
          cursor: pointer;
          top: 0;
          height: 100%;
          width: 100%;
          border-radius: $br-md;
          background-color: rgba(black,0.1);
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

    &__specs {
      position: relative;
      background-color: $c-background-primary;
      border-radius: $br-md;
      min-height: 200px;
      box-sizing: border-box;
      padding: $space-sm;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(330px,auto));

      &__entry {
        display: flex;
        align-items: center;
        padding: $space-sm;
        background-color: $c-background-raised;
        border-radius: $br-md;
        width: 320px;
        height: fit-content;
        margin: $space-sm;
      }

      &__add {
        height: $space-lg;
        width: $space-lg;
        border-radius: 50%;
        margin: $space-md;
        background-color: $c-background-raised;
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