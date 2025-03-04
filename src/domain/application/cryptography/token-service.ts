export abstract class TokenService {
  abstract sign(
    payload: Record<string, unknown>,
    expiresIn?: string,
  ): Promise<string>

  abstract decode(token: string): Promise<Record<string, unknown> | null>
}
