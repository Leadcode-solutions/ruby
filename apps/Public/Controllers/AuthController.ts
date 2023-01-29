import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'Domains/Users/Models/User'
import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'

export default class AuthController {
  /**
   * login method, use token-api in guard `api`
   * return object with (__message, user, token__)
   * @param auth
   * @param request
   * @param response
   */
  public async login ({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    console.log(email, password)

    try {
      const token: OpaqueTokenContract<User> = await auth.use('api').attempt(email, password)
      response.send({
        message: "Vous vous êtes bien connecté",
        user: auth.user,
        token: token
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  /**
   * logout method
   * return object (__revoked : true__)
   * @param auth
   */
  public async logout ({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true
    }
  }

  /**
   * me method for kept user information
   * return user with preload (__permissions, roles__)
   * @param auth
   */
  public async me ({ auth }: HttpContextContract) {
    const user: User = auth.user!

    await user.load('permissions')
    await user.load('roles')

    return user
  }
}
