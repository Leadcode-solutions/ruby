import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
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
  public structure: Object

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => BlogCategory)
  public category: BelongsTo<typeof BlogCategory>
}
