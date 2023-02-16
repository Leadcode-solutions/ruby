import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BlogCategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string({ trim: true }, [rules.maxLength(255)]),
    icon: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {}
}
