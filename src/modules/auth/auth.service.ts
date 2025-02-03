import { Injectable } from "@nestjs/common";
import { AuthFactory } from "./auth.factory";

@Injectable()
export class AuthService {
  constructor(
    private readonly authFactory: AuthFactory
  ){}
}