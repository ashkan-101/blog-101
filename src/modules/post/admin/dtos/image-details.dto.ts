import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class ImageDetailsDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Position of the image in the gallery or as a thumbnail', type: Number })
  position: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The path where the image is stored', type: String })
  imagePath: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the image file', type: String })
  imageName: string;
}