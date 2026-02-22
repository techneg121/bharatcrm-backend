import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateWorkflowDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsObject()
  trigger: Record<string, unknown>;

  @IsObject()
  condition: Record<string, unknown>;

  @IsObject()
  action: Record<string, unknown>;
}
