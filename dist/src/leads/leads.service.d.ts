import { PrismaService } from '../prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class LeadsService {
    private prisma;
    private eventBus;
    constructor(prisma: PrismaService, eventBus: EventEmitter2);
    create(orgId: string, userId: string, dto: CreateLeadDto): Promise<{
        id: string;
        createdAt: Date;
        email: string | null;
        orgId: string;
        title: string;
        company: string | null;
        phone: string | null;
        value: number | null;
        source: string | null;
        status: import("@prisma/client").$Enums.LeadStatus;
        score: number | null;
        aiSummary: string | null;
        updatedAt: Date;
        deletedAt: Date | null;
        ownerId: string | null;
    }>;
    findAll(orgId: string, page?: number, limit?: number, q?: string): Promise<{
        items: ({
            owner: {
                id: string;
                name: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            email: string | null;
            orgId: string;
            title: string;
            company: string | null;
            phone: string | null;
            value: number | null;
            source: string | null;
            status: import("@prisma/client").$Enums.LeadStatus;
            score: number | null;
            aiSummary: string | null;
            updatedAt: Date;
            deletedAt: Date | null;
            ownerId: string | null;
        })[];
        page: number;
        limit: number;
        total: number;
    }>;
    findOne(id: string, orgId: string): Promise<{
        activities: ({
            user: {
                id: string;
                name: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            orgId: string;
            type: import("@prisma/client").$Enums.ActivityType;
            content: string | null;
            leadId: string | null;
            dealId: string | null;
            userId: string | null;
        })[];
        owner: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        email: string | null;
        orgId: string;
        title: string;
        company: string | null;
        phone: string | null;
        value: number | null;
        source: string | null;
        status: import("@prisma/client").$Enums.LeadStatus;
        score: number | null;
        aiSummary: string | null;
        updatedAt: Date;
        deletedAt: Date | null;
        ownerId: string | null;
    }>;
    update(id: string, orgId: string, userId: string, dto: UpdateLeadDto): Promise<{
        id: string;
        createdAt: Date;
        email: string | null;
        orgId: string;
        title: string;
        company: string | null;
        phone: string | null;
        value: number | null;
        source: string | null;
        status: import("@prisma/client").$Enums.LeadStatus;
        score: number | null;
        aiSummary: string | null;
        updatedAt: Date;
        deletedAt: Date | null;
        ownerId: string | null;
    } | null>;
    addNote(id: string, orgId: string, userId: string, content: string): Promise<{
        activities: ({
            user: {
                id: string;
                name: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            orgId: string;
            type: import("@prisma/client").$Enums.ActivityType;
            content: string | null;
            leadId: string | null;
            dealId: string | null;
            userId: string | null;
        })[];
        owner: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        email: string | null;
        orgId: string;
        title: string;
        company: string | null;
        phone: string | null;
        value: number | null;
        source: string | null;
        status: import("@prisma/client").$Enums.LeadStatus;
        score: number | null;
        aiSummary: string | null;
        updatedAt: Date;
        deletedAt: Date | null;
        ownerId: string | null;
    }>;
    remove(id: string, orgId: string, userId: string): Promise<{
        success: boolean;
    }>;
    private createAuditLogs;
    getAuditLogs(leadId: string, orgId: string): Promise<{
        id: string;
        createdAt: Date;
        orgId: string;
        userId: string;
        entity: string;
        entityId: string;
        field: string;
        fromValue: string | null;
        toValue: string | null;
    }[]>;
}
