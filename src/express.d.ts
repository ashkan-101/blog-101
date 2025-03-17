import { Request } from 'express';
import { IAdminEntity } from './modules/admin/interfaces/IAdmin.Entity';
import { IUserEntity } from './modules/user/interfaces/IUser.Entity';

declare global {
  namespace Express {
    interface Request {
      admin?: IAdminEntity;
      user?: IUserEntity;
      user_subscription: any
    }
  }
}