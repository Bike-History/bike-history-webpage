<!-- Script -->
<script>
  import RangeSlider from "svelte-range-slider-pips";
  import Select from 'svelte-select';
  import IChevron from "./icons/i-chevron.svelte";
  export let startPeriod;
  export let endPeriod;
  export let selectedStartPeriod;
  export let buildTimeCallback;
  export let orderCallback

  const years = endPeriod - startPeriod;

  const items = [
    {value: 'brand', label: 'brand'},
    {value: 'name', label: 'name'},
    {value: 'type', label: 'type'},
    {value: 'start', label: 'release'},
    {value: 'end', label: 'last prod.'},
  ]

  let selectedValue = {value: 'name', label: 'name'};
  let orderIncreasing = false;

  const setOrderIncreasing = () => {
    orderIncreasing = true;
    orderCallback(selectedValue.value, orderIncreasing);
  }
  const setOrderDecreasing = () => {
    orderIncreasing = false;
    orderCallback(selectedValue.value, orderIncreasing);
  }

  const orderChanged = (event) => {
    selectedValue = event.detail;
    orderCallback(selectedValue.value, orderIncreasing);
  }
</script>

<!-- DOM -->
<div class="row table-header">
  <div class="sort">
   
    <div class="row select">
      <div class="select__box">
        <span class="select-title">
          sort by
        </span>
        <Select
          {items}
          {selectedValue}
          on:select={orderChanged}
          isClearable={false}
        />
      </div>
      <div class="column">
        <button class={orderIncreasing ? 'flipped-v order order--active' : 'flipped-v order'} on:click={setOrderIncreasing}><IChevron /></button>
        <button class={orderIncreasing ? 'order' : 'order--active'} on:click={setOrderDecreasing}><IChevron /></button>
      </div>
    </div>
  </div>
  <div class="slider">
    <RangeSlider
      min={startPeriod}
      max={endPeriod}
      values={[selectedStartPeriod, endPeriod]}
      step={1}
      pips
      pipstep={10}
      range="true"
      float="true"
      last='label'
      first='label'
      on:change={buildTimeCallback}
    />
  </div>
</div>

<!-- Style -->

<style lang="scss">
	@import "./style/global.scss";

  .table-header {
    align-items: flex-end;

    .sort {
      width: 450px;
    }
  }

  .select-title {
    padding-left: $space-md;
    font-weight: bold;
  }

  .select {
    align-items: flex-end;
    --border: 2px solid transparent;
    --borderHoverColor: transparent;
    --borderFocusColor: transparent;
    --borderRadius: 0px;
    --borderRadius: 10px;
    --itemActiveBackground: #454545;
    --itemHoverBG: #ececec;
    --itemIsActiveBG: #454545;
    --inputPadding: 0px;
    font-size: $font-sm;
    width: 150px;

    &__box {
      flex-grow: 1;
    }
  }

  .order {
    color: $c-primary-lightest;
    &--active {
      color: $c-primary;
    }
  }

  .slider {
    margin-top: $space_lg;
    flex-grow: 1;
    --range-slider:          #d7dada; /* slider main background color */
    // --range-handle-inactive: #99a2a2; /* inactive handle color */
    --range-handle-inactive: #454545;
    --range-handle:          #454545;/* non-focussed handle color */
    --range-handle-focus:    #454545; /* focussed handle color */
    --range-handle-border:   var(--range-handle);
    --range-range-inactive:  var(--range-handle-inactive); /* inactive range bar background color */
    --range-range:           var(--range-handle-focus); /* active range bar background color */
    --range-float-inactive:  var(--range-handle-inactive); /* inactive floating label background color */
    --range-float:           var(--range-handle-focus); /* floating label background color */
    --range-float-text:      white;
  }
</style>