<!-- src/routes/blog/[slug].svelte -->
<script context="module">
	import { serverURL } from '../../config';

	export async function preload(page, session) {
		const { brand, bikeId } = page.params;

		try {
			const bikesRes = await this.fetch(`${serverURL}/bikes/${brand}/${bikeId}`)
			const bikeData = await bikesRes.json();
		
			return { bikeData };
		} catch (e) {
			console.log(e);
			return this.redirect(302, '/');
		}

	}
</script>

<script>
	import BikeInfo from "../../components/bike-info.svelte";

	export let bikeData;
</script>

<svelte:head>
	<title>Bike-History {bikeData.brand.name} - {bikeData.name}</title>
</svelte:head>

<BikeInfo bike={bikeData}/>