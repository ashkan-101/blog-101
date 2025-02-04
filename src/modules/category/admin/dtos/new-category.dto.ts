import { IsString, MaxLength } from 'class-validator'

export class NewCategoryDto {
  @IsString()
  @MaxLength(25)
  title: string
}