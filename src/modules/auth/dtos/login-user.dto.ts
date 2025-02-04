import { ApiProperty } from '@nestjs/swagger'
import { IsPhoneNumber, IsString, Length } from 'class-validator'

export class LoginUserDto {
  @IsString()
  @IsPhoneNumber('IR')
  @ApiProperty({type: String, description: 'phone-number', required: true})
  mobile: string

  @IsString()
  @Length(5, 5)
  @ApiProperty({type: String, description: 'otp-code', required: true})
  otpCode: string
}