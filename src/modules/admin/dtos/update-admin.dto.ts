import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length, IsOptional } from "class-validator"


export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  @Length(5,20)
  @ApiProperty({type: String, required: true, description: 'set userName for admin'})
  userName: string

  @IsOptional()
  @IsString()
  @IsEmail()
  @ApiProperty({type: String, required: true, description: 'unique email create admin'})
  email: string
}