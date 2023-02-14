import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'Domains/Users/Models/User'

export default class BlogArticlePolicy extends BasePolicy {
  public async before (user?: User) {
    if (!user) return false
    if (user.isAdmin) return true
    if (user.isLocked) return false

    return user.hasRoles()
  }

  public async view (user: User) {
    return user.hasPermission('store:blog-article')
      || user.hasPermission('update:blog-article')
      || user.hasPermission('destroy:blog-article')
  }

  public async store (user: User) {
    return user.hasPermission('store:blog-article')
  }

  public async update (user: User) {
    return user.hasPermission('update:blog-article')
  }

  public async destroy (user: User) {
    return user.hasPermission('destroy:blog-article')
  }
}
