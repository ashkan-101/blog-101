import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAppGuard extends AuthGuard('jwt-app'){}