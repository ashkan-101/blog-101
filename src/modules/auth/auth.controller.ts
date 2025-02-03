import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){}

  @Post('/request-otp')
  async requestOtp(@Body() body: RegisterUserDto){
    const otp = await this.authService.createOtp(body.mobile)
    return otp
  }
}