import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/common/configs/typeOrmConfig';

@Module({
  imports: [
    UserModule, AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
})
export class AppModule {}
