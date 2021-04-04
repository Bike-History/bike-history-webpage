<!-- Script -->
<script>
  import Search from "./search.svelte";
	import ILogo from './icons/i-logo.svelte';
  import Contribute from "./contribute.svelte";
  import { user } from '../store';
  import { onDestroy } from "svelte";
  import IStar from "./icons/i-star.svelte";

  let loginOverlay = false;

  let userData;
  const unsubscribe = user.subscribe((value) => {
    if (value.user) {
      userData = value;
    }
  });
  onDestroy(unsubscribe);
</script>

<!-- DOM -->
<div class="header">
  <div class="row a-c">
    <span class="logo">
      <ILogo />
    </span>
    <h1>Bike-History</h1 >
  </div>
  <Search />
  {#if userData}
    <div class="row a-c">
      <img class="avatar" src={`https://avatars.githubusercontent.com/${userData.user.username}`}>
      <div class="points">
        <span class="points__text">10</span>
        <IStar />
      </div>
    </div>

  {:else}
    <button on:click={() => loginOverlay = true}>Contribute</button>
  {/if}
</div>

{#if loginOverlay}
  <Contribute closeCallback={() => loginOverlay = false}/>
{/if}

<!-- Style -->
<style lang="scss">
  @import "./style/global.scss";
  .header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    background-color: $c-background-raised;
    box-shadow: $bs-md;
    padding: 0 $space-md;
    box-sizing: border-box;

    @media screen and (max-width: $breakpoint) {
      flex-direction: column;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    margin-right: $space-sm;
  }

  .points {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: $font-md;
    margin-left: $space-md;

    &__text {
      margin-right: $space-sm;
    }
  }

  .avatar {
    border-radius: 50%;
    height: $space-slg;
    padding: $space-ssm;
    border: 1px solid darken($c-background-primary, 5);
    box-sizing: border-box;
  }
</style>