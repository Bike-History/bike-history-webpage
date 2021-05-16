<!-- Script -->
<script>
  import BikeTableEntry from "./BikeTableEntry.svelte";
  import TableHeadEntry from "./BikeTableHead.svelte";
  import { onMount, onDestroy } from "svelte";
  import moment from 'moment';
  import { serverURL } from '../config';
  import { format, Format, searchInput, bikes, leaderboard } from '../store';
  import BikeGridEntry from "./BikeGridEntry.svelte";

  let bikeData = [];
  let processedData = [];
  let startPeriod = 1870;
  let endPeriod = moment().year();

  let selectedStartPeriod = 1950;
  let selectedEndPeriod = endPeriod;

  let orderItem = 'name';
  let increasing = true;
  let selectedFormat = Format.table;

  const changeOrder = (orderItem, increasing) => {
    orderItem = orderItem;
    increasing = increasing;
    if (orderItem === 'name' || orderItem === 'type') {
      processedData = processedData.sort((a, b) => {
        return increasing
          ? a[orderItem].localeCompare(b[orderItem])
          : b[orderItem].localeCompare(a[orderItem])
      });
    } else if (orderItem === 'start' || orderItem === 'end') {
      processedData = processedData.sort((a, b) => {
        return increasing
          ? a[orderItem] > b[orderItem]
          : a[orderItem] < b[orderItem]
      });
    } else if (orderItem === 'brand') {
      processedData = processedData.sort((a, b) => {
        return increasing
          ? a.brand.name.localeCompare(b.brand.name)
          : b.brand.name.localeCompare(a.brand.name)
      });
    }
  }

  const updatePeriod = (e) =>{
    selectedStartPeriod = e.detail.values[0];
    selectedEndPeriod = e.detail.values[1];

    processedData = bikeData.filter((bike) => !(
      moment(bike.productionEnd).year() < selectedStartPeriod ||
      moment(bike.productionStart).year() > selectedEndPeriod
    ));
    changeOrder(orderItem, increasing);
  }

  const unsubscribeBikes = bikes.subscribe((value) => {
    bikeData = value;
    updatePeriod({detail: { values: [selectedStartPeriod, selectedEndPeriod]}});
  });
  onDestroy(unsubscribeBikes);

  searchInput.subscribe((value) => {
    updatePeriod({detail: { values: [selectedStartPeriod, selectedEndPeriod]}});
    if (value) {
      processedData = processedData.filter(
        (bike) => JSON.stringify(bike).toLowerCase().split(value.toLowerCase()).length - 1 > 0,
      );
    }
	});

  format.subscribe((value) => {
    selectedFormat = value;
	});
</script>

<!-- DOM -->
<div class="column bike-table">
  <div>
    <TableHeadEntry
      startPeriod={startPeriod}
      endPeriod={endPeriod}
      selectedStartPeriod={selectedStartPeriod}
      buildTimeCallback={updatePeriod}
      orderCallback={changeOrder}
    />
  </div>
  {#if selectedFormat === Format.list}
    <ul class="bike-table__list">
      {#each processedData as bike (bike.id)}
        <li class="bike-table__entry">
          <BikeTableEntry
            bike={bike}
            selectedStartPeriod={selectedStartPeriod}
            selectedEndPeriod={selectedEndPeriod}
          />
        </li>
      {/each}
    </ul>
  {:else}
    <div class="bike-table__grid">
      {#each processedData as bike (bike.id)}
        {#if bike.bike_brand && bike.images.length > 0}
          <div class="bike-table__grid__element">
            <BikeGridEntry
              bike={bike}
            />
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<!-- Style -->
<style lang="scss">
@import "./style/global.scss";
.bike-table {
  width: 100%;
  padding: 0 30px;
  margin-top: $space_lg;
  box-sizing: border-box;
	flex-shrink: 1;
  flex-grow: 1;
  overflow: hidden;

  @media screen and (max-width: $breakpoint) {
    overflow: visible;
  }

  &__list {
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }

    @media screen and (max-width: $breakpoint) {
      overflow-y: auto;
    }
  }

  &__entry {
    margin: $space_sm 0;
  }
  &__grid {
    flex-grow: 1;
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px,auto));

    &__element {
      display: flex;
      justify-content: center;
    }
    @media screen and (max-width: $breakpoint) {
      overflow-y: auto;
    }
  }
}
</style>