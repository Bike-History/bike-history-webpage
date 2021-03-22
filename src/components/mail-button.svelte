<!-- Script -->
<script>
  const subject = 'Bike Submission [Bike-Name]';
  const message = 'Thank you for submitting a new bike entry for the Bike-History!'
    +'%0D%0A Please provide following information:'
    +'%0D%0A'
    +'%0D%0A ---------------BASICS----------------'
    +'%0D%0A'
    +'%0D%0A Bike'
    +'%0D%0A [Insert bike name here]'
    +'%0D%0A Brand'
    +'%0D%0A [Insert brand name here]'
    +'%0D%0A Production start'
    +'%0D%0A [Insert production start date here]'
    +'%0D%0A Production end'
    +'%0D%0A [Insert production end date here]'
    +'%0D%0A'
    +'%0D%0A ---------------Story-----------------'
    +'%0D%0A -------------------------------------'
    +'%0D%0A [Insert the bikes story here]'
    +'%0D%0A'
    +'%0D%0A -------------------------------------'
    +'%0D%0A -------------Properties--------------'
    +'%0D%0A -------------------------------------'
    +'%0D%0A Bike image'
    +'%0D%0A [Please attach an image of the bike to this mail]'
    +'%0D%0A Bike Colors'
    +'%0D%0A [Insert color variations list]'
    +'%0D%0A'
    +'%0D%0A -------------------------------------'
    +'%0D%0A -------------Specs--------------'
    +'%0D%0A -------------------------------------'
    +'%0D%0A Break'
    +'%0D%0A [Insert break type here]'
    +'%0D%0A tire'
    +'%0D%0A [Insert tire type here]'
    +'%0D%0A weight'
    +'%0D%0A [Insert weight type here]'
    +'%0D%0A price'
    +'%0D%0A [Insert price type here]'
    +'%0D%0A production place'
    +'%0D%0A [Insert production place here]'
    +'%0D%0A Motor?'
    +'%0D%0A [Insert motor type here]'
    +'%0D%0A Battery?'
    +'%0D%0A [Insert battery type here]'
    +'%0D%0A Gear?'
    +'%0D%0A [Insert gear type here]'
    +'%0D%0A Range?'
    +'%0D%0A [Insert range here]'
    +'%0D%0A CargoVolume?'
    +'%0D%0A [Insert cargo volume here]'
    +'%0D%0A Other'
    +'%0D%0A [Insert other Information here]';
</script>

<!-- DOM -->
<a class="contribute" href={`mailto:contribute@bike-history.com?subject=${subject}&body=${message}`}>
  Contribute
</a>

<!-- Style -->
<style lang="scss">
	@import "./style/global.scss";
  a.contribute {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-md;
    font-weight: bold;
    padding: $space-sm $space-sm;
    height: $font-lg;
    border-radius: $br-md;
    color: $c-primary-lightest;
    border: 1px solid $c-shaddow;


    @media screen and (max-width: $breakpoint) {
      margin: $space-sm;
    }
  }
</style>