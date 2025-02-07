import { Injectable, NotFoundException } from "@nestjs/common";
import { AdminService } from "src/modules/admin/admin.service";
import { IFindAdminByEmail } from "src/modules/admin/interfaces/IFindAdminByEmail";
import { IFIndAdminById } from "src/modules/admin/interfaces/IFindAdminById";


@Injectable()
export class AuthAdminFactory{
  private readonly findAdmin: IFindAdminByEmail & IFIndAdminById
  constructor(adminService: AdminService){
    this.findAdmin = adminService
  }

  public async findAdminByEmail(email: string){
    return await this.findAdmin.findAdminByEmail(email)
  }

  public async findAdminById(adminId: string){
    return await this.findAdmin.findAdminById(adminId)
  }
}