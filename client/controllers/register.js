// This is not how build selection will eventually work.
// We'll use reactive variables when the builds are dynamic.
Template.build.events({
  'click .select': (e) => {
    $target = $(e.target)
    $('.selected').removeClass('selected').addClass('tertiary')
    $target.removeClass('tertiary').addClass('selected');
  }
})
