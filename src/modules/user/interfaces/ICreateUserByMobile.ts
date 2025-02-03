import { UserEntity } from "../entities/user.entity";


export interface CreateNewUserByMobile {
  createNewUserWithMobile(mobile: string): Promise<UserEntity>
}