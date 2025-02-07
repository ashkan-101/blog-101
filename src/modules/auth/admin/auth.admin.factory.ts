import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminService } from "src/modules/admin/admin.service";
import { IFindAdminByEmail } from "src/modules/admin/interfaces/IFindAdminByEmail";


@Injectable()
export class AuthAdminFactory{
  private readonly findAdmin: IFindAdminByEmail
  constructor(adminService: AdminService){
    this.findAdmin = adminService
  }

  public async findAdminByEmail(email: string){
    const admin = await this.findAdmin.findAdminByEmail(email)
    if(!admin) throw new NotFoundException('not found any admin with this email')
      return admin
  }
}