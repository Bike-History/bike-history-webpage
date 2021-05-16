<!-- Script -->
<script>
  export let selectedCallback;
  export let selected;
  export let leftValue;
  export let rightValue;

  let switchValue = '';

  selected.subscribe((value) => {
    switchValue = value;
	});
</script>


<!-- DOM -->

<div class="container">
  <button class={switchValue === leftValue ? 'switch switch--left switch--selected' : 'switch switch--left'} on:click={() => selectedCallback(leftValue)}>
    <slot name="left" />
  </button>
  <button class={switchValue === rightValue ? 'switch switch--right switch--selected' : 'switch switch--right'} on:click={() => selectedCallback(rightValue)}>
    <slot name="right" />
  </button>
</div>


<!-- Style -->
<style lang="scss">
	@import "./style/global.scss";

  .container {
    border-radius: $br-md;
    box-shadow: $bs-md;
    height: fit-content;
  }

  .switch {
    background-color: $c-background-raised;
    padding: $space-sm $space-md;


    &--left {
      border-top-left-radius: $br-md;
      border-bottom-left-radius: $br-md;
      margin-right: 0;
    }

    &--right {
      border-top-right-radius: $br-md;
      border-bottom-right-radius: $br-md;
      margin-left: 0;
    }

    &--selected {
      background-color: $c-background-primary;
    }
  }
</style>