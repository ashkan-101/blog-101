import { SetMetadata } from "@nestjs/common"

export const SetAccessRoles = (roles: ('admin' | 'user' | 'superadmin')[]) => {
  return SetMetadata('roles', roles)
}