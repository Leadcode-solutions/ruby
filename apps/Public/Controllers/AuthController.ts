import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login ({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    console.log(email, password)

    try {
      const token = await auth.use('api').attempt(email, password)
      response.send({
        message: "Vous vous êtes bien connecté",
        user: auth.user,
        token: token
      })
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout ({ auth }: HttpContextContract) {
    await auth.use('api').revoke()

    return {
      revoked: true
    }
  }

  public async me ({ auth }: HttpContextContract) {
    const user = auth.user

    return user
  }
}
