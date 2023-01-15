import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Realisation from 'Domains/Realisations/Models/Realisation'

export default class RealisationsController {
  public async index({ bouncer }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('view')
    return Realisation.query()
  }

  public async show({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('view')
    return Realisation.query()
      .where('slug', params.id)
      .first()
  }

  public async store({ bouncer }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('store')
  }

  public async update({ bouncer }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('update')
  }

  public async destroy({ bouncer }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('destroy')
  }
}
