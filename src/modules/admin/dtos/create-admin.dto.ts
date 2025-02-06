import { IsString, IsEmail, IsStrongPassword, Length } from 'class-validator'

export class CreateAdminDto {

  @IsString()
  @Length(5,20)
  userName: string

  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @Length(8, 20)
  // @IsStrongPassword()
  password: string

  @IsString()
  @Length(8, 20)
  // @IsStrongPassword()
  repeatPassword: string
}