import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(req: any, dto: CreateCompanyDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        industry: string | null;
    }>;
    findAll(req: any, page?: string, limit?: string, q?: string): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, req: any, dto: UpdateCompanyDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        industry: string | null;
    }>;
    remove(id: string, req: any): Promise<{
        success: boolean;
    }>;
}
