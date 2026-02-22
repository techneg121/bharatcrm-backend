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
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateCompanyDto) {
    return this.companiesService.create(req.user.orgId, dto);
  }

  @Get()
  findAll(
    @Req() req: any,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('q') q?: string,
  ) {
    return this.companiesService.findAll(req.user.orgId, Number(page), Number(limit), q);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.companiesService.findOne(id, req.user.orgId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.update(id, req.user.orgId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.companiesService.remove(id, req.user.orgId);
  }
}
