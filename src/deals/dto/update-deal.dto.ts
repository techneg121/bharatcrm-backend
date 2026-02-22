import { DealStage } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateDealDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsEnum(DealStage)
  stage?: DealStage;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  probability?: number;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @IsString()
  leadId?: string;

  @IsOptional()
  @IsString()
  companyId?: string;
}
