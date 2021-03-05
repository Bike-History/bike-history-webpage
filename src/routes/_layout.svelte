
<!-- SCRIPT -->
<script>
	import BikeTable from '../components/bike-table.svelte';
  import PageHeader from '../components/page-header.svelte';
</script>

<!-- DOM -->
<main class="column a-c">
	<PageHeader />
	<BikeTable />
	<slot></slot>
</main>

<!-- STYLE -->
<style lang="scss" global>
	@import "./style/global.scss";

	body {
		-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
	}
	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		top: 0;
		margin: 0 auto;
		box-sizing: border-box;
		color: $c-primary;
		background-color: $c-background-primary;
	}

	.logo {
		margin: $space-sm;
		height: $space-slg;
	}
</style>