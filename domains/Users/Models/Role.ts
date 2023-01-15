import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import { DateTime } from 'luxon'
import Permission from 'Domains/Users/Models/Permission'
import User from 'Domains/Users/Models/User'
import { randomUUID } from 'crypto'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public label: string

  @column()
  public power: number

  @attachment({preComputeUrl: true})
  public icon: AttachmentContract

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (role: Role) {
    role.id = randomUUID()
  }
}
