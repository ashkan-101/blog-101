import { Body, Controller, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dtos/create-admin.dto";


@Controller('/api/v1/admins')
export class AdminController {
  constructor(
    private readonly adminService: AdminService
  ){}

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