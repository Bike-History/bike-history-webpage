
<!-- SCRIPT -->
<script>
	import BikeTable from '../components/bike-table.svelte';
  import PageHeader from '../components/page-header.svelte';
</script>

<!-- DOM -->
<main class="column a-c">
	<slot />
	<PageHeader />
	<BikeTable />
</main>

<!-- STYLE -->
<style lang="scss" global>
	@import "./style/global.scss";

	body {
		-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
	}

	html {
		@media screen and (max-width: $breakpoint) {
    	font-size: 16px;
		}
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

		@media screen and (max-width: $breakpoint) {
    	height: auto;
  	}
	}

	.logo {
		margin: $space-sm;
		height: $space-slg;
	}
</style>