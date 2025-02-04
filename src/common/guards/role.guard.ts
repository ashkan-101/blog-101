import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ){}

  canActivate(context: ExecutionContext){
    const userRole = context.switchToHttp().getRequest().user.role
    const requiredRole: string[] = this.reflector.get('roles', context.getHandler())
    
    return requiredRole.includes(userRole)
  }
} 