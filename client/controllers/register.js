Template.build.events({
  'click .select': (e) => {
    $target = $(e.target)
    $('.selected').removeClass('selected').addClass('tertiary')
    $target.removeClass('tertiary').addClass('selected');
  }
})

// Template.user_simple_vote.events
//   'click .option': (e) ->
//     $target = $(e.target)
//     value = $target.data 'value'
//     SimplePick.add UserId, value, SimpleVote.get()._id
//     $('.selected').removeClass 'selected'
//     $target.addClass 'selected'
