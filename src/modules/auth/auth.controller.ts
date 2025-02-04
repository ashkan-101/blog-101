import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { JwtService } from '@nestjs/jwt'

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ){}

  @Post('/request-otp')
  async requestOtp(@Body() body: RegisterUserDto){
    const otp = await this.authService.createOtp(body.mobile)
    return otp
  }

  @Post('/signin')
  async signin(@Body() body: LoginUserDto){
    await this.authService.verifyOtp(body)
    const user = await this.authService.returnUser(body)

    return { token: this.jwtService.sign({userId: user.id})}
  }
}