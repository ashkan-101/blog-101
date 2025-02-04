import { IsPhoneNumber, IsString, Length } from 'class-validator'

export class LoginUserDto {
  @IsString()
  @IsPhoneNumber('IR')
  mobile: string

  @IsString()
  @Length(5, 5)
  otpCode: string
}