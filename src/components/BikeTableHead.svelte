<!-- Script -->
<script>
  import RangeSlider from "svelte-range-slider-pips";
  import Select from 'svelte-select';
  import IBike from "./icons/i-bike.svelte";
  import IChevron from "./icons/i-chevron.svelte";
  import IGrid from "./icons/i-grid.svelte";
  import IList from "./icons/i-list.svelte";
  import IProduction from "./icons/i-production.svelte";
  import Switch from "./elements/Switch.svelte";
  import { view, format, Format, Views, order } from '../store.js';
  import { onDestroy } from "svelte";
  export let startPeriod;
  export let endPeriod;
  export let selectedStartPeriod;
  export let buildTimeCallback;

  const years = endPeriod - startPeriod;

  let orderData = {flag: 'name', increasing: true};
  const unsubscribeOrder = order.subscribe((value) => orderData = value);
  onDestroy(unsubscribeOrder);

  let viewData = Views.bikes;
  const unsubscribeView = view.subscribe((value) => {
    viewData = value;
    order.update(() => ({flag: 'name', increasing: true}));
  });

  $: items = viewData === Views.bikes ? [
    {value: 'brand', label: 'brand'},
    {value: 'name', label: 'name'},
    {value: 'type', label: 'type'},
    {value: 'start', label: 'release'},
    {value: 'end', label: 'last prod.'},
  ] : [
    {value: 'name', label: 'name'},
    {value: 'start', label: 'start'},
    {value: 'end', label: 'end'},
  ];

  let orderIncreasing = false;

  onDestroy(unsubscribeView);

  const setOrderIncreasing = () => {
    orderIncreasing = true;
    order.update(() => ({flag: orderData.flag, increasing: orderIncreasing}));
  }
  const setOrderDecreasing = () => {
    orderIncreasing = false;
    order.update(() => ({flag: orderData.flag, increasing: orderIncreasing}));
  }

  const orderChanged = (event) => {
    order.update(() => ({flag: event.detail.value, increasing: orderIncreasing}));
  }

  const searchInputChanged = (e) => {
    searchInput.update(() => e.target.value)
  };
</script>

<!-- DOM -->
<div class="row table-header">
  <div class="row sort">
    <div class="row select">
      <Select
        {items}
        selectedValue={orderData.flag}
        on:select={orderChanged}
        isClearable={false}
      />
      <div class="column">
        <button class={orderIncreasing ? 'flipped-v order order--active' : 'flipped-v order'} on:click={setOrderIncreasing}><IChevron /></button>
        <button class={orderIncreasing ? 'order' : 'order--active'} on:click={setOrderDecreasing}><IChevron /></button>
      </div>
    </div>
    <div class="switch-row">
      <Switch selectedCallback={(value) => {
          view.update(() => value);
        }}
        selected={view}
        leftValue={Views.bikes}
        rightValue={Views.dealers}
      >
        <IBike slot="left"/>
        <IProduction slot="right"/>
      </Switch>
  
      <Switch selectedCallback={(value) => format.update(() => value)} selected={format} leftValue={Format.table}  rightValue={Format.list}>
        <IGrid slot="left"/>
        <IList slot="right"/>
      </Switch>
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
    align-items: center;
    justify-content: space-between;

    .sort {
      width: 450px;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      padding-right: $space-md;

      @media screen and (max-width: $breakpoint) {
        flex-direction: column-reverse;
        width: 100%;
        padding-right: 0;
      }
    }

    @media screen and (max-width: $breakpoint) {
      flex-direction: column-reverse;
      align-items: flex-start;
	  }
  }

  .select-title {
    padding-left: $space-md;
    font-weight: bold;
  }

  .select {
    align-items: center;
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
    box-shadow: $bs-md;
    border-radius: $br-md;
    background-color: $c-background-raised;
  }

  .order {
    color: $c-primary-lightest;
    &--active {
      color: $c-primary;
    }
  }

  .switch-row {
    display: flex;
    width: 100%;
    justify-content: space-evenly;

    @media screen and (max-width: $breakpoint) {
      margin: $space-md;
	  }
  }

  .slider {
    margin-top: $space_lg;
    height: $space_slg;
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

    @media screen and (max-width: $breakpoint) {
      width: 100%;
	  }
  }
</style>