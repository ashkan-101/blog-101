import { Injectable } from "@nestjs/common";
import { UserAppService } from "../user/app/user.app.service";
import { IFindUserByMobile } from "../user/interfaces/IFindUserByMobile";
import { ICreateUserByMobile } from '../user/interfaces/ICreateUserByMobile'
import { IFindUserById } from "../user/interfaces/IFindUserById";

@Injectable()
export class AuthFactory {
  private readonly findUser: IFindUserByMobile & IFindUserById
  private readonly createUser: ICreateUserByMobile
  constructor(userAppService: UserAppService){
    this.findUser = userAppService,
    this.createUser = userAppService

  }

  public async validateUserByMobile(mobile: string){
    return await this.findUser.findUserByMobile(mobile)
  }

  public async createNewUserByMobile(mobile: string){
    return await this.createUser.createNewUserByMobile(mobile)
  }

  public async findUserById(userId: string){
    return this.findUser.findUserById(userId)
  }
}