import { Injectable } from "@nestjs/common";
import { IFindUserById } from "../interfaces/IFindUserById";
import { UserAppService } from "./services/user.app.service";


@Injectable()
export class UserAppFactory {
  private readonly findUser: IFindUserById
  constructor(userAppService: UserAppService){
    this.findUser = userAppService
  }

  public async findUserById(userId: string){
    return await this.findUser.findUserById(userId)
  }
}