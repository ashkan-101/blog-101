import { Injectable } from "@nestjs/common";
import { IFindUserById } from "../interfaces/IFindUserById";
import { UserAppService } from "../app/services/user.app.service";


@Injectable()
export class UserAdminFactory {
  private readonly findUser: IFindUserById
  constructor(userService: UserAppService){
    this.findUser = userService
  }

  public async findUserById(userId: string){
    return await this.findUser.findUserById(userId)
  }
}