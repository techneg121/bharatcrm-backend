import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
export declare class WorkflowsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(orgId: string, dto: CreateWorkflowDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        enabled: boolean;
        trigger: Prisma.JsonValue;
        condition: Prisma.JsonValue;
        action: Prisma.JsonValue;
    }>;
    findAll(orgId: string, page?: number, limit?: number, q?: string, enabled?: boolean): Promise<{
        items: {
            id: string;
            name: string;
            createdAt: Date;
            orgId: string;
            enabled: boolean;
            trigger: Prisma.JsonValue;
            condition: Prisma.JsonValue;
            action: Prisma.JsonValue;
        }[];
        page: number;
        limit: number;
        total: number;
    }>;
    findOne(id: string, orgId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        enabled: boolean;
        trigger: Prisma.JsonValue;
        condition: Prisma.JsonValue;
        action: Prisma.JsonValue;
    }>;
    update(id: string, orgId: string, dto: UpdateWorkflowDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        enabled: boolean;
        trigger: Prisma.JsonValue;
        condition: Prisma.JsonValue;
        action: Prisma.JsonValue;
    }>;
    remove(id: string, orgId: string): Promise<{
        success: boolean;
    }>;
}
