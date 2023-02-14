import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'Domains/Users/Models/User'

export default class BlogCategoryPolicy extends BasePolicy {
  public async before (user?: User) {
    if (!user) return false
    if (user.isAdmin) return true
    if (user.isLocked) return false

    return user.hasRoles()
  }

  public async view (user: User) {
    return user.hasPermission('store:blog-category')
      || user.hasPermission('update:blog-category')
      || user.hasPermission('destroy:blog-category')
  }

  public async store (user: User) {
    return user.hasPermission('store:blog-category')
  }

  public async update (user: User) {
    return user.hasPermission('update:blog-category')
  }

  public async destroy (user: User) {
    return user.hasPermission('destroy:blog-category')
  }
}
