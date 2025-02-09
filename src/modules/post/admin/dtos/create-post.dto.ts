import { IsString, IsNotEmpty, IsArray, IsInt, IsObject, IsOptional, ValidateNested, IsDefined, ArrayNotEmpty, Matches, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ImageDetailsDto } from './image-details.dto';


export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Title of the post', type: String, required: true })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Meta title of the post for SEO', type: String, required: true  })
  metaTitle: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Description of the post', type: String, required: true  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Meta description for SEO', type: String, required: true  })
  metaDescription: string;

  @IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => ImageDetailsDto)
  @ApiProperty({ description: 'Thumbnail image details', type: ImageDetailsDto, required: true  })
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

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @ApiProperty({type: String, required: true, description: 'subcategory uuid for relation post'})
  subcategory: string
}