import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';

@Injectable()
export class WorkflowsService {
  constructor(private prisma: PrismaService) {}

  async create(orgId: string, dto: CreateWorkflowDto) {
    return this.prisma.workflow.create({
      data: {
        name: dto.name,
        enabled: dto.enabled ?? true,
        trigger: dto.trigger as Prisma.InputJsonValue,
        condition: dto.condition as Prisma.InputJsonValue,
        action: dto.action as Prisma.InputJsonValue,
        orgId,
      },
    });
  }

  async findAll(orgId: string, page = 1, limit = 20, q?: string, enabled?: boolean) {
    const where = {
      orgId,
      ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
      ...(enabled === undefined ? {} : { enabled }),
    };

    const [items, total] = await Promise.all([
      this.prisma.workflow.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.workflow.count({ where }),
    ]);

    return { items, page, limit, total };
  }

  async findOne(id: string, orgId: string) {
    const workflow = await this.prisma.workflow.findFirst({
      where: { id, orgId },
    });
    if (!workflow) throw new NotFoundException('Workflow not found');
    return workflow;
  }

  async update(id: string, orgId: string, dto: UpdateWorkflowDto) {
    const existing = await this.prisma.workflow.findFirst({ where: { id, orgId } });
    if (!existing) throw new NotFoundException('Workflow not found');

    const updateData = {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.enabled !== undefined ? { enabled: dto.enabled } : {}),
      ...(dto.trigger !== undefined
        ? { trigger: dto.trigger as Prisma.InputJsonValue }
        : {}),
      ...(dto.condition !== undefined
        ? { condition: dto.condition as Prisma.InputJsonValue }
        : {}),
      ...(dto.action !== undefined ? { action: dto.action as Prisma.InputJsonValue } : {}),
    };

    return this.prisma.workflow.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: string, orgId: string) {
    const result = await this.prisma.workflow.deleteMany({
      where: { id, orgId },
    });
    if (!result.count) throw new NotFoundException('Workflow not found');
    return { success: true };
  }
}
