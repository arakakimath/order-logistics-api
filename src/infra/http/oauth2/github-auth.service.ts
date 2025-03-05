import { EnvService } from '@/infra/env/env.service'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class GitHubAuthService {
  constructor(
    private env: EnvService,
    private httpService: HttpService,
  ) {}

  async exchangeCodeForToken(code: string): Promise<string | null> {
    const url = 'https://github.com/login/oauth/access_token'

    const response = await firstValueFrom(
      this.httpService.post(
        url,
        {
          client_id: this.env.get('GITHUB_CLIENT_ID'),
          client_secret: this.env.get('GITHUB_CLIENT_SECRET'),
          code,
        },
        { headers: { Accept: 'application/json' } },
      ),
    )

    return response.data.access_token ?? null
  }

  async fetchGitHubUser(accessToken: string): Promise<Record<string, unknown>> {
    const url = 'https://api.github.com/user'

    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    )

    return response.data
  }
}
