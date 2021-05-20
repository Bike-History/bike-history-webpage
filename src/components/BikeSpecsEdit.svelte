<!-- Script -->
<script>
  import { onDestroy, createEventDispatcher } from 'svelte';
  import { bikeSpecs } from '../models/enums';
  import { serverURL } from '../config';
  export let initSpecs = {id: -1};
  let specs = initSpecs;
  import { user } from '../store';
  const dispatch = createEventDispatcher();


  let userData = null;
  const unsubscribeUser = user.subscribe((value) => userData = value);
  onDestroy(unsubscribeUser);
  
  $: availableKeys = Object.keys(bikeSpecs).filter((key) => !Object.keys(specs).includes(key) || specs[key] == null);

  const updateSpec = (key) => {
    const keyValue = document.getElementById(`select-${key}`).value;
    const valueValue = document.getElementById(`input-${key}`).value;
    specs[keyValue] = valueValue;
    // Send Update
    sendCreateUpdate();
  }

  const sendCreateUpdate = () => {
    if (specs.id === -1) {
      fetch(`${serverURL}/bike-properties`, {
        method: 'POST',
        body: JSON.stringify(specs),
        headers: {
          'Authorization': `Bearer ${userData.jwt}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch('change', data);
        });
    } else {
      fetch(`${serverURL}/bike-properties/${specs.id}`, {
        method: 'PUT',
        body: JSON.stringify(specs),
        headers: {
          'Authorization': `Bearer ${userData.jwt}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch('change', data);
        });
    }
  }

  const removeSpec = (key) => {
    specs[key] = null;
    sendCreateUpdate();
  }

  const addSpec = () => {
    const specsUpdate = { ...specs };
    if (availableKeys[0]) {
      delete specsUpdate[availableKeys[0]];
      specsUpdate[availableKeys[0]] =  '';
      specs = specsUpdate;
    }
  }
</script>

<!-- DOM -->
<div class="specs">
  {#each Object.keys(specs) as spec}
    {#if specs[spec] != null && bikeSpecs[spec]}
      <div
        id={spec}
        class="specs__entry"
      >
        <select
          class="specs__key"
          id={`select-${spec}`}
          value={spec}
          on:change={() => updateSpec(spec)}
        >
          <option value={spec}>{spec}</option>
          {#each availableKeys as availableKey}
            <option value={availableKey}>{availableKey}</option>
          {/each}
        </select>
        {#if bikeSpecs[spec] === 'string'}
          <input
            id={`input-${spec}`}
            value={specs[spec]}
            type="text"
            class="specs__value"
            on:change={() => updateSpec(spec)}
          />
        {:else if bikeSpecs[spec] === 'number'}
          <input
            id={`input-${spec}`}
            value={specs[spec]}
            type="number"
            class="specs__value"
            on:change={() => updateSpec(spec)}
          />
        {:else if bikeSpecs[spec] === 'float'}
          <input
            id={`input-${spec}`}
            value={specs[spec]}
            type="number"
            step="0.01"
            class="specs__value"
            on:change={() => updateSpec(spec)}
          />
        {/if}
        <button on:click={() => removeSpec(spec)}>x</button>
      </div>
    {/if}
  {/each}
  {#if availableKeys[0]}
    <button on:click={addSpec} class="specs__add">+</button>
  {/if}
</div>

<!-- Style -->
<style lang="scss">
	@import "./style/global.scss";

  .specs {
      position: relative;
      background-color: $c-background-primary;
      border-radius: $br-md;
      min-height: 200px;
      box-sizing: border-box;
      padding: $space-sm;
      margin: $space-md 0;
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

      &__key {
        background-color: transparent;
        border: none;
        width: 30%;
        /* for Firefox */
        -moz-appearance: none;
        /* for Chrome */
        -webkit-appearance: none;
        border-right: 2px solid $c-background-primary;
      }

      &__value {
        width: calc(70% - 10px);
        padding: $space-sm;
      }

      &__key::-ms-expand {
        display: none;
      }
    }
</style>