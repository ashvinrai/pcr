Template.select_build.helpers({
  builds: () => {
    return Builds.find({}).fetch()
  }
})

Template.build.events({
  'click .select': (e, i) => {
    $target = $(e.target)
    buildId = $target.data('buildId');
    user = Meteor.user();
    Meteor.users.update(Meteor.userId(),
      {
      '$set': {
        'profile.build': Builds.findOne(buildId)
      }
    });
    Router.go('/dashboard');
  }
})

Template.current_build.helpers({
  builds: function() {
    user = Meteor.user();
    if (!(user.profile && user.profile.build)) {
      Router.go('/select_build');
      return false;
    } else {
      return [user.profile.build];
    }
  }
})