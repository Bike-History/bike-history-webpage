<!-- Script -->
<script>
  import DataListEntry from './DataListEntry.svelte';
  import TableHeadEntry from './BikeTableHead.svelte';
  import { onDestroy } from 'svelte';
  import moment from 'moment';
  import { format, Format, searchInput, bikes, order, view, Views, brands } from '../store';
  import BikeGridEntry from './BikeGridEntry.svelte';
  import BrandGridEntry from './BrandGridEntry.svelte';

  let viewData = Views.bikes;
  let bikeData = [];
  let brandData = [];
  let processedData = [];
  let startPeriod = 1870;
  let endPeriod = moment().year();

  let selectedStartPeriod = 1950;
  let selectedEndPeriod = endPeriod;

  let selectedFormat = Format.table;

  const updateOrder = (orderItem) => {
    if (orderItem) {
      if (orderItem.flag === 'name' || orderItem.flag === 'type') {
        processedData = processedData.sort((a, b) => {
          return orderItem.increasing
            ? a[orderItem.flag].localeCompare(b[orderItem.flag])
            : b[orderItem.flag].localeCompare(a[orderItem.flag])
        });
      } else if (orderItem.flag === 'start' || orderItem.flag === 'end') {
        processedData = processedData.sort((a, b) => {
          return orderItem.increasing
            ? a[orderItem.flag] > b[orderItem.flag]
            : a[orderItem.flag] < b[orderItem.flag]
        });
      } else if (orderItem.flag === 'brand') {
        processedData = processedData.sort((a, b) => {
          return orderItem.increasing
            ? a.brand.name.localeCompare(b.brand.name)
            : b.brand.name.localeCompare(a.brand.name)
        });
      }
    }
  }
  const unsubscribeOrder = order.subscribe(updateOrder);

  const updatePeriod = (e) =>{
    selectedStartPeriod = e.detail.values[0];
    selectedEndPeriod = e.detail.values[1];

    if (viewData === Views.bikes) {
      processedData = bikeData.filter((bike) => !(
        moment(bike.productionEnd).year() < selectedStartPeriod ||
        moment(bike.productionStart).year() > selectedEndPeriod
      ));
    } else {
      processedData = brandData.filter((brand) => !(
        moment(brand.endDate).year() < selectedStartPeriod ||
        moment(brand.startDate).year() > selectedEndPeriod
      ));
    }
    // updateOrder(orderItem, increasing);
  }

 
  const unsubscribeView = view.subscribe((value) => {
    viewData = value;
    updatePeriod({detail: { values: [selectedStartPeriod, selectedEndPeriod]}});
  });
  const unsubscribeBikes = bikes.subscribe((value) => {
    bikeData = value;
    updatePeriod({detail: { values: [selectedStartPeriod, selectedEndPeriod]}});
  });
  const unsubscribeBrands = brands.subscribe((value) => {
    brandData = value;
    updatePeriod({detail: { values: [selectedStartPeriod, selectedEndPeriod]}});
  });
  onDestroy(unsubscribeBikes);
  onDestroy(unsubscribeOrder);
  onDestroy(unsubscribeView);
  onDestroy(unsubscribeBrands);

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
    />
  </div>
  {#if selectedFormat === Format.list}
    <ul class="bike-table__list">
      {#each processedData as dataEntry (dataEntry.id)}
        <li class="bike-table__entry">
            <DataListEntry
              data={dataEntry}
              selectedStartPeriod={selectedStartPeriod}
              selectedEndPeriod={selectedEndPeriod}
            />
        </li>
      {/each}
    </ul>
  {:else}
    <div class="bike-table__grid">
      {#each processedData as dataEntry (dataEntry.id)}
        {#if viewData === Views.bikes}
          {#if dataEntry.bike_brand && dataEntry.images.length > 0}
            <div class="bike-table__grid__element">
                <BikeGridEntry
                  bike={dataEntry}
                />
            </div>
          {/if}
        {:else if viewData === Views.dealers}
          <div class="bike-table__grid__element">
            <BrandGridEntry
              brand={dataEntry}
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
  padding: 0 $space-md;
  margin-top: $space-lg;
  box-sizing: border-box;
	flex-shrink: 1;
  flex-grow: 1;
  overflow: hidden;

  @media screen and (max-width: $breakpoint) {
    overflow: visible;
    padding: 0 $space-sm;
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
      grid-template-columns: repeat(auto-fill, minmax(310px,auto));
    }
  }
}
</style>
