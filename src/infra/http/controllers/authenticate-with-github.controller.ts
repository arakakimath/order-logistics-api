import { Public } from '@/infra/auth/public'
import { EnvService } from '@/infra/env/env.service'
import {
  Controller,
  HttpCode,
  Get,
  Res,
  Query,
  BadRequestException,
  ConflictException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import { GitHubAuthService } from '../oauth2/github-auth.service'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { AuthenticateWithOAuth2UseCase } from '@/domain/application/use-cases/users/authenticate-with-oauth2'
import { MustBeAuthenticatedToLinkOAuthError } from '@/domain/application/use-cases/errors/must-be-authenticated-to-link-oauth.error'
import { OAuthMethodAlreadyUsedError } from '@/domain/application/use-cases/errors/oauth-method-already-used.error'

@Controller('/auth/github')
@Public()
@ApiTags('Users')
export class AuthenticateWithGitHubController {
  constructor(
    private env: EnvService,
    private gitHubAuthService: GitHubAuthService,
    private authenticateWithOAuth2UseCase: AuthenticateWithOAuth2UseCase,
  ) {}

  @Get()
  @HttpCode(200)
  async handle() {
    return `https://github.com/login/oauth/authorize?client_id=${this.env.get('GITHUB_CLIENT_ID')}&scope=user`
  }

  @Get('/callback')
  @HttpCode(200)
  async callbackHandle(
    @Query() { code }: Record<'code', string>,
    @CurrentUser() user: UserPayload,
    @Res() res: Response,
  ) {
    console.log(user)

    const githubAccessToken =
      await this.gitHubAuthService.exchangeCodeForToken(code)

    if (!githubAccessToken)
      throw new BadRequestException(
        'It was not possible to get github access token.',
      )

    const { login } =
      await this.gitHubAuthService.fetchGitHubUser(githubAccessToken)

    if (typeof login !== 'string') throw new BadRequestException()

    const result = await this.authenticateWithOAuth2UseCase.execute({
      authProvider: 'github',
      authProviderUsername: login,
      userID: user?.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case MustBeAuthenticatedToLinkOAuthError:
          throw new BadRequestException(error.message)
        case OAuthMethodAlreadyUsedError:
          throw new ConflictException(error.message)
        default:
          throw new ConflictException(error.message)
      }
    }

    const { accessToken, refreshToken } = result.value

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      })
      .send({
        access_token: accessToken,
      })
  }

  @Get('/code')
  @HttpCode(200)
  async codeHandle(@Query() { code }: Record<'code', string>) {
    return code
  }
}
