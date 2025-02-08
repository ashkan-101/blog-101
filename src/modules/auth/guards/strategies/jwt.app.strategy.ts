import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { AuthAppFactory } from '../../app/auth.app.factory'
import { JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
import { IUserEntity } from 'src/modules/user/interfaces/IUser.Entity'
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
    if(!payload.userId) throw new UnauthorizedException('Unauthorized')
    const user = await this.authAppFactory.findUserById(payload.userId)
    if(!user) throw new UnauthorizedException('Unauthorized')
    return user
  }
}