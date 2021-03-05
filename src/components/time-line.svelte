<script>
  import moment from 'moment';

  export let selectedStartPeriod;
  export let selectedEndPeriod;

  export let bikeProductionStart;
  export let bikeProductionEnd;
  export let color;

  let shownPeriod;
  let prodPeriod;
  let productionStartOffset;
  let productionEndOffset;
  let productionLenght;
  let visible = true;
  $: {
    let selectedStartPeriodUnix = moment([selectedStartPeriod, 1, 1]).valueOf();
    let selectedEndPeriodUnix = moment([selectedEndPeriod, 1, 1]).valueOf();

    let bikeProductionEndUnix = selectedEndPeriodUnix < bikeProductionEnd ? selectedEndPeriodUnix: bikeProductionEnd;
    let bikeProductionStartUnix = bikeProductionStart > selectedStartPeriodUnix ? bikeProductionStart : selectedStartPeriodUnix;
    shownPeriod = (selectedEndPeriodUnix - selectedStartPeriodUnix)
    prodPeriod = (bikeProductionEndUnix - bikeProductionStartUnix)
    productionStartOffset = ((bikeProductionStartUnix - selectedStartPeriodUnix) / shownPeriod) * 100;
    productionEndOffset = ((bikeProductionEndUnix - selectedStartPeriodUnix) / shownPeriod) * 100;
    productionLenght = (prodPeriod / shownPeriod) * 100;

    visible = true; 
    if (selectedEndPeriodUnix < bikeProductionStartUnix) {
      visible = false; 
    }
  }
</script>


<div class="timeline">
  {#each Array(selectedEndPeriod-selectedStartPeriod) as year}
  <div class="year"/>
  {/each}
  {#if visible}
  <span class="production__start" style={`left: ${productionStartOffset}%`}>{moment(bikeProductionStart).format('YYYY')}</span>
  <div class="production" style={`left: ${productionStartOffset}%; width: ${productionLenght}%; background-color: ${color};`}/>
  <span class="production__end" style={`left: ${productionEndOffset}%`}>{moment(bikeProductionEnd).format('YYYY')}</span>
  {/if}
</div>



<style lang="scss">
@import "./style/global.scss";
  .timeline {
    position: relative;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    .year {
      flex-grow: 1;
      height: 2px;
      margin: $space-sm 0;
      border-left: 2px solid $c-primary-lightest;
    }

    .production {
      position: absolute;
      height: $space-md;
      left: 0;
      border-radius: $br_md;
      border: 3px solid $c-primary;
      box-shadow: $bs-md;
      box-sizing: border-box;

      &__start {
        position: absolute;
        top: -$font-sm;
        font-size: $font-ssm;
        margin-left: -8px;
      }

      &__end {
        position: absolute;
        bottom: -$font-sm;
        font-size: $font-ssm;
        margin-left: -20px;
      }
    }
  }
</style>
