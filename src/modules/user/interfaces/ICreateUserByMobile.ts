import { UserEntity } from "../entities/user.entity";


export interface ICreateUserByMobile {
  createNewUserByMobile(mobile: string): Promise<UserEntity>
}