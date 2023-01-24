import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from "Domains/Users/Models/Role";
import {RoleStoreValidator} from "App/Manager/Validators/RoleValidator";

export default class RolesController {
  public async index ({ bouncer }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    return Role.query();
  }

  public async show ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    return Role.findOrFail(params.id)
  }

  public async store ({ bouncer, request, auth }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
    const data = await request.validate(RoleStoreValidator)

    return Role.create(data)
  }

  public async update ({ bouncer, params, request }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
  }

  public async destroy ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')
  }
}
