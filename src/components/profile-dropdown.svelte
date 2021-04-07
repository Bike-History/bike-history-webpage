<!-- Script -->
<script>
  import { user } from '../store.js';
  const logout = () => {
    user.update(() => null);
    localStorage.removeItem('user');
  }
</script>

<!-- DOM -->
<div class="profile-dropdown">
  <button class="profile-dropdown__entry" on:click={logout}>
    Logout
  </button>
</div>

<!-- Style -->
<style lang="scss">
  @import "./style/global.scss";
  .profile-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 320px;
    background-color: $c-background-raised;
    border: 2px solid darken($c-background-primary, 5);

    &__entry {
      width: 100%;
      font-size: $font-md;
    }
  }
</style>