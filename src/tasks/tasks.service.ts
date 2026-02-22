import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  private parseDueDate(dueDate?: string) {
    if (!dueDate) return undefined;
    const parsed = new Date(dueDate);
    if (Number.isNaN(parsed.getTime())) {
      throw new BadRequestException('Invalid dueDate');
    }
    return parsed;
  }

  private async validateRefs(
    orgId: string,
    dto: { userId?: string; leadId?: string; dealId?: string },
  ) {
    if (dto.userId) {
      const user = await this.prisma.user.findFirst({
        where: { id: dto.userId, orgId },
      });
      if (!user) throw new ForbiddenException('Invalid task owner');
    }

    if (dto.leadId) {
      const lead = await this.prisma.lead.findFirst({
        where: { id: dto.leadId, orgId, deletedAt: null },
      });
      if (!lead) throw new ForbiddenException('Invalid lead');
    }

    if (dto.dealId) {
      const deal = await this.prisma.deal.findFirst({
        where: { id: dto.dealId, orgId },
      });
      if (!deal) throw new ForbiddenException('Invalid deal');
    }
  }

  async create(orgId: string, requestUserId: string, dto: CreateTaskDto) {
    const userId = dto.userId ?? requestUserId;
    await this.validateRefs(orgId, { ...dto, userId });

    return this.prisma.task.create({
      data: {
        title: dto.title,
        dueDate: this.parseDueDate(dto.dueDate),
        completed: dto.completed ?? false,
        userId,
        leadId: dto.leadId,
        dealId: dto.dealId,
        orgId,
      },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });
  }

  async findAll(orgId: string, page = 1, limit = 20, q?: string, completed?: boolean) {
    const where = {
      orgId,
      ...(q ? { title: { contains: q, mode: 'insensitive' as const } } : {}),
      ...(completed === undefined ? {} : { completed }),
    };

    const [items, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true, role: true } },
        },
      }),
      this.prisma.task.count({ where }),
    ]);

    return { items, page, limit, total };
  }

  async findOne(id: string, orgId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, orgId },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, orgId: string, dto: UpdateTaskDto) {
    const existing = await this.prisma.task.findFirst({ where: { id, orgId } });
    if (!existing) throw new NotFoundException('Task not found');

    await this.validateRefs(orgId, dto);

    return this.prisma.task.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.completed !== undefined ? { completed: dto.completed } : {}),
        ...(dto.userId !== undefined ? { userId: dto.userId } : {}),
        ...(dto.leadId !== undefined ? { leadId: dto.leadId } : {}),
        ...(dto.dealId !== undefined ? { dealId: dto.dealId } : {}),
        ...(dto.dueDate !== undefined ? { dueDate: this.parseDueDate(dto.dueDate) } : {}),
      },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
      },
    });
  }

  async remove(id: string, orgId: string) {
    const result = await this.prisma.task.deleteMany({
      where: { id, orgId },
    });
    if (!result.count) throw new NotFoundException('Task not found');
    return { success: true };
  }
}
