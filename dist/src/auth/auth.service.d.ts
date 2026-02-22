import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    private sanitizeUser;
    private mapRole;
    validateUser(email: string, password: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        orgId: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: Omit<{
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            orgId: string;
        }, "password">;
    }>;
    registerCompany(data: {
        companyName: string;
        name: string;
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: Omit<{
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            orgId: string;
        }, "password">;
    }>;
    inviteUser(orgId: string, email: string, role: string): Promise<Omit<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        orgId: string;
    }, "password">>;
    acceptInvite(email: string, password: string): Promise<Omit<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        orgId: string;
    }, "password">>;
    me(userId: string, orgId: string): Promise<Omit<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        orgId: string;
    }, "password">>;
}
