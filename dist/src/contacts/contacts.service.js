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
exports.ContactsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContactsService = class ContactsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async validateRefs(orgId, dto) {
        if (dto.companyId) {
            const company = await this.prisma.company.findFirst({
                where: { id: dto.companyId, orgId },
            });
            if (!company)
                throw new common_1.ForbiddenException('Invalid company');
        }
        if (dto.leadId) {
            const lead = await this.prisma.lead.findFirst({
                where: { id: dto.leadId, orgId, deletedAt: null },
            });
            if (!lead)
                throw new common_1.ForbiddenException('Invalid lead');
        }
    }
    async create(orgId, dto) {
        await this.validateRefs(orgId, dto);
        return this.prisma.contact.create({
            data: { ...dto, orgId },
            include: { company: true, lead: true },
        });
    }
    async findAll(orgId, page = 1, limit = 20, q) {
        const where = {
            orgId,
            ...(q
                ? {
                    OR: [
                        { name: { contains: q, mode: 'insensitive' } },
                        { email: { contains: q, mode: 'insensitive' } },
                        { phone: { contains: q, mode: 'insensitive' } },
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
    async findOne(id, orgId) {
        const contact = await this.prisma.contact.findFirst({
            where: { id, orgId },
            include: { company: true, lead: true },
        });
        if (!contact)
            throw new common_1.NotFoundException('Contact not found');
        return contact;
    }
    async update(id, orgId, dto) {
        const existing = await this.prisma.contact.findFirst({ where: { id, orgId } });
        if (!existing)
            throw new common_1.NotFoundException('Contact not found');
        await this.validateRefs(orgId, dto);
        return this.prisma.contact.update({
            where: { id },
            data: dto,
            include: { company: true, lead: true },
        });
    }
    async remove(id, orgId) {
        const result = await this.prisma.contact.deleteMany({ where: { id, orgId } });
        if (!result.count)
            throw new common_1.NotFoundException('Contact not found');
        return { success: true };
    }
};
exports.ContactsService = ContactsService;
exports.ContactsService = ContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactsService);
//# sourceMappingURL=contacts.service.js.map