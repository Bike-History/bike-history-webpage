
<!-- SCRIPT -->
<script>
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { user, brands } from '../store.js';
	import { serverURL } from '../config';
	import BikeTable from '../components/bike-table.svelte';
  import PageHeader from '../components/page-header.svelte';

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);

		const accessToken = params.get("access_token");
		const localStorageValue =  localStorage.getItem('user');

		if (accessToken) {
			fetch(`${serverURL}/auth/github/callback/?access_token=${accessToken}`)
				.then((rawData) => rawData.json())
				.then((data) => {
					localStorage.setItem('user', JSON.stringify(data));
					user.update(() => data);
					goto('/');
				})
		} else if (localStorageValue) {
			user.update(() => JSON.parse(localStorageValue));
		}

		fetch(`${serverURL}/bike-brands`).then((brandsResponse) => 
			brandsResponse.json()
    ).then((data) => {
			brands.update(() => data);
    });
	});
</script>

<!-- DOM -->
<svelte:head>
	<title>Bike-History</title>
</svelte:head>

<main class="column a-c">
	<PageHeader />
	<BikeTable />
	<slot />
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