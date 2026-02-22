import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    private getUserId;
    create(req: any, dto: CreateTaskDto): Promise<{
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
    findAll(req: any, page?: string, limit?: string, q?: string, completed?: string): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, req: any, dto: UpdateTaskDto): Promise<{
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
    remove(id: string, req: any): Promise<{
        success: boolean;
    }>;
}
