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
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateContactDto) {
    return this.contactsService.create(req.user.orgId, dto);
  }

  @Get()
  findAll(
    @Req() req: any,
    @Query('page') page = '1',
    @Query('limit') limit = '20',
    @Query('q') q?: string,
  ) {
    return this.contactsService.findAll(req.user.orgId, Number(page), Number(limit), q);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.contactsService.findOne(id, req.user.orgId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Req() req: any, @Body() dto: UpdateContactDto) {
    return this.contactsService.update(id, req.user.orgId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.contactsService.remove(id, req.user.orgId);
  }
}
