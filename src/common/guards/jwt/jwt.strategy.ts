import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { JwtPayload } from 'jsonwebtoken'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtFactory } from './jwt.factory'
import { config } from 'dotenv'
config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(private readonly jwtFactory: JwtFactory){
    super({
      secretOrKey: process.env.JWT_SECRET as string,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this.jwtFactory.findUserById(payload.id)
    if(!user) throw new UnauthorizedException('Unauthorized!')
    return user
  }
}