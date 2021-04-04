<!-- Script -->
<script>
  export let bike;
</script>
<!-- DOM -->

<div class="circle">
  {bike.gears}
</div>

<!-- Style -->
<style lang="scss">
	@import "./style/global.scss";
  .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $space-lg;
    width: $space-lg;
    padding: $space-sm;
    box-sizing: border-box;
    border-radius: 50%;
    margin: $space-sm;
    color: white;
    background-color: #bbbbbb;
  }
</style>