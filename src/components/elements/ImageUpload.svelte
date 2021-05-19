<!-- SCRIPT -->
<script>
  import { serverURL } from '../../config';
  import { user } from '../../store';
  import { createEventDispatcher } from 'svelte';

  export let currentImage;

  let imageHover = false;

  let userData = null;
  const unsubscribe = user.subscribe((value) => {
    userData = value;
  });

  const dispatch = createEventDispatcher();
  let uploading = false;

  const loadFile = () => {
    document.getElementById('fileUpload').addEventListener('change', uploadImage);
    document.getElementById('fileUpload').click();
  }

  const uploadImage = (event) => {
    uploading = true;
    document.getElementById('fileUpload').removeEventListener('change', uploadImage);
    // Upload Image
    const formElement = document.getElementById('uploadForm');
		const formData = new FormData(formElement);
    const fetchOptions = {
		  method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${userData.jwt}`,
      },
      body: formData,
    };

	  fetch(`${serverURL}/upload`, fetchOptions).then((response) => 
      response.json()
    ).then((responseData) => {
      dispatch('change', responseData);
      uploading = false;
    }).catch((error) => {
      console.error(error);
      uploading = false;
    });
  }
</script>

<!-- DOM -->
<form id="uploadForm">
  <input type="file" name="files" id="fileUpload" style="display:none">
</form>
{#if currentImage}
  <img
    class="image"
    src={currentImage ? `${serverURL}${currentImage.url}` : ''}
    on:mouseenter={() => imageHover = true}
  />
  {#if uploading}
    <div class="image__overlay">
      <span>Uploading</span>
    </div>
  {:else if imageHover}
    <div class="image__overlay" on:click={loadFile} on:mouseleave={() => imageHover = false}>
      <span>Edit-Image</span>
    </div>
  {/if}
{:else}
  <div class="image__overlay" on:click={loadFile}>
      <span>Add Image</span>
      <span>+</span>
  </div>
{/if}


<!-- STYLE -->
<style lang="scss">
	@import "./style/global.scss";

  .image {
    height: 100%;
    width: 100%;
    border-radius: $br-md;
    object-fit: contain;
  }
  .image__overlay {
    display: flex;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: $font-lg;
    color: white;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: $br-md;
    background-color: rgba(black,0.3);
  }
</style>