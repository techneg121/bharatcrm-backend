import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(orgId: string, dto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: { ...dto, orgId },
    });
  }

  async findAll(orgId: string, page = 1, limit = 20, q?: string) {
    const where = {
      orgId,
      ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
    };

    const [items, total] = await Promise.all([
      this.prisma.company.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.company.count({ where }),
    ]);

    return { items, page, limit, total };
  }

  async findOne(id: string, orgId: string) {
    const company = await this.prisma.company.findFirst({
      where: { id, orgId },
      include: { contacts: true, deals: true },
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: string, orgId: string, dto: UpdateCompanyDto) {
    const existing = await this.prisma.company.findFirst({ where: { id, orgId } });
    if (!existing) throw new NotFoundException('Company not found');

    return this.prisma.company.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, orgId: string) {
    const result = await this.prisma.company.deleteMany({
      where: { id, orgId },
    });
    if (!result.count) throw new NotFoundException('Company not found');
    return { success: true };
  }
}
