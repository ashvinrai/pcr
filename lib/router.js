Router.route('/', function() {
  this.render('home');
});

AccountsTemplates.configureRoute('signUp', {
  name: 'signup',
  path: '/signup',
  template: 'register',
  redirect: '/dashboard'
})

// This needs to be handled differently,
// So that logged-in users arrive here
// automatically. The solution will have
// something to do with the AccountsTemplates
// API, like the signup page.
Router.route('/dashboard', function() {
  this.render('dashboard');
});
