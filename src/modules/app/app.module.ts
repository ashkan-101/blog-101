import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/common/configs/typeOrmConfig';
import { CategoryModule } from '../category/category.module';
import { AdminModule } from '../admin/admin.module';
import { PostModule } from '../post/post.module';

@Module({
  imports: [
    UserModule, AuthModule, CategoryModule, AdminModule, PostModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
})
export class AppModule {}
