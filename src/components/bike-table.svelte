<!-- Script -->
<script>
  import BikeTableEntry from "./bike-table-entry.svelte";
  import TableHeadEntry from "./table-head-entry.svelte";
  import { onMount } from "svelte";
  import moment from 'moment';
  import { serverURL } from '../config';
  import { searchInput } from "../store";

  let bikeData = [];
  let processedData = [];
  let startPeriod = 1870;
  let endPeriod = moment().year();

  let selectedStartPeriod = 1950;
  let selectedEndPeriod = endPeriod;

  let orderItem = 'name';
  let increasing = true;

  onMount(async () => {
    const brandsRes = await fetch(`${serverURL}/brands`);
    const brands = (await brandsRes.json());

    brands.forEach((brand) => {
      fetch(`${serverURL}/bikes/${brand}`).then((bikesRes) => 
        bikesRes.json()
      ).then((data) => {
        bikeData = [...bikeData, ...data];
        updatePeriod({detail: { values: [selectedStartPeriod, selectedEndPeriod]}});
      });
    });
  });

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
      moment(bike.end).year() < selectedStartPeriod ||
      moment(bike.start).year() > selectedEndPeriod
    ));
    changeOrder(orderItem, increasing);
  }

  searchInput.subscribe((value) => {
    updatePeriod({detail: { values: [selectedStartPeriod, selectedEndPeriod]}});
    if (value) {
      processedData = processedData.filter(
        (bike) => JSON.stringify(bike).toLowerCase().split(value.toLowerCase()).length - 1 > 0,
      );
    }
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
  <ul class="bike-table__list">
    {#each processedData as bike}
      <li class="bike-table__entry">
        <BikeTableEntry
          bike={bike}
          selectedStartPeriod={selectedStartPeriod}
          selectedEndPeriod={selectedEndPeriod}
        />
      </li>
    {/each}
  </ul>
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

  &__list {
    overflow-y: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__entry {
    margin: $space_sm 0;
  }
}
</style>