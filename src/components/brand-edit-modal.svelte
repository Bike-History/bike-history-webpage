<!-- SCRIPT -->
<script>
  import { goto } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import ImageUpload from './image-upload.svelte';
  import { brandData, brands } from '../store';

  let overlay;
  let brand;
  const unsubscribeBrand = brandData.subscribe((value) => brand = value);

  let errors = {
    name: '',
    brand: '',
    link: '',
    start: '',
    end: '',
    origin: '',
    color: '',
  }

  const navigateBack = (event) => {
    if (event.target === overlay) {
      goto(`/`);
    }
  }

  const uploadImage = () => {
    document.getElementById('fileUpload').click();
  }
  const updateImage = (event) => {
    bike.images.push(event.detail[0]);
    bikeData.update(() => bike);
  };

  onDestroy(unsubscribeBrand);
</script>

<!-- DOM -->
<div class="brand-info-overlay" on:click={navigateBack} bind:this={overlay}>
  <div class="brand-edit">
    <button class="brand-edit__save">Save Brand Data</button>
    <div class="brand-edit__header">
      <div class="brand-edit__header__image">
        <ImageUpload />
      </div>
      <div class="brand-edit__header__info">
        {#if errors.name}
          <span>{errors.name}</span>
        {/if}
        <input
          class="brand-edit__header__info__title"
          type="text"
          placeholder="Brand-Name"
          value={brand.name}
          on:change={(event) => brand.name = event.target.value}
        />
        <textarea
          class="brand-edit__header__info__description"
          placeholder="Brand-Story"
          value={brand.description}
          on:change={(event) => brand.description = event.target.value}
        />
        {#if errors.link}
          <span>{errors.link}</span>
        {/if}
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
          <span>{errors.color}</span>
        {/if}
        <input type="text"/>
      </div>
      <div class="brand-edit__meta-entry">
        <label>Origin</label>
        {#if errors.origin}
          <span>{errors.origin}</span>
        {/if}
        <input type="text"/>
      </div>
      <div class="brand-edit__meta-entry">
        <label>Production-Start</label>
        {#if errors.start}
          <span>{errors.start}</span>
        {/if}
        <input type="date"/>
      </div>
      <div class="brand-edit__meta-entry">
        <label>Production-End</label>
        {#if errors.end}
          <span>{errors.end}</span>
        {/if}
        <input type="date"/>
      </div>
    </div>
    <button class="brand-edit__save">Save Brand Data</button>
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
    }

    &__save {
      width: 100%;
      background-color: $c-primary;
      padding: $space-sm $space-md;
      color: white;
    }
  }
</style>