import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class UpdateWorkflowDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsObject()
  trigger?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  condition?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  action?: Record<string, unknown>;
}
