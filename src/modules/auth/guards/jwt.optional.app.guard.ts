import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthAppFactory } from "../app/auth.app.factory";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { config } from "dotenv";
config()

@Injectable()
export class jwtOptionalAppGuard implements CanActivate {

  constructor(
    private readonly authAppFactory: AuthAppFactory,
    private readonly jwtService: JwtService
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = await this.extractToken(request)

    if(!token){
      return true
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET})
      if(!payload.userId){
        return true
      }

      const user = await this.authAppFactory.findUserById(payload.userId)
      request.user = user
      return true 
    } catch (error) {
      console.log(error);
      return true
    }
  }
  
  private async extractToken(request: Request){
    const [ type, token ] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}