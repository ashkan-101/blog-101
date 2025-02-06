import { AdminEntity } from "../entities/admin.entity";

export interface IFindAdminByEmail{
  findAdminByEmail(email: string): Promise<null | AdminEntity>
}