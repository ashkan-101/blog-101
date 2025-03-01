import { UserEntity } from "../entities/user.entity";


export interface IFindUserByMobile {
  findUserByMobile(mobile: string): Promise<UserEntity | null>
}