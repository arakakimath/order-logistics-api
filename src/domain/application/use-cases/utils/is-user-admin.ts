import { User } from '@/core/types/user'

export function isUserAdmin(user: User): boolean {
  return user.role === 'admin'
}
