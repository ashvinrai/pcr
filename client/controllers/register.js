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

Template.dashboard.helpers({
  shareableLink() {
    var user = Meteor.user()
    if (!(typeof user.profile.shareId == 'string')) {
      var shareId = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
      Meteor.users.update(Meteor.userId(),
        {
        '$set': {
          'profile.shareId': shareId
        }
      });

    }
    return Meteor.absoluteUrl('c/' + Meteor.user().profile.shareId);
  },
  contributions() {
    return Contributions.find({shareId: Meteor.user().profile.shareId});
  },
  collected() {
    var total = 0;
    Contributions.find({shareId: Meteor.user().profile.shareId}).forEach((contribution) => {
      total += contribution.amount;
    })
    return total;
  },
  progressBarWidth() {
    var total = 0;
    Contributions.find({shareId: Meteor.user().profile.shareId}).forEach((contribution) => {
      total += contribution.amount;
    })
    var a = total/parseFloat(Meteor.user().profile.build.cost)*100;
    console.log(a + '%')
    return a + '%'
  },
  fullyFunded() {
    var total = 0;
    Contributions.find({shareId: Meteor.user().profile.shareId}).forEach((contribution) => {
      total += contribution.amount;
    })
    return total >= parseFloat(Meteor.user().profile.build.cost)
  }
})

Template.contribute.events({
  'click #submit-payment': () => {
    Stripe.setPublishableKey('pk_test_1nIlBMwLLFerk5aZeNtqEdrl');
    var name = $("#name").val();
    var cardNum = $("#card-num").val();
    var cvc = $("#cvc").val();
    var expMonth = $("#exp-month").val();
    var expYear = $("#exp-year").val();
    var amount = parseFloat($("#amount").val());
    console.log(amount);
    Stripe.card.createToken({
      number: cardNum,
      cvc: cvc,
      exp_month: expMonth,
      exp_year: expYear
    }, function(status, response) {
      stripeToken = response.id;
      console.log(status, response)
      Meteor.call('chargeCard', stripeToken, {amount: amount*100, shareId: Meteor.user().profile.shareId, name: name});
    })
  }
})