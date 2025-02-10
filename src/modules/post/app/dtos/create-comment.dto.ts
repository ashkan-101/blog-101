import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateCommentDto {
  
  @IsString()
  @IsNotEmpty()
  @Length(5, 25)
  @ApiProperty({type: String, required: true, description: 'title for comment'})
  title: string;
  
  @IsString()
  @IsNotEmpty()
  @Length(10, 60)
  @ApiProperty({type: String, required: true, description: 'description for comment'})
  description: string;
}