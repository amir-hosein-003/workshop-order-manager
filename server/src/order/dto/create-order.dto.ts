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
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsNumber()
  quantity: number;

  @IsEnum(['pending', 'in_progress', 'completed', 'canceled'] as const)
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  customerName?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsEnum(['low', 'normal', 'high'] as const)
  @IsOptional()
  priority?: string;

  @IsNumber()
  @IsOptional()
  progress?: number;

  @IsUUID()
  @IsOptional()
  createdBy?: string;
}
