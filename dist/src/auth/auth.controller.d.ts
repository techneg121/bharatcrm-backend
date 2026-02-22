import { AuthService } from './auth.service';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(body: {
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
    registerCompany(body: {
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
    invite(req: any, body: {
        email: string;
        role: string;
    }): Promise<Omit<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        orgId: string;
    }, "password">>;
    acceptInvite(body: {
        email: string;
        password: string;
    }): Promise<Omit<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        orgId: string;
    }, "password">>;
    me(req: any): Promise<Omit<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.Role;
        orgId: string;
    }, "password">>;
}
