import { DealStage } from '@prisma/client';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { DealsService } from './deals.service';
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    private getUserId;
    create(req: any, dto: CreateDealDto): Promise<{
        company: {
            id: string;
            name: string;
            createdAt: Date;
            orgId: string;
            industry: string | null;
        } | null;
        owner: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        } | null;
        lead: {
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
        } | null;
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        title: string;
        value: number | null;
        updatedAt: Date;
        ownerId: string | null;
        leadId: string | null;
        stage: import("@prisma/client").$Enums.DealStage;
        probability: number | null;
        companyId: string | null;
    }>;
    findAll(req: any, page?: string, limit?: string, q?: string, stage?: DealStage): Promise<{
        items: ({
            company: {
                id: string;
                name: string;
                createdAt: Date;
                orgId: string;
                industry: string | null;
            } | null;
            owner: {
                id: string;
                name: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
            } | null;
            lead: {
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
            } | null;
        } & {
            id: string;
            createdAt: Date;
            orgId: string;
            title: string;
            value: number | null;
            updatedAt: Date;
            ownerId: string | null;
            leadId: string | null;
            stage: import("@prisma/client").$Enums.DealStage;
            probability: number | null;
            companyId: string | null;
        })[];
        page: number;
        limit: number;
        total: number;
    }>;
    findOne(id: string, req: any): Promise<{
        activities: {
            id: string;
            createdAt: Date;
            orgId: string;
            type: import("@prisma/client").$Enums.ActivityType;
            content: string | null;
            leadId: string | null;
            dealId: string | null;
            userId: string | null;
        }[];
        company: {
            id: string;
            name: string;
            createdAt: Date;
            orgId: string;
            industry: string | null;
        } | null;
        owner: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        } | null;
        lead: {
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
        } | null;
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        title: string;
        value: number | null;
        updatedAt: Date;
        ownerId: string | null;
        leadId: string | null;
        stage: import("@prisma/client").$Enums.DealStage;
        probability: number | null;
        companyId: string | null;
    }>;
    update(id: string, req: any, dto: UpdateDealDto): Promise<{
        company: {
            id: string;
            name: string;
            createdAt: Date;
            orgId: string;
            industry: string | null;
        } | null;
        owner: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        } | null;
        lead: {
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
        } | null;
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        title: string;
        value: number | null;
        updatedAt: Date;
        ownerId: string | null;
        leadId: string | null;
        stage: import("@prisma/client").$Enums.DealStage;
        probability: number | null;
        companyId: string | null;
    }>;
    remove(id: string, req: any): Promise<{
        success: boolean;
    }>;
}
