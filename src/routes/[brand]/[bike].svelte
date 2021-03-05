<!-- src/routes/blog/[slug].svelte -->
<script context="module">
	import { serverURL } from '../../config';
	// the (optional) preload function takes a
	// `{ path, params, query }` object and turns it into
	// the data we need to render the page
	export async function preload(page, session) {
		// the `slug` parameter is available because this file
		// is called [slug].svelte
		const { brand, bike } = page.params;

		// `this.fetch` is a wrapper around `fetch` that allows
		// you to make credentialled requests on both
		// server and client
		// const res = await this.fetch(`blog/${slug}.json`);
		// const article = await res.json();

		const bikesRes = await this.fetch(`${serverURL}/bikes/${brand}/${bike}`)
		const bikeData = await bikesRes.json();
		console.log(bikeData)
	
		return {bikeData };
	}
</script>

<script>
import BikeInfo from "../../components/bike-info.svelte";

	export let bikeData;
</script>

<svelte:head>
	<title>{bikeData.name}</title>
</svelte:head>

<BikeInfo bike={bikeData}/>