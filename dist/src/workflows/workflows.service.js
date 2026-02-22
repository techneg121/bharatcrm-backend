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
exports.WorkflowsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WorkflowsService = class WorkflowsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(orgId, dto) {
        return this.prisma.workflow.create({
            data: {
                name: dto.name,
                enabled: dto.enabled ?? true,
                trigger: dto.trigger,
                condition: dto.condition,
                action: dto.action,
                orgId,
            },
        });
    }
    async findAll(orgId, page = 1, limit = 20, q, enabled) {
        const where = {
            orgId,
            ...(q ? { name: { contains: q, mode: 'insensitive' } } : {}),
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
    async findOne(id, orgId) {
        const workflow = await this.prisma.workflow.findFirst({
            where: { id, orgId },
        });
        if (!workflow)
            throw new common_1.NotFoundException('Workflow not found');
        return workflow;
    }
    async update(id, orgId, dto) {
        const existing = await this.prisma.workflow.findFirst({ where: { id, orgId } });
        if (!existing)
            throw new common_1.NotFoundException('Workflow not found');
        const updateData = {
            ...(dto.name !== undefined ? { name: dto.name } : {}),
            ...(dto.enabled !== undefined ? { enabled: dto.enabled } : {}),
            ...(dto.trigger !== undefined
                ? { trigger: dto.trigger }
                : {}),
            ...(dto.condition !== undefined
                ? { condition: dto.condition }
                : {}),
            ...(dto.action !== undefined ? { action: dto.action } : {}),
        };
        return this.prisma.workflow.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id, orgId) {
        const result = await this.prisma.workflow.deleteMany({
            where: { id, orgId },
        });
        if (!result.count)
            throw new common_1.NotFoundException('Workflow not found');
        return { success: true };
    }
};
exports.WorkflowsService = WorkflowsService;
exports.WorkflowsService = WorkflowsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkflowsService);
//# sourceMappingURL=workflows.service.js.map