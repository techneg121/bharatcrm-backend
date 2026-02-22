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
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let DealsService = class DealsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validateRefs(orgId, dto) {
        if (dto.ownerId) {
            const owner = await this.prisma.user.findFirst({
                where: { id: dto.ownerId, orgId },
            });
            if (!owner)
                throw new common_1.ForbiddenException('Invalid owner');
        }
        if (dto.leadId) {
            const lead = await this.prisma.lead.findFirst({
                where: { id: dto.leadId, orgId, deletedAt: null },
            });
            if (!lead)
                throw new common_1.ForbiddenException('Invalid lead');
        }
        if (dto.companyId) {
            const company = await this.prisma.company.findFirst({
                where: { id: dto.companyId, orgId },
            });
            if (!company)
                throw new common_1.ForbiddenException('Invalid company');
        }
    }
    async create(orgId, userId, dto) {
        await this.validateRefs(orgId, dto);
        return this.prisma.deal.create({
            data: {
                title: dto.title,
                value: dto.value,
                stage: dto.stage ?? client_1.DealStage.PROSPECT,
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
    async findAll(orgId, page = 1, limit = 20, q, stage) {
        if (page < 1 || limit < 1)
            throw new common_1.BadRequestException('Invalid pagination');
        const where = {
            orgId,
            ...(q ? { title: { contains: q, mode: 'insensitive' } } : {}),
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
    async findOne(id, orgId) {
        const deal = await this.prisma.deal.findFirst({
            where: { id, orgId },
            include: {
                owner: { select: { id: true, name: true, email: true, role: true } },
                company: true,
                lead: true,
                activities: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!deal)
            throw new common_1.NotFoundException('Deal not found');
        return deal;
    }
    async update(id, orgId, dto) {
        const existing = await this.prisma.deal.findFirst({ where: { id, orgId } });
        if (!existing)
            throw new common_1.NotFoundException('Deal not found');
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
    async remove(id, orgId) {
        const result = await this.prisma.deal.deleteMany({
            where: { id, orgId },
        });
        if (!result.count)
            throw new common_1.NotFoundException('Deal not found');
        return { success: true };
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealsService);
//# sourceMappingURL=deals.service.js.map