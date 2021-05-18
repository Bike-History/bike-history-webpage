<!-- src/routes/blog/[slug].svelte -->
<script context="module">
	import { serverURL } from '../../config';

	export async function preload(page, session) {
		const { brand } = page.params;

		try {
			const brandRes = await this.fetch(`${serverURL}/bike-brands/${brand}`)
			const brandData = await brandRes.json();
		
			return { brandData };
		} catch (e) {
			return this.redirect(302, '/');
		}
	}
</script>

<script>
	import BrandInfoOverlay from '../../components/BrandInfoOverlay.svelte';

	export let brandData;
</script>

<svelte:head>
	<title>Bike-History {brandData.title}</title>
</svelte:head>

<BrandInfoOverlay brand={brandData}/>