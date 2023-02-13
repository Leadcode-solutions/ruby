import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import BlogArticle from 'Domains/Blog/Models/BlogArticle'

export default class BlogCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public label: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['label'],
    allowUpdates: true
  })
  public slug: string

  @column()
  public icon: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => BlogArticle)
  public articles: HasMany<typeof BlogArticle>
}
