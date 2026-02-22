import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SystemEvent } from '../common/events/event.types';
import { ActivityType } from '@prisma/client';

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private eventBus: EventEmitter2,
  ) {}

  /**
   * =========================
   * CREATE
   * =========================
   */
  async create(orgId: string, userId: string, dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        ...dto,
        orgId,
        ownerId: userId,
      },
    });

    await this.prisma.activity.create({
      data: {
        type: ActivityType.NOTE,
        content: 'Lead created',
        leadId: lead.id,
        userId,
        orgId,
      },
    });

    this.eventBus.emit(SystemEvent.LEAD_CREATED, {
      leadId: lead.id,
      orgId,
      userId,
    });

    return lead;
  }

  /**
   * =========================
   * LIST
   * =========================
   */
  async findAll(orgId: string, page = 1, limit = 20, q?: string) {
    const where: any = {
      orgId,
      deletedAt: null,
      ...(q && {
        title: { contains: q, mode: 'insensitive' },
      }),
    };

    const [items, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        include: {
          owner: {
            select: { id: true, name: true, email: true, role: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      items,
      page,
      limit,
      total,
    };
  }

  /**
   * =========================
   * DETAIL
   * =========================
   */
  async findOne(id: string, orgId: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, orgId, deletedAt: null },
      include: {
        owner: {
          select: { id: true, name: true, email: true, role: true },
        },
        activities: {
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: { id: true, name: true, email: true, role: true },
            },
          },
        },
      },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return lead;
  }

  /**
   * =========================
   * UPDATE
   * =========================
   */
  async update(
    id: string,
    orgId: string,
    userId: string,
    dto: UpdateLeadDto,
  ) {
    const existing = await this.prisma.lead.findFirst({
      where: { id, orgId, deletedAt: null },
    });

    if (!existing) {
      throw new ForbiddenException();
    }

    /**
     * Validate owner belongs to org
     */
    if (dto.ownerId) {
      const owner = await this.prisma.user.findFirst({
        where: { id: dto.ownerId, orgId },
      });

      if (!owner) {
        throw new ForbiddenException('Invalid owner');
      }
    }

    /**
     * Safe update
     */
    const result = await this.prisma.lead.updateMany({
      where: { id, orgId },
      data: dto,
    });

    if (result.count === 0) {
      throw new ForbiddenException();
    }

    await this.prisma.activity.create({
      data: {
        type: ActivityType.STATUS_CHANGE,
        content: 'Lead updated',
        leadId: id,
        userId,
        orgId,
      },
    });

    /**
     * Event: Status Change
     */
    if (dto.status && dto.status !== existing.status) {
      this.eventBus.emit(SystemEvent.LEAD_STATUS_CHANGED, {
        leadId: id,
        orgId,
        userId,
        from: existing.status,
        to: dto.status,
      });
    }

    /**
     * Event: Assignment
     */
    if (dto.ownerId && dto.ownerId !== existing.ownerId) {
      this.eventBus.emit(SystemEvent.LEAD_ASSIGNED, {
        leadId: id,
        orgId,
        userId,
        to: dto.ownerId,
      });
    }

    this.eventBus.emit(SystemEvent.LEAD_UPDATED, {
      leadId: id,
      orgId,
      userId,
    });

    return this.prisma.lead.findUnique({
      where: { id },
    });
  }

  async addNote(id: string, orgId: string, userId: string, content: string) {
    const lead = await this.prisma.lead.findFirst({
      where: { id, orgId, deletedAt: null },
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    await this.prisma.activity.create({
      data: {
        type: ActivityType.NOTE,
        content,
        leadId: id,
        userId,
        orgId,
      },
    });

    return this.findOne(id, orgId);
  }

  /**
   * =========================
   * DELETE (SOFT DELETE)
   * =========================
   */
  async remove(id: string, orgId: string, userId: string) {
    const existing = await this.prisma.lead.findFirst({
      where: { id, orgId, deletedAt: null },
    });

    if (!existing) {
      throw new ForbiddenException();
    }

    await this.prisma.activity.create({
      data: {
        type: ActivityType.NOTE,
        content: 'Lead deleted',
        leadId: id,
        userId,
        orgId,
      },
    });

    this.eventBus.emit(SystemEvent.LEAD_DELETED, {
      leadId: id,
      orgId,
      userId,
    });

    await this.prisma.lead.updateMany({
      where: { id, orgId },
      data: { deletedAt: new Date() },
    });

    return { success: true };
  }

  private async createAuditLogs(
  entity: string,
  entityId: string,
  orgId: string,
  userId: string,
  before: any,
  after: any,
) {
  const keys = Object.keys(after);

  const logs = keys
    .filter((k) => before[k] !== after[k])
    .map((k) => ({
      entity,
      entityId,
      field: k,
      fromValue: before[k]?.toString() ?? null,
      toValue: after[k]?.toString() ?? null,
      userId,
      orgId,
    }));

  if (!logs.length) return;

  await this.prisma.auditLog.createMany({ data: logs });
}

async getAuditLogs(leadId: string, orgId: string) {
  return this.prisma.auditLog.findMany({
    where: {
      entity: 'LEAD',
      entityId: leadId,
      orgId,
    },
    orderBy: { createdAt: 'desc' },
  });
}

}
