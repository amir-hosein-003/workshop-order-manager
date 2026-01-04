import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  images: string[];

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  category: string;
}
