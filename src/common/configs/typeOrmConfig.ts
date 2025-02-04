import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { config } from "dotenv";
import { OtpEntity } from "src/modules/auth/entities/otp.entity";
import { CategoryEntity } from "src/modules/category/entities/category.entity";
config()

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT as unknown as number,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD as string,
  database: 'blog-101',
  synchronize: true,
  entities: [UserEntity, OtpEntity, CategoryEntity]
}