import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'Domains/Users/Models/User'
import { UserStoreValidator, UserUpdateValidator } from 'App/Manager/Validators/UserValidator'

export default class UsersController {
  public async index ({ bouncer }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('view')

    return User.query()
  }

  public async show ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('view')

    return User.query().where('id', params.id).first()
  }

  public async store ({ bouncer, request }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('store')

    const data = await request.validate(UserStoreValidator)
    return User.create(data)
  }

  public async update ({ bouncer, params, request }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('update')
    const user = await User.findOrFail(params.id)
    const data = await request.validate(UserUpdateValidator)

    await user.merge(data).save()
  }

  public async destroy ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('UserPolicy').authorize('destroy')
    const user = await User.findOrFail(params.id)

    return user.delete()
  }
}
