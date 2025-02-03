import { UserEntity } from "../entities/user.entity";


export interface ICreateUserByMobile {
  createNewUserWithMobile(mobile: string): Promise<UserEntity>
}