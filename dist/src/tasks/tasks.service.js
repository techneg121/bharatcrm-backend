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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    parseDueDate(dueDate) {
        if (!dueDate)
            return undefined;
        const parsed = new Date(dueDate);
        if (Number.isNaN(parsed.getTime())) {
            throw new common_1.BadRequestException('Invalid dueDate');
        }
        return parsed;
    }
    async validateRefs(orgId, dto) {
        if (dto.userId) {
            const user = await this.prisma.user.findFirst({
                where: { id: dto.userId, orgId },
            });
            if (!user)
                throw new common_1.ForbiddenException('Invalid task owner');
        }
        if (dto.leadId) {
            const lead = await this.prisma.lead.findFirst({
                where: { id: dto.leadId, orgId, deletedAt: null },
            });
            if (!lead)
                throw new common_1.ForbiddenException('Invalid lead');
        }
        if (dto.dealId) {
            const deal = await this.prisma.deal.findFirst({
                where: { id: dto.dealId, orgId },
            });
            if (!deal)
                throw new common_1.ForbiddenException('Invalid deal');
        }
    }
    async create(orgId, requestUserId, dto) {
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
    async findAll(orgId, page = 1, limit = 20, q, completed) {
        const where = {
            orgId,
            ...(q ? { title: { contains: q, mode: 'insensitive' } } : {}),
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
    async findOne(id, orgId) {
        const task = await this.prisma.task.findFirst({
            where: { id, orgId },
            include: {
                user: { select: { id: true, name: true, email: true, role: true } },
            },
        });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        return task;
    }
    async update(id, orgId, dto) {
        const existing = await this.prisma.task.findFirst({ where: { id, orgId } });
        if (!existing)
            throw new common_1.NotFoundException('Task not found');
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
    async remove(id, orgId) {
        const result = await this.prisma.task.deleteMany({
            where: { id, orgId },
        });
        if (!result.count)
            throw new common_1.NotFoundException('Task not found');
        return { success: true };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map