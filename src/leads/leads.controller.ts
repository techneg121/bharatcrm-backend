import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@UseGuards(JwtAuthGuard)
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  private getUserId(req: any) {
    return req.user?.sub ?? req.user?.id;
  }

  /**
   * =========================
   * CREATE
   * =========================
   */
  @Post()
  create(@Req() req: any, @Body() dto: CreateLeadDto) {
    return this.leadsService.create(req.user.orgId, this.getUserId(req), dto);
  }

  /**
   * =========================
   * LIST
   * =========================
   */
  @Get()
  findAll(
    @Req() req: any,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('q') q?: string,
  ) {
    return this.leadsService.findAll(
      req.user.orgId,
      Number(page),
      Number(limit),
      q,
    );
  }

  /**
   * =========================
   * DETAIL
   * =========================
   */
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.leadsService.findOne(id, req.user.orgId);
  }

  @Post(':id/notes')
  addNote(
    @Param('id') id: string,
    @Req() req: any,
    @Body() body: { content: string },
  ) {
    return this.leadsService.addNote(
      id,
      req.user.orgId,
      this.getUserId(req),
      body.content,
    );
  }

  /**
   * =========================
   * UPDATE
   * =========================
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() dto: UpdateLeadDto,
  ) {
    return this.leadsService.update(
      id,
      req.user.orgId,
      this.getUserId(req),
      dto,
    );
  }

  /**
   * =========================
   * DELETE
   * =========================
   */
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.leadsService.remove(
      id,
      req.user.orgId,
      this.getUserId(req),
    );
  }

  @Get(':id/audit')
getAudit(@Param('id') id: string, @Req() req) {
  return this.leadsService.getAuditLogs(id, req.user.orgId);
}

}
