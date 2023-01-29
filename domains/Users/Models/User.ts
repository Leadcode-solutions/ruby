import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeCreate, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'crypto'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import Role from 'Domains/Users/Models/Role'
import Permission from 'Domains/Users/Models/Permission'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public username: string

  @column()
  public isAdmin: boolean

  @column()
  public isLocked: boolean

  @column()
  public email: string

  @column()
  public provider: string

  @column()
  public providerId: string

  @column()
  public hasEmailConfirmed: boolean

  @column({ serializeAs: null })
  public password: string | null

  @attachment({ preComputeUrl: true })
  public avatar: AttachmentContract

  @attachment({ preComputeUrl: true })
  public banner: AttachmentContract

  @column()
  public rememberMeToken?: string

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime | null) => {
      return value ? value.toFormat('yyyy-L-mm') : value
    }})
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public hasRole (identifier: string): boolean {
    return this.roles.some((role: Role) => role.label === identifier)
  }

  public hasRoles () {
    return this.roles.length
      ? this.roles.some((role: Role) => role.permissions.length)
      : false
  }

  public hasPermission (identifier: string): boolean {
    const permissions: string[] = []
    this.roles.forEach((role: Role) => {
      role.permissions.forEach((permission: Permission) => {
        if (!permissions.includes(permission.key))
          permissions.push(permission.key)
      })
    })

    return permissions.includes(identifier)
  }

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password && user.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async generateUuid (user: User) {
    user.id = randomUUID()
  }
}
