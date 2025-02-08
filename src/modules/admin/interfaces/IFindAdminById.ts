import { AdminEntity } from "../entities/admin.entity";


export interface IFIndAdminById{
  findAdminById(id: string): Promise<AdminEntity | null> 
}