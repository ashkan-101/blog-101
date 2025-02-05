import { IsString, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class NewCategoryDto {
  @IsString()
  @MaxLength(25)
  @ApiProperty({type: String, maxLength: 25, required: true, description: 'category-title'})
  title: string
}