import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, MaxLength } from 'class-validator'

export class NewSubcategoryDto {

  @IsString()
  @MaxLength(25)
  @ApiProperty({type: String, maxLength: 25, required: true, description: 'subcategory-title'})
  title: string

  @IsString()
  @IsUUID()
  @ApiProperty({type: String, maxLength: 25, required: true, description: 'subcategory-title-UUID'})
  categoryId: string
}