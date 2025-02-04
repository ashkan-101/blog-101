import { SetMetadata } from "@nestjs/common"

export const Role = (roles: ('admin' | 'user' | 'superadmin')[]) => {
  return SetMetadata('roles', roles)
}