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
<div class="bike-table-entry" on:click={goto(`/${bike.bike_brand.id}/${bike.image.url}`)}>
  <div class="row a-c basics">
    <img class="brand-logo table-column" src={`${serverURL}${bike.bike_brand.logo.url}`} alt=""/>
    <div class="spacer" />
    <span class="table-column">
      {bike.name}
    </span>
    <div class="spacer" />
    <span class="table-column">
      {bike.bikeType}
    </span>
    <div class="spacer" />
  </div>
  <div class="timeline">
    <TimeLine
      selectedStartPeriod={selectedStartPeriod}
      selectedEndPeriod={selectedEndPeriod}
      bikeProductionStart={bike.productionStart}
      bikeProductionEnd={bike.productionEnd}
      color={bike.bike_brand.color}
    />
  </div>
</div>

<!-- Style -->
<style lang="scss">
@import "./style/global.scss";

.bike-table-entry {
  display: flex;
  align-items: center;
  border-radius: $br-md;
  width: 100%;
  box-sizing: border-box;
  height: $font-slg;
  cursor: pointer;
	background-color: $c-background-raised;
  box-shadow: $bs-md;
  font-weight: bold;

  @media screen and (max-width: $breakpoint) {
    flex-direction: column;
    height: auto;
	}

  .basics {
    height: 100%;
    @media screen and (max-width: $breakpoint) {
      width: 100%;
      border-bottom: 2px solid $c-shaddow;
      justify-content: space-between;
	  }
  }

  .table-column {
    width: 150px;
    text-align: center;
    @media screen and (max-width: $breakpoint) {
      flex-grow: 1;
	  }
  }

  .timeline {
    flex-grow: 1;
    padding: 0 $space-sm;
    box-sizing: border-box;

    @media screen and (max-width: $breakpoint) {
      width: 100%;
      padding-top: $space-md;
      height: 50px;
	  }

  }

  .brand-logo {
    padding: $space-sm;
    box-sizing: border-box;
    height: $space-lg;
  }

  .spacer {
    height: 100%;
    border-left: 2px solid $c-shaddow;
  }
}
</style>