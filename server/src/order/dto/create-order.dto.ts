import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ required: true })
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsEnum(['pending', 'in_progress', 'completed', 'canceled'] as const)
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  customerName?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty()
  @IsEnum(['low', 'normal', 'high'] as const)
  @IsOptional()
  priority?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  progress?: number;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  createdBy?: string;
}
