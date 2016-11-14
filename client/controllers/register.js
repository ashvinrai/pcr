Template.select_build.helpers({
  builds: () => {
    return Builds.find({}).fetch()
  }
})

// This is not how build selection will eventually work.
// We'll use reactive variables when the builds are dynamic.
Template.build.events({
  'click .select': (e) => {
    $target = $(e.target)
    $('.selected').removeClass('selected').addClass('tertiary')
    $target.removeClass('tertiary').addClass('selected');
  }
})

Template.current_build.helpers({
  builds: function() {
    user = Accounts.user();
    if (!user.build) {
      user.build = Builds.findOne({})._id;
    }
    Accounts.users.insert(user);
    console.log(user);
    return Builds.find(user.build);
  }
})