import { Body, Controller, Post } from "@nestjs/common";
import { AuthAdminService } from "./auth.admin.service";
import { SignInAdminDto } from "./dtos/signIn-admin.dto";
import { JwtService } from "@nestjs/jwt";


@Controller('/api/v1/auth')
export class AuthAdminController{
  constructor(
    private readonly authAdminService: AuthAdminService,
    private readonly jwtService: JwtService
  ){}

  @Post('/signin-admins')
  async signInAdmin(@Body() body: SignInAdminDto){
    const adminId = await this.authAdminService.getAdminId(body)

    return { token: this.jwtService.sign({adminId})}
  }
}