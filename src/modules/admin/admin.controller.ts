import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";


@Controller('/api/v1/admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ){}



  @ApiOperation({ summary: 'Create new admin' })
  @ApiBody({
    description: 'Details of the new admin to be created',
    type: CreateAdminDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Admin created successfully.',
    schema: {
      type: 'object',
      properties: {
        userName: { type: 'string', example: 'adminUser123' },
        email: { type: 'string', example: 'admin@example.com' },
        avatar: { type: 'string', example: 'https://avatar.url/image.jpg' },
        role: { type: 'string', example: 'admin' },
        isActive: { type: 'boolean', example: true },
        createdAt: { type: 'string', format: 'date-time', example: '2025-02-06T10:00:00Z' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request due to validation failure (username or email already exists).',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request due to password mismatch.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'The repeated password does not match the entered password' },
      },
    },
  })
  @Post()
  async createAdmin(@Body() body: CreateAdminDto){
    const newAdmin = await this.adminService.createNewAdmin(body)

    return {
      userName: newAdmin.userName,
      email: newAdmin.email,
      avatar: newAdmin.avatar,
      role: newAdmin.role,
      isActive: newAdmin.isActive,
      createdAt: newAdmin.createdAt
    }
  }
}