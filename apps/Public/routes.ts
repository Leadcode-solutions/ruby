import Route from '@ioc:Adonis/Core/Route'
import pkg from '../../package.json'

Route.group(() => {

  Route.get('/', () => ({
    uptime: process.uptime(),
    version: pkg.version,
  }))

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
}).namespace('App/Public/Controllers').prefix('v1')
