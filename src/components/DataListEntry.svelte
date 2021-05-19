<!-- Script -->
<script>
  import { goto } from '@sapper/app';
  import { serverURL } from "../config";
  import TimeLine from "./TimeLine.svelte";

  export let selectedStartPeriod;
  export let selectedEndPeriod;
  export let data;

  $: brand = data.bike_brand ? data.bike_brand : data;
</script>

<!-- DOM -->
<div
  class="data-table-entry"
  on:click={() => data.bike_brand ? goto(`/${data.bike_brand.id}/${data.id}`) : goto(`/${data.id}`)}
>
  <div class="row a-c basics">
    <img
      class="brand-logo table-column"
      src={`${serverURL}${brand.logo.url}`}
      alt={`Logo of ${data.bike_brand ? brand.name : brand.title}`}
    />
    <div class="spacer" />
    <span class="table-column">
      {data.bike_brand ? data.name : data.title}
    </span>
    <div class="spacer" />
    <span class="table-column">
      {data.bike_brand ? data.bikeType : data.origin}
    </span>
    <div class="spacer" />
  </div>
  <div class="timeline">
    <TimeLine
      selectedStartPeriod={selectedStartPeriod}
      selectedEndPeriod={selectedEndPeriod}
      bikeProductionStart={data.bike_brand ? data.productionStart : data.startDate}
      bikeProductionEnd={data.bike_brand ? data.productionEnd : data.endDate}
      color={brand.color}
    />
  </div>
</div>

<!-- Style -->
<style lang="scss">
@import "./style/global.scss";

.data-table-entry {
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