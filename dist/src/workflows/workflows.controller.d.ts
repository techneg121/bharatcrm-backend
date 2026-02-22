import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { UpdateWorkflowDto } from './dto/update-workflow.dto';
import { WorkflowsService } from './workflows.service';
export declare class WorkflowsController {
    private readonly workflowsService;
    constructor(workflowsService: WorkflowsService);
    create(req: any, dto: CreateWorkflowDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        enabled: boolean;
        trigger: import("@prisma/client/runtime/library").JsonValue;
        condition: import("@prisma/client/runtime/library").JsonValue;
        action: import("@prisma/client/runtime/library").JsonValue;
    }>;
    findAll(req: any, page?: string, limit?: string, q?: string, enabled?: string): Promise<{
        items: {
            id: string;
            name: string;
            createdAt: Date;
            orgId: string;
            enabled: boolean;
            trigger: import("@prisma/client/runtime/library").JsonValue;
            condition: import("@prisma/client/runtime/library").JsonValue;
            action: import("@prisma/client/runtime/library").JsonValue;
        }[];
        page: number;
        limit: number;
        total: number;
    }>;
    findOne(id: string, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        enabled: boolean;
        trigger: import("@prisma/client/runtime/library").JsonValue;
        condition: import("@prisma/client/runtime/library").JsonValue;
        action: import("@prisma/client/runtime/library").JsonValue;
    }>;
    update(id: string, req: any, dto: UpdateWorkflowDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        orgId: string;
        enabled: boolean;
        trigger: import("@prisma/client/runtime/library").JsonValue;
        condition: import("@prisma/client/runtime/library").JsonValue;
        action: import("@prisma/client/runtime/library").JsonValue;
    }>;
    remove(id: string, req: any): Promise<{
        success: boolean;
    }>;
}
