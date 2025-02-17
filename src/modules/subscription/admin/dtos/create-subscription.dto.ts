import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator'


export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 25)
  @ApiProperty({name: 'subscription-name', type: String, description: 'name for new subscription'})
  name: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'price for subscription -- IRT', type: Number, description: 'price for new subscription'})
  price: number

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ name: 'duration days', type: Number, description: 'duration days for new subscription'})
  durationDays: number
}