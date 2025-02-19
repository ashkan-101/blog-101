import { Body, Controller, Post } from "@nestjs/common";
import { AuthAdminService } from "./auth.admin.service";
import { SignInAdminDto } from "./dtos/signIn-admin.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";


@Controller('/api/v1/admin/auth')
export class AuthAdminController{
  constructor(
    private readonly authAdminService: AuthAdminService,

  ){}

  @ApiOperation({
    summary: 'Admin Sign-In',
    description: 'Authenticates an admin by email and password, and returns a JWT token if credentials are correct.',
  })
  @ApiBody({
    description: 'Sign-In Admin with email and password',
    type: SignInAdminDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Admin signed in successfully, returns JWT token.',
    schema: {
      example: {
        token: 'your-jwt-token-here',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'password is incorrect or invalid email & password format',
  })
  @ApiResponse({
    status: 404,
    description: 'not found admin with entered email',
  })
  @Post('/signin')
  async signIn(@Body() body: SignInAdminDto){
    const jwtToken = await this.authAdminService.authenticateAdmin(body)

    return { token: jwtToken }
  }
}