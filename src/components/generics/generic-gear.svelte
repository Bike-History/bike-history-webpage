<!-- Script -->
<script>
  export let generics;
</script>
<!-- DOM -->

<div class="circle">
  {generics.gears}
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