import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class RoleStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string({ trim: true }),
    power: schema.number(),
  })

  public messages: CustomMessages = {}
}

export class RoleUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string.optional({ trim: true }),
    power: schema.number.optional(),
  })

  public messages: CustomMessages = {}
}
