import { Module } from "@nestjs/common";
import { JwtFactory } from "./jwt.factory";
import { UserAppModule } from "src/modules/user/app/user.app.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [UserAppModule],
  providers: [JwtFactory, JwtStrategy],
})
export class JwtModule{}