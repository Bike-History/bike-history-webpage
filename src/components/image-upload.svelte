<!-- SCRIPT -->
<script>
  import { serverURL } from '../config';
  import { user } from '../store';
  import { createEventDispatcher } from 'svelte';

  export let currentImage;

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
<img src={`${serverURL}${currentImage}`} />
<div class="image__overlay" on:click={loadFile}>
  <form id="uploadForm">
    <input type="file" name="files" id="fileUpload" style="display:none">
  </form>
  {#if uploading}
    <span>Uploading</span>
  {:else}
    <span>Add Image</span>
    <span>+</span>
  {/if}
</div>

<!-- STYLE -->
<style lang="scss">
	@import "./style/global.scss";

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
    background-color: rgba(black,0.1);
  }
</style>