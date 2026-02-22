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
import { DealStage } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DealsService } from './deals.service';

@UseGuards(JwtAuthGuard)
@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  private getUserId(req: any) {
    return req.user?.sub ?? req.user?.id;
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateDealDto) {
    return this.dealsService.create(req.user.orgId, this.getUserId(req), dto);
  }

  @Get()
  findAll(
    @Req() req: any,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('q') q?: string,
    @Query('stage') stage?: DealStage,
  ) {
    return this.dealsService.findAll(
      req.user.orgId,
      Number(page),
      Number(limit),
      q,
      stage,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.dealsService.findOne(id, req.user.orgId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdateDealDto) {
    return this.dealsService.update(id, req.user.orgId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.dealsService.remove(id, req.user.orgId);
  }
}
