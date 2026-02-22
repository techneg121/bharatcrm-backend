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
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  private getUserId(req: any) {
    return req.user?.sub ?? req.user?.id;
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(req.user.orgId, this.getUserId(req), dto);
  }

  @Get()
  findAll(
    @Req() req: any,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('q') q?: string,
    @Query('completed') completed?: string,
  ) {
    return this.tasksService.findAll(
      req.user.orgId,
      Number(page),
      Number(limit),
      q,
      completed === undefined ? undefined : completed === 'true',
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.findOne(id, req.user.orgId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update(id, req.user.orgId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.tasksService.remove(id, req.user.orgId);
  }
}
