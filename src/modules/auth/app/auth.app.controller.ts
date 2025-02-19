import { AuthAppService } from "./auth.app.service";
import { seconds, Throttle } from "@nestjs/throttler";
import { SignInUserDto } from "./dtos/signIn-user.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('/api/v1/auth')
export class AuthAppController {
  constructor(
    private readonly authAppService: AuthAppService,
  ){}

  @ApiOperation({ summary: 'Request OTP for a user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: 201,
    description: 'OTP generated successfully -- sending via sms',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid mobile number format',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests - OTP request limit reached',
  })
  @Throttle({ limit: { ttl: seconds(120), limit: 1 }})
  @Post('/request-otp')
  async requestOtp(@Body() body: RegisterUserDto){
    const otp = await this.authAppService.requestOtp(body.mobile)
    return otp
  }

  @ApiOperation({ summary: 'Sign in a user using OTP' })
  @ApiBody({ type: SignInUserDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in and JWT token issued',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', description: 'JWT token for the authenticated user' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP or incorrect mobile number format',
  })
  @ApiResponse({
    status: 404,
    description: 'OTP not found for this mobile number',
  })
  @ApiResponse({
    status: 410,
    description: 'OTP has expired',
  })
  @Throttle({ limit: { ttl: seconds(120), limit: 1 }})
  @Post('/signin')
  async signin(@Body() body: SignInUserDto){
    await this.authAppService.verifyOtp(body)
    const jwtToken = await this.authAppService.requestJwt(body.mobile)

    return { token: jwtToken }
  }
}