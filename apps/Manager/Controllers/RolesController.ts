import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from "Domains/Users/Models/Role";
import {RoleStoreValidator, RoleUpdateValidator} from "App/Manager/Validators/RoleValidator";

export default class RolesController {
  public async index ({ bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    return Role.query()
  }

  public async show ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    return Role.query().where('id', params.id).preload('permissions')
  }

  public async store ({ bouncer, request }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    const data = await request.validate(RoleStoreValidator)

    return Role.create(data)
  }

  public async update ({ bouncer, params, request, response }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    const data = await request.validate(RoleUpdateValidator)
    const role = await Role.findOrFail(params.id)

    await role.merge(data).save()

    return response.send({
      message: `Le role ${role.id} a bien été modifié`,
      role: role
    })
  }

  public async destroy ({ bouncer, params, response }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    const role = await Role.findOrFail(params.id)
    await role.delete()

    return response.send({
      message: `Le role ${role.id} a bien été supprimé`,
      role: role
    })
  }
}
