import { Body, Controller, Post } from "@nestjs/common";
import { AuthAppService } from "./auth.app.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { SignInUserDto } from "./dtos/signIn-user.dto";
import { JwtService } from '@nestjs/jwt'
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('/api/v1/auth')
export class AuthAppController {
  constructor(
    private readonly authAppService: AuthAppService,
    private readonly jwtService: JwtService
  ){}


  @ApiOperation({ summary: 'Request OTP for a user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: 201,
    description: 'OTP generated successfully',
    schema: {
      type: 'object',
      properties: {
        otp: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid mobile number format or request body',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests - OTP request limit reached',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @Post('/request-otp')
  async requestOtp(@Body() body: RegisterUserDto){
    const otp = await this.authAppService.createOtp(body.mobile)
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
    description: 'Invalid OTP or incorrect mobile number',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'OTP not found for this mobile number',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 410,
    description: 'OTP has expired',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        error: { type: 'string' },
      },
    },
  })
  @Post('/signin')
  async signin(@Body() body: SignInUserDto){
    await this.authAppService.verifyOtp(body)
    const user = await this.authAppService.returnUser(body)

    return { token: this.jwtService.sign({userId: user.id})}
  }
}