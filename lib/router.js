Router.route('/', function() {
  if (Accounts.user()) {
    Router.go('/dashboard');
  } else {
    this.render('home');    
  }
});

AccountsTemplates.configureRoute('signUp', {
  name: 'signup',
  path: '/signup',
  redirect: '/dashboard'
})

Router.route('/dashboard', function() {
  if (!Accounts.user()) {
    Router.go('/');
  } else {
    this.render('dashboard');    
  }
});

Router.route('/select_build', function() {
  if (!Accounts.user()) {
    console.log('redirected /select_build', Accounts.user())
    Router.go('/');
  } else {
    this.render('select_build');    
  }  
})