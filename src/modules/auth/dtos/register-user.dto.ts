import { IsPhoneNumber, IsString } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  @IsPhoneNumber('IR')
  mobile: string
}