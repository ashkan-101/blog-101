import { Body, Controller, Post } from "@nestjs/common";
import { AuthAdminService } from "./auth.admin.service";
import { SignInAdminDto } from "./dtos/signIn-admin.dto";
import { JwtService } from "@nestjs/jwt";


@Controller('/api/v1/auth')
export class AuthAdminController{
  constructor(
    private readonly authAdminService: AuthAdminService,

  ){}

  @Post('/signin-admin')
  async signIn(@Body() body: SignInAdminDto){
    const jwt = await this.authAdminService.authenticateAdmin(body)

    return { token: jwt }
  }
}