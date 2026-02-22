"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const event_types_1 = require("../common/events/event.types");
const client_1 = require("@prisma/client");
let LeadsService = class LeadsService {
    prisma;
    eventBus;
    constructor(prisma, eventBus) {
        this.prisma = prisma;
        this.eventBus = eventBus;
    }
    async create(orgId, userId, dto) {
        const lead = await this.prisma.lead.create({
            data: {
                ...dto,
                orgId,
                ownerId: userId,
            },
        });
        await this.prisma.activity.create({
            data: {
                type: client_1.ActivityType.NOTE,
                content: 'Lead created',
                leadId: lead.id,
                userId,
                orgId,
            },
        });
        this.eventBus.emit(event_types_1.SystemEvent.LEAD_CREATED, {
            leadId: lead.id,
            orgId,
            userId,
        });
        return lead;
    }
    async findAll(orgId, page = 1, limit = 20, q) {
        const where = {
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
    async findOne(id, orgId) {
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
            throw new common_1.NotFoundException('Lead not found');
        }
        return lead;
    }
    async update(id, orgId, userId, dto) {
        const existing = await this.prisma.lead.findFirst({
            where: { id, orgId, deletedAt: null },
        });
        if (!existing) {
            throw new common_1.ForbiddenException();
        }
        if (dto.ownerId) {
            const owner = await this.prisma.user.findFirst({
                where: { id: dto.ownerId, orgId },
            });
            if (!owner) {
                throw new common_1.ForbiddenException('Invalid owner');
            }
        }
        const result = await this.prisma.lead.updateMany({
            where: { id, orgId },
            data: dto,
        });
        if (result.count === 0) {
            throw new common_1.ForbiddenException();
        }
        await this.prisma.activity.create({
            data: {
                type: client_1.ActivityType.STATUS_CHANGE,
                content: 'Lead updated',
                leadId: id,
                userId,
                orgId,
            },
        });
        if (dto.status && dto.status !== existing.status) {
            this.eventBus.emit(event_types_1.SystemEvent.LEAD_STATUS_CHANGED, {
                leadId: id,
                orgId,
                userId,
                from: existing.status,
                to: dto.status,
            });
        }
        if (dto.ownerId && dto.ownerId !== existing.ownerId) {
            this.eventBus.emit(event_types_1.SystemEvent.LEAD_ASSIGNED, {
                leadId: id,
                orgId,
                userId,
                to: dto.ownerId,
            });
        }
        this.eventBus.emit(event_types_1.SystemEvent.LEAD_UPDATED, {
            leadId: id,
            orgId,
            userId,
        });
        return this.prisma.lead.findUnique({
            where: { id },
        });
    }
    async addNote(id, orgId, userId, content) {
        const lead = await this.prisma.lead.findFirst({
            where: { id, orgId, deletedAt: null },
        });
        if (!lead) {
            throw new common_1.NotFoundException('Lead not found');
        }
        await this.prisma.activity.create({
            data: {
                type: client_1.ActivityType.NOTE,
                content,
                leadId: id,
                userId,
                orgId,
            },
        });
        return this.findOne(id, orgId);
    }
    async remove(id, orgId, userId) {
        const existing = await this.prisma.lead.findFirst({
            where: { id, orgId, deletedAt: null },
        });
        if (!existing) {
            throw new common_1.ForbiddenException();
        }
        await this.prisma.activity.create({
            data: {
                type: client_1.ActivityType.NOTE,
                content: 'Lead deleted',
                leadId: id,
                userId,
                orgId,
            },
        });
        this.eventBus.emit(event_types_1.SystemEvent.LEAD_DELETED, {
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
    async createAuditLogs(entity, entityId, orgId, userId, before, after) {
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
        if (!logs.length)
            return;
        await this.prisma.auditLog.createMany({ data: logs });
    }
    async getAuditLogs(leadId, orgId) {
        return this.prisma.auditLog.findMany({
            where: {
                entity: 'LEAD',
                entityId: leadId,
                orgId,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], LeadsService);
//# sourceMappingURL=leads.service.js.map