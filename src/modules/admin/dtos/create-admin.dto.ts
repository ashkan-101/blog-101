import { IsString, IsEmail, IsStrongPassword, Length, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateAdminDto {

  @IsNotEmpty()
  @IsString()
  @Length(5,20)
  @ApiProperty({type: String, required: true, description: 'set userName for admin'})
  userName: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({type: String, required: true, description: 'unique email create admin'})
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  // @IsStrongPassword()
  @ApiProperty({type: String, required: true, description: 'set strong password for admin account'})
  password: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @ApiProperty({type: String, required: true, description: 'repeqt password for admin'})
  // @IsStrongPassword()
  repeatPassword: string
}