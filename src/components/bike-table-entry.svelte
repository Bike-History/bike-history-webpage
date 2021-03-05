<!-- Script -->
<script>
  import { goto } from '@sapper/app';
  import { serverURL } from "../config";
  import TimeLine from "./time-line.svelte";

  export let selectedStartPeriod;
  export let selectedEndPeriod;
  export let bike;
</script>

<!-- DOM -->
<div class="row a-c bike-table-entry" on:click={goto(`/${bike.brand.id}/${bike.name}`)}>
  <img class="brand-logo table-column" src={`${serverURL}/${bike.brand.logo}`} alt=""/>
  <div class="spacer" />
  <span class="table-column">
    {bike.name}
  </span>
  <div class="spacer" />
  <span class="table-column">
    {bike.type}
  </span>
  <div class="spacer" />
  <div class="timeline">
    <TimeLine
      selectedStartPeriod={selectedStartPeriod}
      selectedEndPeriod={selectedEndPeriod}
      bikeProductionStart={bike.start}
      bikeProductionEnd={bike.end}
      color={bike.brand.color}
    />
  </div>
</div>

<!-- Style -->
<style lang="scss">
@import "./style/global.scss";

.bike-table-entry {
  border-radius: $br-md;
  width: 100%;
  box-sizing: border-box;
  height: $font-slg;
  cursor: pointer;
	background-color: $c-background-raised;
  box-shadow: $bs-md;

  .table-column {
    width: 150px;
    text-align: center;
  }

  .timeline {
    flex-grow: 1;
    padding: 0 $space-sm;
    box-sizing: border-box;
  }

  .brand-logo {
    padding: $space-sm;
    box-sizing: border-box;
    height: $font-lg;
  }

  .spacer {
    height: 100%;
    border-left: 2px solid $c-shaddow;
  }
}
</style>