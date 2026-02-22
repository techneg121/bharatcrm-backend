import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
export declare class ContactsService {
    private prisma;
    constructor(prisma: PrismaService);
    private validateRefs;
    create(orgId: string, dto: CreateContactDto): Promise<{
        company: {
            id: string;
            name: string;
            createdAt: Date;
            orgId: string;
            industry: string | null;
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
        name: string;
        createdAt: Date;
        email: string | null;
        orgId: string;
        phone: string | null;
        leadId: string | null;
        companyId: string | null;
        position: string | null;
    }>;
    findAll(orgId: string, page?: number, limit?: number, q?: string): Promise<{
        items: ({
            company: {
                id: string;
                name: string;
                createdAt: Date;
                orgId: string;
                industry: string | null;
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
            name: string;
            createdAt: Date;
            email: string | null;
            orgId: string;
            phone: string | null;
            leadId: string | null;
            companyId: string | null;
            position: string | null;
        })[];
        page: number;
        limit: number;
        total: number;
    }>;
    findOne(id: string, orgId: string): Promise<{
        company: {
            id: string;
            name: string;
            createdAt: Date;
            orgId: string;
            industry: string | null;
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
        name: string;
        createdAt: Date;
        email: string | null;
        orgId: string;
        phone: string | null;
        leadId: string | null;
        companyId: string | null;
        position: string | null;
    }>;
    update(id: string, orgId: string, dto: UpdateContactDto): Promise<{
        company: {
            id: string;
            name: string;
            createdAt: Date;
            orgId: string;
            industry: string | null;
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
        name: string;
        createdAt: Date;
        email: string | null;
        orgId: string;
        phone: string | null;
        leadId: string | null;
        companyId: string | null;
        position: string | null;
    }>;
    remove(id: string, orgId: string): Promise<{
        success: boolean;
    }>;
}
