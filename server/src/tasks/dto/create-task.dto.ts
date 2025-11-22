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
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(['pending', 'in_progress', 'completed'] as const)
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsNumber()
  progress?: number;

  @IsUUID()
  @IsOptional()
  assignedToId?: string;

  @IsOptional()
  @IsDateString()
  startedAt?: string;

  @IsOptional()
  @IsDateString()
  completedAt?: string;
}
