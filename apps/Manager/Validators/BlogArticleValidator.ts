import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BlogArticleValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    label: schema.string.optional({ trim: true }, [
      rules.maxLength(255),
      rules.requiredWhen('is_visible', '=', true)
    ]),
    description: schema.string.optional({ trim: true }, [
      rules.maxLength(255),
      rules.requiredWhen('is_visible', '=', true)
    ]),
    structure: schema.array().anyMembers(),
    image: schema.string.nullableAndOptional({ trim: true }, [
      rules.requiredWhen('is_visible', '=', true)
    ]),
    published_at: schema.date.nullableAndOptional({}, [
      rules.requiredWhen('is_visible', '=', true)
    ]),
    blog_category_id: schema.number.optional([
      rules.exists({ table: 'blog_categories', column: 'id' })
    ]),
    is_visible: schema.boolean.optional()
  })

  public messages: CustomMessages = {}
}
