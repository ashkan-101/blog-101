import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AuthAdminFactory } from "./auth.admin.factory";
import { SignInAdminDto } from "./dtos/signIn-admin.dto";
import { compare } from "bcrypt";

@Injectable()
export class AuthAdminService{
  constructor(
    private readonly authAdminFactory: AuthAdminFactory
  ){}

  //------------------------------------private methods

  private async validatePassword(password: string, hashedPassword: string){
    const result = await compare(password, hashedPassword)

    if(!result) throw new BadRequestException('The password entered is incorrect')
  }


  //------------------------------------public methods
  public async getAdminId(params: SignInAdminDto): Promise<string>{
    const admin = await this.authAdminFactory.findAdminByEmail(params.email)

    if(!admin) throw new NotFoundException('not found any admin with this email')
    
    await this.validatePassword(params.password, admin.password)
    
    return admin.id
  }
}