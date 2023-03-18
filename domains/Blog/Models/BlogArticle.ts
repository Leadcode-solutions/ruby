import { DateTime } from 'luxon'
import { afterFetch, afterFind, BaseModel, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BlogCategory from 'Domains/Blog/Models/BlogCategory'

export default class BlogArticle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public blogCategoryId: number

  @column()
  public label: string

  @column()
  public description: string

  @column()
  public structure: string

  @column()
  public image: string

  @column()
  public publishedAt: DateTime

  @column()
  public isVisible: boolean

  @column()
  public draftIsActive: boolean

  @column()
  public draftPassword: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => BlogCategory)
  public category: BelongsTo<typeof BlogCategory>

  @beforeSave()
  public static serializeInsertedStructure (article: BlogArticle) {
    article.structure = JSON.stringify(article.structure)
  }

  @afterFetch()
  public static serializeRecoveryAllStructure (articles: BlogArticle[]) {
    articles.forEach((article: BlogArticle) => {
      article.structure = JSON.parse(JSON.stringify(article.structure))
    })
  }

  @afterFind()
  public static serializeRecoveryOneStructure (article: BlogArticle) {
    article.structure = JSON.parse(JSON.stringify(article.structure))
  }
}
