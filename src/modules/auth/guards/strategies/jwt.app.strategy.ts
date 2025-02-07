import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { AuthAppFactory } from '../../app/auth.app.factory'
import { JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
config()

@Injectable()
export class JwtAppStrategy extends PassportStrategy(Strategy, 'jwt-app'){
  constructor(private readonly authAppFactory: AuthAppFactory){
    super({
      secretOrKey: process.env.JWT_SECRET as string,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.authAppFactory.findUserById(payload.id)
    return user
  }
}