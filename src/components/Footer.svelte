<!-- SCRIPT -->

<!-- DOM -->
<div class="footer">
  <a href="/imprint" class="footer__text">Imprint</a>
  <a href="https://github.com/Bike-History" class="footer__text">Maintainers Welcome!</a>
  <a href="/privacy" class="footer__text">Privacy Policy</a>
</div>

<!-- STYLE -->
<style lang="scss">
	@import "./style/global.scss";

  .footer {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 10px 20px;
    width: 100%;
    color: $c-primary-lighter;
    border-top: 1px solid darken($c-background-primary, 5);
  }
</style>