import { Injectable } from "@nestjs/common";
import { UserAppService } from "src/modules/user/app/user.app.service";
import { IFindUserById } from "src/modules/user/interfaces/IFindUserById";

@Injectable()
export class JwtFactory {
  private readonly findUser: IFindUserById
  constructor(userAppService: UserAppService){
    this.findUser = userAppService
  }

  public async findUserById(userId: string){
    return await this.findUser.findUserById(userId)
  }
  
}