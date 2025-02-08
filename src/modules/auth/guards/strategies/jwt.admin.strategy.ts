import { AuthAdminFactory } from "../../admin/auth.admin.factory";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
config()

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwt-admin'){
 constructor(
  private readonly authAdminFctory: AuthAdminFactory
 ){
  super({
    secretOrKey: process.env.JWT_SECRET as string,
    ignoreExpiration: false,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  })
 }
  
  async validate(payload: JwtPayload) {
    if(!payload.adminId) throw new UnauthorizedException('Unauthorized')
    const admin = await this.authAdminFctory.findAdminByEmail(payload.email)
    if(!admin) throw new UnauthorizedException('Unauthorized')
    return admin
  }
  
}