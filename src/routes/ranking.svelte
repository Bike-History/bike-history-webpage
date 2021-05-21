<!-- Script -->
<script>
  import { goto } from '@sapper/app';
  import { leaderboard, user } from "../store";
  import BestListEntry from "../components/BestListEntry.svelte";
  import { onDestroy } from "svelte";

  let overlay;

  let userData;
  const unsubscribeUser = user.subscribe((value) => {
    if (value.user) {
      userData = value.user;
    }
  });

  let leaderboardList = [];
  const unsubscribeLeaderboardData = leaderboard.subscribe((value) => {
    if (value) {
      console.log(value);
      leaderboardList  = Object.keys(value).map((username) => ({
        username,
        stars: value[username],
      })).sort((a, b) => a.stars - b.stars);
    }
  });

  const navigateBack = (event) => {
    if (event.target === overlay) {
      goto(`/`);
    }
  }

  onDestroy(unsubscribeUser);
  onDestroy(unsubscribeLeaderboardData);
</script>


<!-- DOM -->
<svelte:head>
	<title>Imprint</title>
</svelte:head>

<div class="overlay" on:click={navigateBack} bind:this={overlay}>
  <div class="overlay__container">
    <h1>Contributer Ranking</h1>

    <h4 class="section">Your Rank</h4>
    {#if userData && leaderboardList.length > 0}
      <BestListEntry
        entry={leaderboardList.find((entry) => entry.username === userData.username)}
        rank={leaderboardList.findIndex((entry) => entry.username === userData.username) + 1}
      />
    {/if}
    <h4 class="section">Global Rank</h4>
    <div class="ranking">
      {#each leaderboardList.slice(0,10) as leaderBoardEntry (leaderBoardEntry.username)}
        <BestListEntry
          entry={leaderBoardEntry}
          rank={leaderboardList.findIndex((entry) => entry === leaderBoardEntry) + 1}
        />
      {/each}
    </div>
  </div>
</div>

<!-- Style -->
<style lang="scss">
  @import "./style/global.scss";

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(black, 0.3);
    z-index: 10;
    overflow-y: auto;
    box-sizing: border-box;

    &__container {
      background-color: $c-background-raised;
      width: 80%;
      max-width: 600px;
      border-radius: $br-md;
      padding: $space-lg;
      margin: $space-lg auto;
    }
  }

  .section {
    color: $c-primary-lightest;
    margin-top: $space-md;
    margin-bottom: $space-sm;
  }

  .ranking {
    padding: $space-sm;
    border: 1px solid $c-background-primary;
    border-radius: $br-md;
  }
</style>