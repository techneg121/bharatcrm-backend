import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DealStage } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  private async validateRefs(orgId: string, dto: { ownerId?: string; leadId?: string; companyId?: string }) {
    if (dto.ownerId) {
      const owner = await this.prisma.user.findFirst({
        where: { id: dto.ownerId, orgId },
      });
      if (!owner) throw new ForbiddenException('Invalid owner');
    }

    if (dto.leadId) {
      const lead = await this.prisma.lead.findFirst({
        where: { id: dto.leadId, orgId, deletedAt: null },
      });
      if (!lead) throw new ForbiddenException('Invalid lead');
    }

    if (dto.companyId) {
      const company = await this.prisma.company.findFirst({
        where: { id: dto.companyId, orgId },
      });
      if (!company) throw new ForbiddenException('Invalid company');
    }
  }

  async create(orgId: string, userId: string, dto: CreateDealDto) {
    await this.validateRefs(orgId, dto);

    return this.prisma.deal.create({
      data: {
        title: dto.title,
        value: dto.value,
        stage: dto.stage ?? DealStage.PROSPECT,
        probability: dto.probability,
        ownerId: dto.ownerId ?? userId,
        leadId: dto.leadId,
        companyId: dto.companyId,
        orgId,
      },
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
        company: true,
        lead: true,
      },
    });
  }

  async findAll(orgId: string, page = 1, limit = 20, q?: string, stage?: DealStage) {
    if (page < 1 || limit < 1) throw new BadRequestException('Invalid pagination');

    const where = {
      orgId,
      ...(q ? { title: { contains: q, mode: 'insensitive' as const } } : {}),
      ...(stage ? { stage } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.deal.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          owner: { select: { id: true, name: true, email: true, role: true } },
          company: true,
          lead: true,
        },
      }),
      this.prisma.deal.count({ where }),
    ]);

    return { items, page, limit, total };
  }

  async findOne(id: string, orgId: string) {
    const deal = await this.prisma.deal.findFirst({
      where: { id, orgId },
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
        company: true,
        lead: true,
        activities: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!deal) throw new NotFoundException('Deal not found');
    return deal;
  }

  async update(id: string, orgId: string, dto: UpdateDealDto) {
    const existing = await this.prisma.deal.findFirst({ where: { id, orgId } });
    if (!existing) throw new NotFoundException('Deal not found');

    await this.validateRefs(orgId, dto);

    return this.prisma.deal.update({
      where: { id },
      data: dto,
      include: {
        owner: { select: { id: true, name: true, email: true, role: true } },
        company: true,
        lead: true,
      },
    });
  }

  async remove(id: string, orgId: string) {
    const result = await this.prisma.deal.deleteMany({
      where: { id, orgId },
    });

    if (!result.count) throw new NotFoundException('Deal not found');
    return { success: true };
  }
}
