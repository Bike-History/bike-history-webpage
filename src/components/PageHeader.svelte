<!-- Script -->
<script>
  import { goto } from '@sapper/app';
  import Search from "./elements/Search.svelte";
	import ILogo from './icons/i-logo.svelte';
  import { user, bikeData, leaderboard, loginOverlayShown } from '../store';
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

  $: userStars = userData && userData.user && userData.user.username ? leaderboardData[userData.user.username] || 0 : 0;

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
    <h1 class="title">Bike-History</h1 >
  </div>
  <Search />
  {#if userData}
    <div class="row">
      <div class="profile">
        <img class="avatar" src={`https://avatars.githubusercontent.com/${userData.user.username}`}>
        <div class="points">
          <div class="points__text" on:click={() => goto('/ranking')}>
            <span>{userStars}</span>
            <IStar />
          </div>
          <div class="profile__spacer" />
          <button class="points__text" on:click={handleAdd}>
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
    <button on:click={() => loginOverlayShown.update(() => true)}>Contribute</button>
  {/if}
</div>

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

      & > * {
        margin: $space-sm 0;
      }
    }
  }
  .logo {
    display: flex;
    align-items: center;
    margin-right: $space-sm;
  }
  
  .title {
    font-size: $font-slg;
    @media screen and (max-width: $breakpoint) {
      font-size: $font-lg;
    }
  }
  .points {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: $font-md;
    margin-left: $space-md;

    &__text {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: $font-sm;

      & > * {
        margin: 0 $space-sm;
      }
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
      cursor: pointer;
    }

    &__spacer {
      height: $space-md;
      margin: $space-sm;
      border-left: 2px solid $c-background-primary;
    }
  }
  .avatar {
    border-radius: 50%;
    height: $space-slg;
    box-sizing: border-box;
    padding: 2px;
  }
</style>