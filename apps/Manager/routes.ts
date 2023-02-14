import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'RolesController.index')
    Route.get('/:id', 'RolesController.show')

    Route.post('/create', 'RolesController.store')
    Route.put('/:id', 'RolesController.update')
    Route.delete('/:id', 'RolesController.destroy')
  }).prefix('roles')

  Route.group(() => {
    Route.group(() => {
      Route.get('/', 'BlogCategoryController.index')
      Route.get('/:id', 'BlogCategoryController.show')

      Route.post('/create', 'BlogCategoryController.store')
      Route.put('/:id', 'BlogCategoryController.update')
      Route.delete('/:id', 'BlogCategoryController.destroy')
    }).prefix('categories')

    Route.group(() => {
      Route.get('/', 'BlogArticleController.index')
      Route.get('/:id', 'BlogArticleController.show')

      Route.post('/create', 'BlogArticleController.store')
      Route.put('/:id', 'BlogArticleController.update')
      Route.delete('/:id', 'BlogArticleController.destroy')
    }).prefix('articles')
  }).prefix('blog')

  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.show')

    Route.post('/create', 'UsersController.store')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.destroy')
  }).prefix('users')

  Route.group(() => {
    Route.get('/', 'RealisationsController.index')
    Route.get('/:id', 'RealisationsController.show')

    Route.post('/create', 'RealisationsController.store')
    Route.put('/:id', 'RealisationsController.update')
    Route.delete('/:id', 'RealisationsController.destroy')
  }).prefix('realisations')
}).namespace('App/Manager/Controllers').middleware(['auth']).prefix('v1')
