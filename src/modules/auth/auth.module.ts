import { Module } from "@nestjs/common";
import { AuthAppModule } from "./app/auth.app.module";

@Module({
  imports: [AuthAppModule]
})
export class AuthModule{}