import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class UserStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({ trim: true }),
    email: schema.string({ trim: true }),
    password: schema.string({ trim: true })
  })

  public messages: CustomMessages = {}
}

export class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string.optional({ trim: true }),
    email: schema.string.optional({ trim: true }),
    password: schema.string.optional({ trim: true })
  })

  public messages: CustomMessages = {}
}
