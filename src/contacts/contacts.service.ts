import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  private async validateRefs(orgId: string, dto: { companyId?: string; leadId?: string }) {
    if (dto.companyId) {
      const company = await this.prisma.company.findFirst({
        where: { id: dto.companyId, orgId },
      });
      if (!company) throw new ForbiddenException('Invalid company');
    }

    if (dto.leadId) {
      const lead = await this.prisma.lead.findFirst({
        where: { id: dto.leadId, orgId, deletedAt: null },
      });
      if (!lead) throw new ForbiddenException('Invalid lead');
    }
  }

  async create(orgId: string, dto: CreateContactDto) {
    await this.validateRefs(orgId, dto);
    return this.prisma.contact.create({
      data: { ...dto, orgId },
      include: { company: true, lead: true },
    });
  }

  async findAll(orgId: string, page = 1, limit = 20, q?: string) {
    const where = {
      orgId,
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' as const } },
              { email: { contains: q, mode: 'insensitive' as const } },
              { phone: { contains: q, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.contact.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { company: true, lead: true },
      }),
      this.prisma.contact.count({ where }),
    ]);

    return { items, page, limit, total };
  }

  async findOne(id: string, orgId: string) {
    const contact = await this.prisma.contact.findFirst({
      where: { id, orgId },
      include: { company: true, lead: true },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    return contact;
  }

  async update(id: string, orgId: string, dto: UpdateContactDto) {
    const existing = await this.prisma.contact.findFirst({ where: { id, orgId } });
    if (!existing) throw new NotFoundException('Contact not found');

    await this.validateRefs(orgId, dto);

    return this.prisma.contact.update({
      where: { id },
      data: dto,
      include: { company: true, lead: true },
    });
  }

  async remove(id: string, orgId: string) {
    const result = await this.prisma.contact.deleteMany({ where: { id, orgId } });
    if (!result.count) throw new NotFoundException('Contact not found');
    return { success: true };
  }
}
