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

}).namespace('App/Public/Controllers')
