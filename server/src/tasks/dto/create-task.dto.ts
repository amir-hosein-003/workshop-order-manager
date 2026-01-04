import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ required: true })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsEnum(['pending', 'in_progress', 'completed'] as const)
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  progress?: number;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  assignedToId?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  completedAt?: string;
}
