import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    private getUserId;
    create(req: any, dto: CreateLeadDto): Promise<{
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
    findAll(req: any, page?: string, limit?: string, q?: string): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    addNote(id: string, req: any, body: {
        content: string;
    }): Promise<{
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
    update(id: string, req: any, dto: UpdateLeadDto): Promise<{
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
    remove(id: string, req: any): Promise<{
        success: boolean;
    }>;
    getAudit(id: string, req: any): Promise<{
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
