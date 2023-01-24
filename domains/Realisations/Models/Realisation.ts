import {BaseModel, beforeCreate, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import {slugify} from "@ioc:Adonis/Addons/LucidSlugify";
import {attachment, AttachmentContract} from "@ioc:Adonis/Addons/AttachmentLite";
import {randomUUID} from "node:crypto";
import {DateTime} from "luxon";
import Image from "Domains/Shared/Models/Image";

export default class Realisation extends BaseModel {
  @column({ isPrimary: true })
  public id: string

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
  public description: string

  @column()
  public url: string

  @column()
  public advice: { username: string, value: string} | null

  @attachment({ preComputeUrl: true })
  public thumbnail: AttachmentContract

  @column()
  public isVisible: boolean

  @column()
  public isPin: boolean

  @manyToMany(() => Image)
  public images: ManyToMany<typeof Image>

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime | null) => {
      return value ? value.toFormat('yyyy-L-mm') : value
    }})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Realisation) {
    model.id = randomUUID()
  }
}
