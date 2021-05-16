<!-- src/routes/blog/[slug].svelte -->
<script context="module">
	import { serverURL } from '../../config';

	export async function preload(page, session) {
		const { brand, bikeId } = page.params;

		try {
			const bikesRes = await this.fetch(`${serverURL}/bikes/${bikeId}`)
			const bikeData = await bikesRes.json();
		
			return { bikeData };
		} catch (e) {
			return this.redirect(302, '/');
		}
	}
</script>

<script>
	import BikeInfoOverlay from '../../components/BikeInfoOverlay.svelte';

	export let bikeData;
</script>

<svelte:head>
	<title>Bike-History {bikeData.bike_brand.name} - {bikeData.name}</title>
</svelte:head>

<BikeInfoOverlay bike={bikeData}/>