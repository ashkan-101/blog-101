import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator'

export class NewSubcategoryDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(25)
  @ApiProperty({type: String, maxLength: 25, required: true, description: 'subcategory-title'})
  title: string

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({type: String, maxLength: 25, required: true, description: 'subcategory-title-UUID'})
  categoryId: string
}