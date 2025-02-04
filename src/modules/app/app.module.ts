import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/common/configs/typeOrmConfig';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    UserModule, AuthModule, CategoryModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
})
export class AppModule {}
