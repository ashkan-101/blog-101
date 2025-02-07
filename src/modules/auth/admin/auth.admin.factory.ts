import { Injectable } from "@nestjs/common";
import { AdminService } from "src/modules/admin/admin.service";
import { IFindAdminByEmail } from "src/modules/admin/interfaces/IFindAdminByEmail";


@Injectable()
export class AuthAdminFactory{
  private readonly findAdmin: IFindAdminByEmail
  constructor(adminService: AdminService){
    this.findAdmin = adminService
  }

  public async findAdminByEmail(email: string){
    return await this.findAdmin.findAdminByEmail(email)
  }
}