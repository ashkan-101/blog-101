import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthAdminFactory } from "../admin/auth.admin.factory";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAdminGuard implements CanActivate{
  authAppFactory: any;
  constructor(
    private readonly authAdminFactory: AuthAdminFactory,
    private readonly jwtService: JwtService
  ){}
    
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()

    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer')
    ) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token: string = request.headers.authorization.split(' ')[1];

    try {
      const paylod = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});

      if(!paylod.adminId){
        throw new UnauthorizedException('Unauthorized')
      }

      const admin = await this.authAdminFactory.findAdminById(paylod.adminId)

      request.admin = admin;

      return true;
    } catch (error: any) {
      console.log(error.message);
      throw new UnauthorizedException(error.message);
    }   
  } 
}