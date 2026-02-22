import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { WorkflowsService } from './workflows.service';

@UseGuards(JwtAuthGuard)
@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateWorkflowDto) {
    return this.workflowsService.create(req.user.orgId, dto);
  }

  @Get()
  findAll(
    @Req() req: any,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('q') q?: string,
    @Query('enabled') enabled?: string,
  ) {
    return this.workflowsService.findAll(
      req.user.orgId,
      Number(page),
      Number(limit),
      q,
      enabled === undefined ? undefined : enabled === 'true',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.workflowsService.findOne(id, req.user.orgId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdateWorkflowDto) {
    return this.workflowsService.update(id, req.user.orgId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.workflowsService.remove(id, req.user.orgId);
  }
}
