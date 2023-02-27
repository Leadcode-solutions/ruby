import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BlogArticleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string({ trim: true }, [rules.maxLength(255)]),
    description: schema.string({ trim: true }, [rules.maxLength(255)]),
    structure: schema.array().anyMembers(),
    blog_category_id: schema.number.optional([rules.exists({ table: 'blog_categories', column: 'id' })])
  })

  public messages: CustomMessages = {}
}
