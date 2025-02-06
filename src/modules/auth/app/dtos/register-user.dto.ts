import { ApiProperty } from '@nestjs/swagger'
import { IsPhoneNumber, IsString } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  @IsPhoneNumber('IR')
  @ApiProperty({type: String, description: 'phone-number', required: true})
  mobile: string
}