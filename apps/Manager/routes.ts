import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'RealisationsController.index')
    Route.get('/:id', 'RealisationsController.show')

    Route.post('/create', 'RealisationsController.store')
    Route.put('/:id', 'RealisationsController.update')
    Route.delete('/:id', 'RealisationsController.destroy')
  }).prefix('realisations')
}).namespace('App/Manager/Controllers')
