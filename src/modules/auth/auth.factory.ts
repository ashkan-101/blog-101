import { Injectable } from "@nestjs/common";
import { UserAppService } from "../user/app/user.app.service";
import { IFindUserByMobile } from "../user/interfaces/IFindUserByMobile";
import { ICreateUserByMobile } from '../user/interfaces/ICreateUserByMobile'

@Injectable()
export class AuthFactory {
  private readonly findUser: IFindUserByMobile
  private readonly createUser: ICreateUserByMobile
  constructor(userAppService: UserAppService){
    this.findUser = userAppService
  }

  public async validateUserByMobile(mobile: string){
    return await this.findUser.findUserByMobile(mobile)
  }

  public async createNewUserByMobile(mobile: string){
    return await this.createUser.createNewUserWithMobile(mobile)
  }
}