import {BasePolicy} from '@ioc:Adonis/Addons/Bouncer'
import User from 'Domains/Users/Models/User'

export default class RealisationPolicy extends BasePolicy {
  public async before (user?: User) {
    if (!user || user.isLocked) return false
    if (user.isAdmin) return true
  }

  public async view (user: User) {
    return user.hasPermission('store:realisation')
      || user.hasPermission('update:realisation')
      || user.hasPermission('destroy:realisation')
  }

  public async store (user: User) {
    return user.hasPermission('store:realisation')
  }

  public async update (user: User) {
    return user.hasPermission('update:realisation')
  }

  public async destroy (user: User) {
    return user.hasPermission('destroy:realisation')
  }

}
