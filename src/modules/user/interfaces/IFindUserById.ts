import { UserEntity } from "../entities/user.entity";

export interface IFindUserById{
  findUserById(userId: string): Promise<UserEntity>
}