import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlogArticleValidator from "App/Manager/Validators/BlogArticleValidator";
import BlogArticle from 'Domains/Blog/Models/BlogArticle'

export default class BlogArticleController {
  public async index ({ bouncer }: HttpContextContract) {
    await bouncer.with('BlogArticlePolicy').authorize('view')
    return BlogArticle.query().preload('category')
  }

  public async show ({ bouncer, params }: HttpContextContract) {
    await bouncer.with('BlogArticlePolicy').authorize('view')
    return BlogArticle.query().where('id', params.id).preload('category')
  }

  public async store ({ bouncer, request }: HttpContextContract) {
    await bouncer.with('BlogArticlePolicy').authorize('view')
    const data = await request.validate(BlogArticleValidator)

    return BlogArticle.create(data)
  }

  public async update ({ bouncer, params, request, response }: HttpContextContract) {
    await bouncer.with('BlogArticlePolicy').authorize('view')
    const data = await request.validate(BlogArticleValidator)
    const article = await BlogArticle.findOrFail(params.id)

    await article.merge(data).save()

    return response.send({
      message: `L\'article ${article.label} a bien été modifié`,
      article
    })
  }

  public async destroy ({ bouncer, params, response }: HttpContextContract) {
    await bouncer.with('BlogArticlePolicy').authorize('view')
    const article = await BlogArticle.findOrFail(params.id)
    await article.delete()

    return response.send({
      message: `L\'article ${article.label} a bien été supprimé`,
      article
    })
  }
}
