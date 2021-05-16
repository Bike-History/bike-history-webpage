<!-- Script -->
<script>
  import { goto } from '@sapper/app';
  import Search from "./elements/Search.svelte";
	import ILogo from './icons/i-logo.svelte';
  import Contribute from "./ContributePopup.svelte";
  import { user, bikeData, leaderboard } from '../store';
  import { onDestroy } from "svelte";
  import IStar from "./icons/i-star.svelte";
  import ILogout from "./icons/i-logout.svelte";
  import IBike from './icons/i-bike.svelte';
  import { BikeEmpty } from '../models/bike';

  let loginOverlay = false;
  let userData = null;
  let leaderboardData = {};

  const unsubscribeUser = user.subscribe((value) => {
    userData = value;
  });
  
  const unsubscribeLeaderBoard = leaderboard.subscribe((value) => {
    leaderboardData = value;
  });

  $: userStars = userData.user && userData.user.username ? leaderboardData[userData.user.username] || 0 : 0;

  const logout = () => {
    user.update(() => null);
    localStorage.removeItem('user');
  }

  const handleAdd = () => {
    bikeData.update(() => BikeEmpty());
    goto('/bike-edit');
  }

  onDestroy(unsubscribeUser);
  onDestroy(unsubscribeLeaderBoard);
</script>

<!-- DOM -->
<div class="header">
  <div class="row a-c" style="cursor:pointer" on:click={() => goto('/')}>
    <span class="logo">
      <ILogo />
    </span>
    <h1>Bike-History</h1 >
  </div>
  <Search />
  {#if userData}
    <div class="row">
      <div class="profile">
        <img class="avatar" src={`https://avatars.githubusercontent.com/${userData.user.username}`}>
        <div class="points">
          <span class="points__text">{userStars}</span>
          <IStar />
          <div class="profile__spacer" />
          <button class="add-bike" on:click={handleAdd}>
            <span>+ Add</span>
            <IBike />
          </button>
          <div class="profile__spacer" />
          <div class="profile__logout" on:click={logout}>
            <ILogout />
          </div>
        </div>
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
    position: relative;
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

  .profile {
    display: flex;
    align-items: center;
    border: 2px solid $c-background-primary;
    border-radius: $space-slg;
    padding-right: $space-md;

    &__logout {
      display: flex;
      align-items: center;
    }

    &__spacer {
      height: $space-md;
      margin: $space-sm;
      border-left: 2px solid $c-background-primary;
    }
  }

  .add-bike {
    display: flex;
    align-items: center;
    border-radius: $space-slg;
    font-size: $font-sm;
    padding: 0;

    & > * {
      margin: 0 $space-sm;
    }
  }

  .avatar {
    border-radius: 50%;
    height: $space-slg;
    box-sizing: border-box;
  }
</style>