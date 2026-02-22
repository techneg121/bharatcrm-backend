import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  source?: string;
}
