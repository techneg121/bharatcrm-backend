import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    private parseDueDate;
    private validateRefs;
    create(orgId: string, requestUserId: string, dto: CreateTaskDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        title: string;
        leadId: string | null;
        dealId: string | null;
        userId: string;
        dueDate: Date | null;
        completed: boolean;
    }>;
    findAll(orgId: string, page?: number, limit?: number, q?: string, completed?: boolean): Promise<{
        items: ({
            user: {
                id: string;
                name: string;
                email: string;
                role: import("@prisma/client").$Enums.Role;
            };
        } & {
            id: string;
            createdAt: Date;
            orgId: string;
            title: string;
            leadId: string | null;
            dealId: string | null;
            userId: string;
            dueDate: Date | null;
            completed: boolean;
        })[];
        page: number;
        limit: number;
        total: number;
    }>;
    findOne(id: string, orgId: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        title: string;
        leadId: string | null;
        dealId: string | null;
        userId: string;
        dueDate: Date | null;
        completed: boolean;
    }>;
    update(id: string, orgId: string, dto: UpdateTaskDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
        };
    } & {
        id: string;
        createdAt: Date;
        orgId: string;
        title: string;
        leadId: string | null;
        dealId: string | null;
        userId: string;
        dueDate: Date | null;
        completed: boolean;
    }>;
    remove(id: string, orgId: string): Promise<{
        success: boolean;
    }>;
}
