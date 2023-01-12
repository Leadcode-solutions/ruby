import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'TestController.foo')

  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.group(() => {
      Route.get('/me', 'AuthController.me')
      Route.post('/logout', 'AuthController.logout')
    }).middleware('auth')
  }).prefix('authentication')

}).namespace('App/Public/Controllers')
  .domain('api.localhost')
