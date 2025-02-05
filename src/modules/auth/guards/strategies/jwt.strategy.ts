import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { AuthFactory } from '../../auth.factory'
import { JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private readonly authFactory: AuthFactory){
    super({
      secretOrKey: process.env.JWT_SECRET as string,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.authFactory.findUserById(payload.id)
    if(!user) throw new UnauthorizedException('Unauthorized!')
    return user
  }
}