import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @attachment({ preComputeUrl: true })
  public picture: AttachmentContract

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime | null) => {
      return value ? value.toFormat('yyyy-L-mm') : value
    }})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Image) {
    model.id = randomUUID()
  }
}
