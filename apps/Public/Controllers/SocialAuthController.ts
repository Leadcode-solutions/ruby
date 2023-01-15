import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import User from "Domains/Users/Models/User";

export default class SocialAuthController {
  public async redirect ({ ally, params, auth, response }: HttpContextContract) {
    if (await auth.check()) {
      return response.notAcceptable()
    }
    return ally.use(params.provider).redirect()
  }

  public async callback ({ ally, response, params, auth }: HttpContextContract) {
    console.log(params)
    const provider = ally.use(params.provider).stateless()


    if (provider.accessDenied()) {
      return response.send('Acces non autorisé')
    }
    const providerUser = await provider.user()

    const user = await User.firstOrCreate({
      email: providerUser.email!
    }, {
      username: providerUser.name,
      provider: params.provider,
      providerId: providerUser.id,
      hasEmailConfirmed: providerUser.emailVerificationState === 'verified',
    })

    const oat = await auth.use('api').login(user)

    return response.redirect().toPath(`http://localhost:3000/authentication/oauth?token=${oat.token}`)
  }

}
