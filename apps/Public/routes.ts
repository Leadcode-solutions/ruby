import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TestController.foo')

  Route.group(() => {
    Route.group(() => {
      Route.post('/', 'AuthController.login')

      Route.get('/:provider', 'SocialAuthController.redirect').as('social-login')
      Route.get('/:provider/callback', 'SocialAuthController.callback')
    }).prefix('login')

    Route.group(() => {
      Route.get('/me', 'AuthController.me')
      Route.post('/logout', 'AuthController.logout')
    }).middleware('auth:api')
  }).prefix('authentication')


  Route.group(() => {
    Route.get('/', 'AuthController.login')
    Route.get('/user/:id', 'AuthController.login')
    Route.get('/etiquette/:id', 'AuthController.login')
    Route.get('/:id', 'AuthController.login')
    Route.post('/create', 'AuthController.login')
    Route.put('/:id', 'AuthController.login')
    Route.delete('/:id', 'AuthController.login')
  }).prefix('questions')

  Route.group(() => {
    Route.get('/', 'AuthController.login')
    Route.get('/:id', 'AuthController.login')
    Route.post('/create', 'AuthController.login')
    Route.put('/:id', 'AuthController.login')
    Route.delete('/:id', 'AuthController.login')
  }).prefix('etiquettes')

}).namespace('App/Public/Controllers')
