import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UpdateAdminDto } from "./dtos/update-admin.dto";


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
    description: 'Bad request exception for mismatch password and repeat-password',
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

  @ApiOperation({ summary: 'Get all admins' })
  @ApiResponse({
    status: 200,
    description: 'List of admins retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          userName: { type: 'string', example: 'adminUser123' },
          email: { type: 'string', example: 'admin@example.com' },
          avatar: { type: 'string', example: 'https://avatar.url/image.jpg' },
          role: { type: 'string', example: 'admin' },
          isActive: { type: 'boolean', example: true },
        },
      },
    },
  })
  @Get()
  async getAdmins(){
    const admins = await this.adminService.findAllAdmins()
    return admins
  }

  @ApiOperation({ summary: 'Get a single admin by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier (UUID) of the admin to retrieve',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin details retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        userName: { type: 'string', example: 'adminUser123' },
        email: { type: 'string', example: 'admin@example.com' },
        avatar: { type: 'string', example: 'https://avatar.url/image.jpg' },
        role: { type: 'string', example: 'admin' },
        isActive: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Admin not found with the provided ID.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'not found any admin with this ID' },
      },
    },
  })
  @Get(':id')
  async getAdmin(@Param('id', ParseUUIDPipe) id: string){
    const admin = await this.adminService.findAdminById(id)
    
    return admin
  }

  @ApiOperation({ summary: 'Toggle the active status of an admin' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier (UUID) of the admin to toggle the status',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin status toggled successfully.',
    schema: {
      type: 'object',
      properties: {
        updateResult: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Admin not found with the provided ID.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'not found any admin with this ID' },
      },
    },
  })
  @Patch(':id/status')
  async toggleAdminStatus(@Param('id', ParseUUIDPipe) id: string){
    await this.adminService.toggleAdminStatusById(id)
    return { updateResult: true}
  }

  @ApiOperation({ summary: 'Delete an admin by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier (UUID) of the admin to delete',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin deleted successfully.',
    schema: {
      type: 'object',
      properties: {
        deleteResult: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Admin not found with the provided ID.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'not found any admin with this ID' },
      },
    },
  })
  @Delete(':id')
  async deleteAdmin(@Param('id', ParseUUIDPipe) id: string){
    await this.adminService.deleteAdminById(id)
    return { deleteResult: true }
  }

  @Patch(':id')
  async updateAdmin(@Body() body: UpdateAdminDto, @Param('id', ParseUUIDPipe) id: string){
    await this.adminService.updateAdminById(id, body)
    return { updateResult: true }
  }
}