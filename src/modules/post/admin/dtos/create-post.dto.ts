import { IsString, IsNotEmpty, IsArray, IsInt, IsObject, IsOptional, ValidateNested, IsDefined, ArrayNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ImageDetailsDto {
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

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Title of the post', type: String })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Meta title of the post for SEO', type: String })
  metaTitle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Description of the post', type: String })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Meta description for SEO', type: String })
  metaDescription: string;

  @IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => ImageDetailsDto)
  @ApiProperty({ description: 'Thumbnail image details', type: ImageDetailsDto })
  thumbnail: ImageDetailsDto;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Alt text for the thumbnail image', type: String, required: false })
  thumbnailAltText?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ImageDetailsDto)
  @ApiProperty({
    description: 'Gallery of images related to the post',
    type: [ImageDetailsDto],
    required: false,
  })
  gallery?: ImageDetailsDto[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Matches(/^[a-zA-Z0-9-_]+$/, { each: true, message: 'Each tag must only contain letters, numbers, hyphens, or underscores.' })
  @ApiProperty({
    description: 'Array of tags related to the post. Tags can only contain letters, numbers, hyphens, and underscores.',
    type: [String],
  })
  tags: string[];
}