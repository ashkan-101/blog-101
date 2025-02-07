import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"


export class SignInAdminDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({type: String, required: true, description: 'admin email'})
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  // @IsStrongPassword()
  @ApiProperty({type: String, required: true, description: 'admin password'})
  password: string
}