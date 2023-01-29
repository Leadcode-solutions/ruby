import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Realisation from 'Domains/Realisations/Models/Realisation'
import { RealisationStoreValidator, RealisationUpdateValidator } from 'App/Manager/Validators/RealisationValidator'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentLite'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Image from 'Domains/Shared/Models/Image'

export default class RealisationsController {
  /**
   * Retrieve all the realisations from the Realisation model
   * @param bouncer
   */
  public async index({ bouncer }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('view')
    return Realisation.query()
  }

  /**
   * From a slug retrieve a Realisation
   * @param params
   * @param bouncer
   */
  public async show({ params, bouncer }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('view')
    return Realisation.query()
      .where('slug', params.id)
      .first()
  }

  /**
   * Create a realization with the base :
   * - Label
   * - Description
   * - Thumbnail
   * @param bouncer
   * @param request
   * @param response
   */
  public async store({ bouncer, request, response }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('store')
    const data = await request.validate(RealisationStoreValidator)
    const thumbnail: MultipartFileContract | null = await request.file('thumbnail')

    const realisation = await Realisation.create({
      ...data,
      thumbnail: thumbnail
        ? Attachment.fromFile(thumbnail)
        : undefined,
    })

    return response.send(realisation)
  }

  /**
   *
   * @param bouncer
   * @param request
   * @param params
   */
  public async update({ bouncer, request, params }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('update')
    const data = await request.validate(RealisationUpdateValidator)
    const images = request.files('images')
    const realisation = await Realisation.findByOrFail('slug', params.id)
    await realisation.load('images')

    await realisation.merge(data).save()
    await realisation.related('images').detach()
    if (images.length) {
      for (const image of images) {
        const item = await Image.firstOrCreate({
          picture: Attachment.fromFile(image)
        })

        await realisation.related('images').create(item)
      }
    }
    return realisation
  }

  /**
   *
   * @param bouncer
   * @param params
   * @param response
   */
  public async destroy({ bouncer, params, response }: HttpContextContract) {
    await bouncer.with('RealisationPolicy').authorize('destroy')

    const realisation = await Realisation.findByOrFail('slug', params.id)
    await realisation.delete()

    return response.ok({
      message: 'Realisation was been deleted',
      realisation
    })
  }
}
