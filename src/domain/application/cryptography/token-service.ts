export abstract class TokenService {
  abstract sign(
    payload: Record<string, unknown>,
    expiresIn?: string,
  ): Promise<string>
}
