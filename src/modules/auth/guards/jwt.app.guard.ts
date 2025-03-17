import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthAppFactory } from '../app/auth.app.factory';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { Request } from 'express';
config()

@Injectable()
export class JwtAppGuard implements CanActivate{
  constructor(
    private readonly authAppFactory: AuthAppFactory,
    private readonly jwtService: JwtService
  ){}
  
  async canActivate(context: ExecutionContext) { 
    const request = context.switchToHttp().getRequest<Request>()

    if (
      !request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer')
    ) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token: string = request.headers.authorization.split(' ')[1];

    try {
      const paylod = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});
      
      if(!paylod.userId){
        throw new UnauthorizedException('Unauthorized')
      }

      const user = await this.authAppFactory.findUserById(paylod.userId)

      request.user = user;

      return true;
    } catch (error: any) {
      console.log(error.message);
      throw new UnauthorizedException(error.message);
    }
  }
}