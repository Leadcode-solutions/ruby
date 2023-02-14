import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlogCategoryValidator from "App/Manager/Validators/BlogCategoryValidator";
import BlogCategory from 'Domains/Blog/Models/BlogCategory'

export default class BlogCategoryController {
  public async index ({ bouncer }: HttpContextContract) {
    await bouncer.with('BlogCategoryPolicy').authorize('view')
    return BlogCategory.query()
  }

  public async show ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('BlogCategoryPolicy').authorize('view')
    return BlogCategory.query().where('id', params.id).preload('articles')
  }

  public async store ({ bouncer, request }: HttpContextContract) {
    await bouncer.with('BlogCategoryPolicy').authorize('view')
    const data = await request.validate(BlogCategoryValidator)

    return BlogCategory.create(data)
  }

  public async update ({ bouncer, params, request, response }: HttpContextContract) {
    await bouncer.with('BlogCategoryPolicy').authorize('view')
    const data = await request.validate(BlogCategoryValidator)
    const category = await BlogCategory.findOrFail(params.id)

    await category.merge(data).save()

    return response.send({
      message: `La catégorie ${category.label} a bien été modifié`,
      category
    })
  }

  public async destroy ({ bouncer, params, response }: HttpContextContract) {
    await bouncer.with('BlogCategoryPolicy').authorize('view')
    const category = await BlogCategory.findOrFail(params.id)
    await category.delete()

    return response.send({
      message: `La catégorie ${category.label} a bien été supprimé`,
      category
    })
  }
}
