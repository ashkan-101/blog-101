import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
import { AuthAdminFactory } from "../../admin/auth.admin.factory";
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
    const admin = await this.authAdminFctory.findAdminByEmail(payload.email)
    return admin
  }
  
}