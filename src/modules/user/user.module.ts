import { Module } from "@nestjs/common";
import { UserAppModule } from "./app/user.app.module";

@Module({
  imports: [UserAppModule]
})
export class UserModule {}