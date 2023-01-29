import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Role from 'Domains/Users/Models/Role'
import User from 'Domains/Users/Models/User'
import { randomUUID } from 'crypto'

export default class Permission extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public key: string

  @column()
  public label: string

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (permission: Permission) {
    permission.id = randomUUID()
  }
}
