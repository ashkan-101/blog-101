import { IsNotEmpty, IsString, Length } from "class-validator";



export class CreateNotificationDto{
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  description: string
}