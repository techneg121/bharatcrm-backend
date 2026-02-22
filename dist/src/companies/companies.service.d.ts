import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(orgId: string, dto: CreateCompanyDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        industry: string | null;
    }>;
    findAll(orgId: string, page?: number, limit?: number, q?: string): Promise<{
        items: {
            id: string;
            name: string;
            createdAt: Date;
            orgId: string;
            industry: string | null;
        }[];
        page: number;
        limit: number;
        total: number;
    }>;
    findOne(id: string, orgId: string): Promise<{
        deals: {
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
        }[];
        contacts: {
            id: string;
            name: string;
            createdAt: Date;
            email: string | null;
            orgId: string;
            phone: string | null;
            leadId: string | null;
            companyId: string | null;
            position: string | null;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        industry: string | null;
    }>;
    update(id: string, orgId: string, dto: UpdateCompanyDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        industry: string | null;
    }>;
    remove(id: string, orgId: string): Promise<{
        success: boolean;
    }>;
}
