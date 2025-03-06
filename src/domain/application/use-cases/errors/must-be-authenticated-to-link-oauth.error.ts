import { UseCaseError } from '@/core/errors/use-case-error'

export class MustBeAuthenticatedToLinkOAuthError
  extends Error
  implements UseCaseError
{
  constructor() {
    super(
      'Link an account with an OAuth2 authentication method requires to be signed in.',
    )
  }
}
