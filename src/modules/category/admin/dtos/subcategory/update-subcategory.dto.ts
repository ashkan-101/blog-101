import { IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateSubcategoryDto {
  @IsString()
  @MaxLength(25)
  @ApiProperty({type: String, maxLength: 25, required: true, description: 'subCategory-title'})
  title: string
}